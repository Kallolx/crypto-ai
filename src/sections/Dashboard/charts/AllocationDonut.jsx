import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { allocation } from "@/data/dashboard";

const TOTAL = 20214;

/* Donut with rounded segments. Hovering a slice or a legend row focuses it and updates the centre label. */
export default function AllocationDonut() {
  const [active, setActive] = useState(null);
  const item = active != null ? allocation[active] : null;

  return (
    <div className="don">
      <div className="don__ring">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={allocation} dataKey="value" innerRadius="68%" outerRadius="94%" paddingAngle={4} cornerRadius={8} stroke="none"
              startAngle={90} endAngle={-270} animationDuration={900}
              onMouseEnter={(_, i) => setActive(i)} onMouseLeave={() => setActive(null)}>
              {allocation.map((a, i) => (
                <Cell key={a.label} fill={a.color} fillOpacity={active == null || active === i ? 1 : 0.28} style={{ transition: "fill-opacity .25s", outline: "none" }} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="don__center">
          <strong className="mono">{item ? `${item.value}%` : `$${(TOTAL / 1000).toFixed(1)}K`}</strong>
          <span>{item ? item.label.split(" · ")[0] : "Total value"}</span>
        </div>
      </div>

      <ul className="don__legend">
        {allocation.map((a, i) => (
          <li key={a.label} className={active === i ? "is-on" : ""} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <i style={{ background: a.color }} />
            <span>{a.label}</span>
            <b className="mono">${Math.round((TOTAL * a.value) / 100).toLocaleString("en-US")}</b>
            <em className="mono">{a.value}%</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
