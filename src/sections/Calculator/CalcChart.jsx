import { useMemo, useRef, useState } from "react";

const W = 700;
const H = 260;
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* Balance-over-time chart: shaded low→high range, the selected scenario as a bold line,
   dashed principal baseline, hover crosshair with a readout. */
export default function CalcChart({ amount, days, low, mid, high, chosen }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  const g = useMemo(() => {
    const n = days;
    const top = amount + Math.max(...high.slice(0, n + 1)) * 1.08;
    const y = (v) => H - 6 - ((v - amount * 0.98) / (top - amount * 0.98)) * (H - 20);
    const x = (d) => (d / n) * W;
    const path = (s) => s.slice(0, n + 1).map((p, d) => `${d ? "L" : "M"}${x(d).toFixed(1)} ${y(amount + p).toFixed(1)}`).join(" ");
    const lineHigh = path(high);
    const lineLow = path(low);
    const band = `${lineHigh} ${low.slice(0, n + 1).map((p, d) => `L${x(n - d).toFixed(1)} ${y(amount + low[n - d]).toFixed(1)}`).join(" ")} Z`;
    return { top, y, x, band, lineHigh, lineLow, lineSel: path(chosen), n };
  }, [amount, days, low, mid, high, chosen]);

  const ticks = [0, 0.33, 0.66, 1].map((t) => {
    const v = amount * 0.98 + (g.top - amount * 0.98) * t;
    return { v, top: (g.y(v) / H) * 100 };
  });
  const xt = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(t * days));

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setHover(Math.max(0, Math.min(days, Math.round(((e.clientX - r.left) / r.width) * days))));
  };

  return (
    <div className="cch">
      <div className="cch__plot" ref={ref} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cch-band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity=".3" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity=".05" />
            </linearGradient>
            <linearGradient id="cch-line" x1="0" x2="1">
              <stop offset="0" stopColor="#60a5fa" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((t) => (
            <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} stroke="rgba(140,175,255,.07)" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
          ))}
          <line x1="0" x2={W} y1={g.y(amount)} y2={g.y(amount)} stroke="rgba(190,220,255,.3)" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />

          <path d={g.band} fill="url(#cch-band)" />
          <path d={g.lineLow} fill="none" stroke="rgba(165,180,252,.55)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d={g.lineHigh} fill="none" stroke="rgba(34,211,238,.55)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d={g.lineSel} fill="none" stroke="url(#cch-line)" strokeWidth="2.8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />

          {hover != null && (
            <g>
              <line x1={g.x(hover)} x2={g.x(hover)} y1="0" y2={H} stroke="rgba(190,220,255,.4)" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
              <circle cx={g.x(hover)} cy={g.y(amount + chosen[hover])} r="5" fill="#0b1a46" stroke="#22d3ee" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            </g>
          )}
        </svg>

        {ticks.map((t) => (
          <span key={t.top} className="cch__tick mono" style={{ top: `${t.top}%` }}>{usd(t.v)}</span>
        ))}

        {hover != null && (
          <div className="cch__tip mono" style={{ left: `${(hover / days) * 100}%` }}>
            <b>Day {hover}</b>
            <span>Selected <i>{usd(amount + chosen[hover])}</i></span>
            <span>Range {usd(amount + low[hover])} – {usd(amount + high[hover])}</span>
          </div>
        )}
      </div>
      <div className="cch__axis mono">{xt.map((d) => <span key={d}>{d === 0 ? "Start" : `Day ${d}`}</span>)}</div>
      <div className="cch__legend">
        <span><i className="l-sel" />Selected scenario</span>
        <span><i className="l-range" />Low – high range</span>
        <span><i className="l-base" />Principal</span>
      </div>
    </div>
  );
}
