import { useState } from "react";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { activity } from "../data";
import { Tabs } from "../ui";

const filters = [["all", "All"], ["alert", "Alerts"], ["account", "Account"]];

export default function Activity() {
  const [filter, setFilter] = useState("all");
  const list = activity.filter((a) => filter === "all" || a.type === filter);

  return (
    <section className="dx-card">
      <Tabs className="dx-tabs--fill" items={filters} value={filter} onChange={setFilter} label="Filter activity" />
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
