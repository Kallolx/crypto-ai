import { useState } from "react";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { activity } from "../data";

const filters = [["all", "All"], ["alert", "Alerts"], ["account", "Account"]];

export default function Activity() {
  const [filter, setFilter] = useState("all");
  const list = activity.filter((a) => filter === "all" || a.type === filter);

  return (
    <section className="dx-card">
      <div className="dx-seg" role="tablist" aria-label="Filter activity">
        {filters.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={filter === id} onClick={() => setFilter(id)}>{label}</button>
        ))}
      </div>
      <ul className="dx-list">
        {list.map((a) => (
          <li key={a.id}>
            <CoinIcon symbol={a.symbol} size={40} />
            <span className="dx-list__main"><b>{a.title}</b><small>{a.time}</small></span>
          </li>
        ))}
      </ul>
    </section>
  );
}
