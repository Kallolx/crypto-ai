import { useId } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/* Flat chart set for the investor area. No entry animations, one accent colour. */
const ACCENT = "#3b82f6";
const GRID = "rgba(148,170,230,0.1)";
const TICK = { fill: "#66769c", fontSize: 11 };

function Tip({ active, payload, label, format = (v) => v }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="tip">
      <span>{label}</span>
      {payload.map((p) => <b key={p.dataKey}>{format(p.value)}</b>)}
    </div>
  );
}

// Very light fill under a line; the only gradient used in the dashboard
function Fade({ id, color, top = 0.16 }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity={top} />
      <stop offset="100%" stopColor={color} stopOpacity={0} />
    </linearGradient>
  );
}

/* Edge-to-edge sparkline for KPI tiles. `data` is a plain number array. */
export function Spark({ data, color = ACCENT }) {
  const id = useId().replace(/:/g, "");
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data.map((v) => ({ v }))} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs><Fade id={id} color={color} top={0.2} /></defs>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#${id})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* Line + soft area with axes, for the main portfolio chart */
export function Trend({ data, format, compact }) {
  const id = useId().replace(/:/g, "");
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
        <defs><Fade id={id} color={ACCENT} /></defs>
        <CartesianGrid vertical={false} stroke={GRID} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={TICK} minTickGap={32} interval="preserveStartEnd" />
        <YAxis tickLine={false} axisLine={false} tick={TICK} width={48} tickFormatter={compact} domain={["dataMin - 500", "dataMax + 300"]} />
        <Tooltip cursor={{ stroke: "rgba(148,170,230,0.3)" }} content={<Tip format={format} />} />
        <Area type="monotone" dataKey="deposits" stroke="#66769c" strokeWidth={1} strokeDasharray="3 4" fill="none" dot={false} activeDot={false} isAnimationActive={false} />
        <Area type="monotone" dataKey="value" stroke={ACCENT} strokeWidth={2} fill={`url(#${id})`} dot={false}
          activeDot={{ r: 4, fill: ACCENT, stroke: "#0a1330", strokeWidth: 2 }} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* Flat bars; the latest bar is highlighted */
export function Bars({ data, format }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="28%">
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={TICK} minTickGap={24} interval="preserveStartEnd" />
        <Tooltip cursor={{ fill: "rgba(148,170,230,0.06)" }} content={<Tip format={format} />} />
        <Bar dataKey="value" radius={[2, 2, 0, 0]} isAnimationActive={false}>
          {data.map((d, i) => <Cell key={d.label} fill={i === data.length - 1 ? ACCENT : "rgba(59,130,246,0.35)"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* Thin donut. `data` items need { label, value, color } */
export function Donut({ data, active, onHover }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius="74%" outerRadius="100%" paddingAngle={2} cornerRadius={2} stroke="none"
          startAngle={90} endAngle={-270} isAnimationActive={false}
          onMouseEnter={(_, i) => onHover?.(i)} onMouseLeave={() => onHover?.(null)}>
          {data.map((d, i) => (
            <Cell key={d.label} fill={d.color} fillOpacity={active == null || active === i ? 1 : 0.3} style={{ outline: "none" }} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
