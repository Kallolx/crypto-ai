import { useEffect, useState } from "react";
import { markets } from "@/data/markets";

/* Live prices for the demo, straight from Binance's free public market-data endpoint (no key, no backend).
   If the request fails or is rate limited, the screens fall back to slowly moving sample prices. */
export const COINS = [
  { symbol: "BTC", name: "Bitcoin", id: "bitcoin", amount: 0.112 },
  { symbol: "ETH", name: "Ethereum", id: "ethereum", amount: 1.35 },
  { symbol: "SOL", name: "Solana", id: "solana", amount: 14.2 },
  { symbol: "BNB", name: "BNB", id: "binancecoin", amount: 2.6 },
  { symbol: "XRP", name: "XRP", id: "ripple", amount: 2700 },
  { symbol: "ADA", name: "Cardano", id: "cardano", amount: 2000 },
  { symbol: "LINK", name: "Chainlink", id: "chainlink", amount: 48 },
  { symbol: "USDT", name: "Tether", id: "tether", amount: 1014 },
];

const fallback = Object.fromEntries(
  COINS.map((c) => {
    const m = markets.find((x) => x.symbol === c.symbol);
    return [c.symbol, { price: m?.price ?? 1, change: m?.change ?? 0.01 }];
  })
);

const PAIRS = COINS.filter((c) => c.symbol !== "USDT").map((c) => `${c.symbol}USDT`);
const QUERY = `/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(PAIRS))}`;
// data-api.binance.vision is Binance's public market-data mirror: no key, CORS enabled
const HOSTS = ["https://data-api.binance.vision", "https://api.binance.com"];

async function fetchPrices() {
  let lastError;
  for (const host of HOSTS) {
    try {
      const res = await fetch(host + QUERY);
      if (!res.ok) throw new Error(String(res.status));
      const rows = await res.json();
      const prices = { USDT: { price: 1, change: 0.01 } };
      rows.forEach((r) => { prices[r.symbol.replace("USDT", "")] = { price: Number(r.lastPrice), change: Number(r.priceChangePercent) }; });
      return prices;
    } catch (e) { lastError = e; }
  }
  throw lastError;
}

export default function useLiveMarkets(interval = 20000) {
  const [state, setState] = useState({ prices: fallback, live: false, updated: null });

  useEffect(() => {
    let dead = false;
    const load = async () => {
      try {
        const prices = await fetchPrices();
        COINS.forEach((c) => { prices[c.symbol] ??= fallback[c.symbol]; });
        if (!dead) setState({ prices, live: true, updated: new Date() });
      } catch {
        if (!dead) setState((s) => ({ ...s, live: false }));
      }
    };
    load();
    const t = setInterval(load, interval);
    return () => { dead = true; clearInterval(t); };
  }, [interval]);

  // Not live: keep prices gently moving so the screen still feels alive
  useEffect(() => {
    if (state.live) return undefined;
    const t = setInterval(() => {
      setState((s) => ({
        ...s,
        prices: Object.fromEntries(Object.entries(s.prices).map(([k, v]) => [k, k === "USDT" ? v : { ...v, price: v.price * (1 + (Math.random() - 0.5) * 0.0012) }])),
      }));
    }, 2500);
    return () => clearInterval(t);
  }, [state.live]);

  return state;
}

/* Sample holdings valued at the current prices */
export function useHoldings() {
  const { prices, live } = useLiveMarkets();
  const rows = COINS.map((c) => {
    const q = prices[c.symbol];
    return { symbol: c.symbol, name: c.name, amount: c.amount, price: q.price, change: q.change, value: c.amount * q.price };
  });
  const total = rows.reduce((a, r) => a + r.value, 0);
  return { rows: rows.map((r) => ({ ...r, share: (r.value / total) * 100 })), total, live };
}

export const fmtAmount = (n, symbol) => `${n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 4 : 2 })} ${symbol}`;
