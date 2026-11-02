import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { earningsDaily } from "@/data/dashboard";

const avg = earningsDaily.reduce((a, b) => a + b.value, 0) / earningsDaily.length;
const usd = (v) => `$${v.toFixed(2)}`;

export default function EarningsChart() {
  return (
    <div className="cht">
      <div className="cht__plot cht__plot--sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={earningsDaily} margin={{ top: 8, right: 0, left: 0, bottom: 0 }} barCategoryGap="22%">
            <defs>
              <linearGradient id="eb-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.45} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6c80ad", fontSize: 10 }} interval="preserveStartEnd" minTickGap={30} />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} content={<ChartTooltip format={usd} names={{ value: "Earned" }} />} />
            <ReferenceLine y={avg} stroke="rgba(190,220,255,0.4)" strokeDasharray="4 4" />
            <Bar dataKey="value" radius={[7, 7, 2, 2]} isAnimationActive={false}>
              {earningsDaily.map((d, i) => (
                <Cell key={d.label} fill={i === earningsDaily.length - 1 ? "#ffffff" : "url(#eb-fill)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="insights__foot mono">
        <span>Avg <b>${avg.toFixed(2)}</b></span>
        <span>Best <b className="positive">${Math.max(...earningsDaily.map((d) => d.value))}</b></span>
      </div>
    </div>
  );
}
