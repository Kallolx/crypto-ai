import { useMemo } from "react";

const W = 600;
const H = 210;
const N = 38;

/* Deterministic candle series with an uptrend, so the card looks the same on every load */
function build() {
  let s = 7;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let p = 100;
  const out = [];
  for (let i = 0; i < N; i++) {
    const o = p;
    const c = o + (r() - 0.4) * 9 + 0.5;
    const h = Math.max(o, c) + r() * 4;
    const l = Math.min(o, c) - r() * 4;
    out.push({ o, h, l, c });
    p = c;
  }
  return out;
}

const signals = [
  { i: 8, side: "buy" },
  { i: 17, side: "sell" },
  { i: 24, side: "buy" },
  { i: 33, side: "buy" },
];

export default function EngineCandles() {
  const { candles, y, step, ma } = useMemo(() => {
    const candles = build();
    const hi = Math.max(...candles.map((c) => c.h));
    const lo = Math.min(...candles.map((c) => c.l));
    const y = (v) => H - 18 - ((v - lo) / (hi - lo)) * (H - 56);
    const step = W / N;
    const ma = candles
      .map((_, i) => (i < 7 ? null : [i * step + step / 2, y(candles.slice(i - 7, i + 1).reduce((a, c) => a + c.c, 0) / 8)]))
      .filter(Boolean);
    return { candles, y, step, ma };
  }, []);

  return (
    <svg className="engine__chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} stroke="rgba(140,175,255,.07)" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
      ))}

      {candles.map((c, i) => {
        const x = i * step + step / 2;
        const up = c.c >= c.o;
        const color = up ? "#34d399" : "#fb7185";
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <rect x={x - step * 0.3} y={y(Math.max(c.o, c.c))} width={step * 0.6} height={Math.max(2, Math.abs(y(c.o) - y(c.c)))} rx="1.5" fill={color} />
          </g>
        );
      })}

      <path
        d={ma.map(([x, py], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${py.toFixed(1)}`).join(" ")}
        fill="none"
        stroke="#a5b4fc"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />

      {signals.map(({ i, side }) => {
        const c = candles[i];
        const x = i * step + step / 2;
        const buy = side === "buy";
        const py = buy ? y(c.l) + 12 : y(c.h) - 12;
        return (
          <path
            key={i}
            d={buy ? `M${x} ${py - 6} l6 10 h-12 z` : `M${x} ${py + 6} l6 -10 h-12 z`}
            fill={buy ? "#34d399" : "#fb7185"}
          />
        );
      })}
    </svg>
  );
}
