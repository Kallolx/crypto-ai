import { useMemo, useRef, useState } from "react";
import { fmt } from "./useMarket";

const W = 800;
const H = 360;
const PH = 272; // price pane height; volume sits below

/* SVG candlestick chart: candles, volume bars, 20-period MA, live price line and a hover crosshair.
   Axis labels are HTML so text never stretches with the responsive SVG. */
export default function CandleChart({ candles, price, dir, chartKey }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  const g = useMemo(() => {
    const hi = Math.max(...candles.map((c) => c.h));
    const lo = Math.min(...candles.map((c) => c.l));
    const pad = (hi - lo) * 0.1;
    const max = hi + pad;
    const min = lo - pad;
    const y = (p) => PH - 8 - ((p - min) / (max - min)) * (PH - 16);
    const step = W / candles.length;
    const vmax = Math.max(...candles.map((c) => c.v));

    const ma = candles
      .map((_, i) => {
        if (i < 19) return null;
        const avg = candles.slice(i - 19, i + 1).reduce((a, c) => a + c.c, 0) / 20;
        return [i * step + step / 2, y(avg)];
      })
      .filter(Boolean);

    return { min, max, y, step, vmax, ma };
  }, [candles]);

  const { y, step, vmax, min, max } = g;
  const idx = hover ?? candles.length - 1;
  const hc = candles[idx];
  const up = hc.c >= hc.o;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({ p: max - (max - min) * t, top: (y(max - (max - min) * t) / H) * 100 }));

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const i = Math.floor(((e.clientX - r.left) / r.width) * candles.length);
    setHover(Math.max(0, Math.min(candles.length - 1, i)));
  };

  return (
    <div className="cc" ref={ref} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      <div className="cc__ohlc mono">
        <span>O <b className={up ? "positive" : "negative"}>{fmt(hc.o)}</b></span>
        <span>H <b className={up ? "positive" : "negative"}>{fmt(hc.h)}</b></span>
        <span>L <b className={up ? "positive" : "negative"}>{fmt(hc.l)}</b></span>
        <span>C <b className={up ? "positive" : "negative"}>{fmt(hc.c)}</b></span>
        <span className="cc__ma">MA20</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="cc-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b82f6" stopOpacity=".1" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width={W} height={PH} fill="url(#cc-glow)" />
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1="0" x2={W} y1={PH * t} y2={PH * t} stroke="rgba(140,175,255,.07)" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
        ))}
        <line x1="0" x2={W} y1={PH + 6} y2={PH + 6} stroke="rgba(140,175,255,.1)" vectorEffect="non-scaling-stroke" />

        <g key={chartKey} className="cc__candles">
          {candles.map((c, i) => {
            const x = i * step + step / 2;
            const isUp = c.c >= c.o;
            const color = isUp ? "#34d399" : "#fb7185";
            const top = y(Math.max(c.o, c.c));
            const bh = Math.max(1.5, Math.abs(y(c.o) - y(c.c)));
            const vh = (c.v / vmax) * (H - PH - 16);
            return (
              <g key={i}>
                <rect x={x - step * 0.3} y={H - vh - 4} width={step * 0.6} height={vh} fill={color} opacity=".28" />
                <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                <rect x={x - step * 0.3} y={top} width={step * 0.6} height={bh} rx="1" fill={color} />
              </g>
            );
          })}
          <path d={g.ma.map(([x, py], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${py.toFixed(1)}`).join(" ")} fill="none" stroke="#a5b4fc" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
        </g>

        <line x1="0" x2={W} y1={y(price)} y2={y(price)} stroke={dir >= 0 ? "#34d399" : "#fb7185"} strokeDasharray="4 4" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        {hover != null && (
          <g stroke="rgba(190,220,255,.4)" strokeDasharray="3 4" vectorEffect="non-scaling-stroke">
            <line x1={hover * step + step / 2} x2={hover * step + step / 2} y1="0" y2={H} vectorEffect="non-scaling-stroke" />
            <line x1="0" x2={W} y1={y(hc.c)} y2={y(hc.c)} vectorEffect="non-scaling-stroke" />
          </g>
        )}
      </svg>

      {ticks.map((t) => (
        <span key={t.top} className="cc__tick mono" style={{ top: `${t.top}%` }}>{fmt(t.p)}</span>
      ))}
      <span className={`cc__last mono ${dir >= 0 ? "is-up" : "is-down"}`} style={{ top: `${(y(price) / H) * 100}%` }}>{fmt(price)}</span>
    </div>
  );
}
