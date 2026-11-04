import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import useLivePrices from "@/hooks/useLivePrices";
import { formatPrice } from "@/data/markets";
import { Change } from "./Home";

export default function Markets() {
  const quotes = useLivePrices();
  const [q, setQ] = useState("");
  const list = quotes.filter((m) => m.pair.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <section className="dx-card">
      <label className="dx-search">
        <RiSearchLine />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search markets" aria-label="Search markets" />
      </label>
      <ul className="dx-list">
        {list.map((m) => (
          <li key={m.pair}>
            <CoinIcon symbol={m.symbol} size={40} />
            <span className="dx-list__main"><b>{m.pair}</b><small>Simulated price</small></span>
            <span className="dx-list__end"><b>{formatPrice(m.price)}</b><Change value={m.change} /></span>
          </li>
        ))}
        {!list.length && <li className="dx-empty">No markets found.</li>}
      </ul>
    </section>
  );
}
