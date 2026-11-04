import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { fmtAmount, useHoldings } from "../useLiveMarkets";
import { Change } from "./Home";

const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const colors = ["#3b82f6", "#8b5cf6", "#22d3ee", "#f59e0b", "#ec4899", "#10b981", "#6366f1", "#94a3b8"];

/* Read-only view of sample holdings, valued at live prices */
export default function Portfolio() {
  const { rows, total, live } = useHoldings();

  return (
    <div className="dx-stack">
      <section className="dx-card dx-dark dx-pf">
        <div>
          <small>Total value</small>
          <strong>{usd(total)}</strong>
        </div>
        <span className="dx-chip">{rows.length} assets{live ? " · Live prices" : ""}</span>
        <div className="dx-wl__bar dx-pf__bar" aria-hidden="true">
          {rows.map((r, i) => <i key={r.symbol} style={{ width: `${r.share}%`, background: colors[i % colors.length] }} />)}
        </div>
      </section>

      <section className="dx-card">
        <div className="dx-title"><h2>Allocation</h2><span className="dx-wl__count">{rows.length} assets</span></div>
        <ul className="dx-alloc">
          {rows.map((h, i) => (
            <li key={h.symbol}>
              <CoinIcon symbol={h.symbol} size={38} />
              <div>
                <p><b>{h.name}</b><b>{usd(h.value)}</b></p>
                <span className="dx-alloc__bar"><i style={{ width: `${h.share}%`, background: colors[i % colors.length] }} /></span>
                <p><small>{h.share.toFixed(1)}% · {fmtAmount(h.amount, h.symbol)}</small><Change value={h.change} /></p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
