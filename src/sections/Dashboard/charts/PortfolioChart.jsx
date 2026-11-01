import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { RiArrowUpSFill } from "react-icons/ri";
import ChartTooltip from "./ChartTooltip";
import { portfolioRanges } from "@/data/dashboard";

const usd = (v) => `$${Math.round(v).toLocaleString("en-US")}`;
const compact = (v) => `$${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K`;

export default function PortfolioChart() {
  const [range, setRange] = useState("1M");
  const data = portfolioRanges[range];
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const change = ((last - first) / first) * 100;

  return (
    <div className="cht">
      <div className="cht__head">
        <div>
          <span className="cht__label">Portfolio value</span>
          <div className="cht__value">
            <strong className="mono">{usd(last)}</strong>
            <span className="positive"><RiArrowUpSFill />{change.toFixed(2)}%</span>
          </div>
        </div>
        <div className="cht__tabs" role="tablist" aria-label="Range">
          {Object.keys(portfolioRanges).map((r) => (
            <button key={r} role="tab" aria-selected={range === r} className={range === r ? "is-active" : ""} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
      </div>

      <div className="cht__plot cht__plot--lg">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="pv-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pv-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(140,175,255,0.09)" strokeDasharray="3 6" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6c80ad", fontSize: 11 }} minTickGap={28} interval="preserveStartEnd" />
            <YAxis tickLine={false} axisLine={false} width={54} tick={{ fill: "#6c80ad", fontSize: 11 }} tickFormatter={compact} domain={["dataMin - 600", "dataMax + 400"]} />
            <Tooltip cursor={{ stroke: "rgba(190,220,255,0.35)", strokeDasharray: "3 4" }} content={<ChartTooltip format={usd} names={{ value: "Portfolio", deposits: "Deposited" }} />} />
            <Area type="monotone" dataKey="deposits" stroke="rgba(165,180,252,0.6)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false} activeDot={false} />
            <Area type="monotone" dataKey="value" stroke="url(#pv-stroke)" strokeWidth={3} fill="url(#pv-fill)" dot={false}
              activeDot={{ r: 6, fill: "#0b1a46", stroke: "#22d3ee", strokeWidth: 3 }} animationDuration={900} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="cht__legend">
        <span><i style={{ background: "linear-gradient(90deg,#60a5fa,#22d3ee)" }} />Portfolio value</span>
        <span><i className="dash" />Total deposited</span>
      </div>
    </div>
  );
}
