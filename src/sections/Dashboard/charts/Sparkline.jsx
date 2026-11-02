import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

/* Tiny smooth area sparkline. `data` is a plain numeric series. */
export default function Sparkline({ data, color = "#22d3ee", height = 36 }) {
  const id = useId().replace(/:/g, "");
  const rows = data.map((v) => ({ v }));
  return (
    <div className="spark" style={{ height }} aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#${id})`} dot={false} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
