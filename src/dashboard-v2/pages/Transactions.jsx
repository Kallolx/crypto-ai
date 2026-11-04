import { useState } from "react";
import { RiDownload2Fill, RiUpload2Fill, RiSwapFill, RiGift2Fill, RiSearchLine } from "react-icons/ri";
import { Badge, Mask, Tabs } from "../ui";

const kinds = {
  deposit: { label: "Deposit", tone: "green", Icon: RiDownload2Fill },
  withdraw: { label: "Withdrawal", tone: "blue", Icon: RiUpload2Fill },
  transfer: { label: "Transfer", tone: "violet", Icon: RiSwapFill },
  reward: { label: "Reward", tone: "gold", Icon: RiGift2Fill },
};

const rows = [
  { id: 1, kind: "deposit", date: "Nov 03, 09:12", status: ["Completed", "active"] },
  { id: 2, kind: "reward", date: "Nov 02, 18:40", status: ["Completed", "active"] },
  { id: 3, kind: "withdraw", date: "Nov 02, 11:05", status: ["Pending", "wait"] },
  { id: 4, kind: "transfer", date: "Nov 01, 16:22", status: ["Completed", "active"] },
  { id: 5, kind: "deposit", date: "Oct 31, 10:47", status: ["Completed", "active"] },
  { id: 6, kind: "withdraw", date: "Oct 29, 14:30", status: ["Completed", "active"] },
];

const filters = [["all", "All"], ["deposit", "Deposits"], ["withdraw", "Withdrawals"], ["transfer", "Transfers"], ["reward", "Rewards"]];

export default function Transactions() {
  const [f, setF] = useState("all");
  const [q, setQ] = useState("");
  const list = rows.filter((r) => (f === "all" || r.kind === f) && kinds[r.kind].label.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <section className="dx-card">
      <label className="dx-search"><RiSearchLine /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search transactions" aria-label="Search transactions" /></label>
      <Tabs className="dx-tabs--scroll" items={filters} value={f} onChange={setF} label="Filter transactions" />
      <ul className="dx-list">
        {list.map((r) => {
          const k = kinds[r.kind];
          return (
            <li key={r.id}>
              <span className={`dx-tile dx-tile--${k.tone}`}><k.Icon /></span>
              <span className="dx-list__main"><b>{k.label}</b><small>{r.date}</small></span>
              <span className="dx-list__end"><b><Mask w={5} /></b><Badge tone={r.status[1]}>{r.status[0]}</Badge></span>
            </li>
          );
        })}
        {!list.length && <li className="dx-empty">No transactions found.</li>}
      </ul>
    </section>
  );
}
