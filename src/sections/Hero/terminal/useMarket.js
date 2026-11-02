import { useMemo } from "react";
import { markets } from "@/data/markets";

/* Simulated market snapshot for the hero terminal: candles, an order book and a trade tape. Swap for a real WebSocket when the backend exists. */
export const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H"];
const TF_VOL = { "1m": 0.6, "5m": 1, "15m": 1.5, "1H": 2.2, "4H": 3.2 };
const CANDLES = 64;
const LEVELS = 9;

export const decimals = (p) => (p >= 100 ? 2 : 4);
export const fmt = (p, d = decimals(p)) => p.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const baseOf = (symbol) => markets.find((m) => m.symbol === symbol).price;
const stepOf = (p) => Math.max(+(p * 0.00006).toFixed(decimals(p)), 1 / 10 ** decimals(p));

function seedCandles(symbol, tf) {
  const base = baseOf(symbol);
  const r = rng(symbol.charCodeAt(0) * 31 + symbol.length * 7 + tf.length * 13);
  const vol = base * 0.0035 * TF_VOL[tf];
  let price = base;
  const out = [];
  for (let i = 0; i < CANDLES; i++) {
    const o = price;
    const c = o + (r() - 0.46) * vol * 2;
    const h = Math.max(o, c) + r() * vol * 0.9;
    const l = Math.min(o, c) - r() * vol * 0.9;
    out.push({ o, h, l, c, v: 20 + r() * 80 });
    price = c;
  }
  // rescale so the last close equals the live base price
  const k = base / out[out.length - 1].c;
  return out.map((c) => ({ ...c, o: c.o * k, h: c.h * k, l: c.l * k, c: c.c * k }));
}

const rand = () => 20 + Math.random() * 80;

function init(symbol, tf) {
  const candles = seedCandles(symbol, tf);
  const price = candles[candles.length - 1].c;
  return {
    symbol,
    tf,
    n: 0,
    dir: 0,
    candles,
    price,
    step: stepOf(price),
    askSizes: Array.from({ length: LEVELS }, rand),
    bidSizes: Array.from({ length: LEVELS }, rand),
    trades: Array.from({ length: 10 }, (_, i) => ({
      id: -i,
      side: Math.random() > 0.5 ? "buy" : "sell",
      price: price * (1 + (Math.random() - 0.5) * 0.0008),
      size: +(Math.random() * 1.8 + 0.05).toFixed(3),
      t: new Date(Date.now() - i * 2300),
    })),
  };
}

/* Snapshot only: the chart is rebuilt when symbol/timeframe change but never ticks on its own */
export default function useMarket(symbol, tf) {
  const state = useMemo(() => init(symbol, tf), [symbol, tf]);

  const { candles, price } = state;
  const high = Math.max(...candles.map((c) => c.h));
  const low = Math.min(...candles.map((c) => c.l));
  const volume = candles.reduce((a, c) => a + c.v, 0);
  const change = ((price - candles[0].o) / candles[0].o) * 100;

  return { ...state, high, low, volume, change };
}
