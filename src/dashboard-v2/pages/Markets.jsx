import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { COINS, default as useLiveMarkets } from "../useLiveMarkets";
import { Change } from "./Home";

const usd = (p) => p.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: p < 10 ? 4 : 2, maximumFractionDigits: p < 10 ? 4 : 2 });

export default function Markets() {
  const { prices, live, updated } = useLiveMarkets();
  const [q, setQ] = useState("");
  const list = COINS.filter((c) => `${c.name} ${c.symbol}`.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <section className="dx-card">
      <div className="dx-title">
        <h2>Markets{live && <em className="dx-live">Live</em>}</h2>
        <span className="dx-wl__count">{live && updated ? `Updated ${updated.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : "Sample prices"}</span>
      </div>
      <label className="dx-search">
        <RiSearchLine />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search markets" aria-label="Search markets" />
      </label>
      <ul className="dx-list">
        {list.map((c) => {
          const p = prices[c.symbol];
          return (
            <li key={c.symbol}>
              <CoinIcon symbol={c.symbol} size={40} />
              <span className="dx-list__main"><b>{c.name}</b><small>{c.symbol}</small></span>
              <span className="dx-list__end"><b>{usd(p.price)}</b><Change value={p.change} /></span>
            </li>
          );
        })}
        {!list.length && <li className="dx-empty">No markets found.</li>}
      </ul>
    </section>
  );
}
