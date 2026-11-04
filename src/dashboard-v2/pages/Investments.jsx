import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine, RiCalendar2Fill, RiAddLine } from "react-icons/ri";
import { Badge, Mask, Tabs } from "../ui";
import { planList } from "../plansData";

/* UI-only showcase screen. Every value is masked and there are no rates. */
const tabs = [["all", "All"], ["active", "Active"], ["done", "Completed"]];

export function Ring({ value }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <div className="dx-ring">
      <svg viewBox="0 0 88 88" aria-hidden="true">
        <defs>
          <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e6ebf7" strokeWidth="8" />
        <circle cx="44" cy="44" r={r} fill="none" stroke="url(#ring-g)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} />
      </svg>
      <b>{value}%</b>
    </div>
  );
}

export default function Investments() {
  const [tab, setTab] = useState("all");
  const list = planList.filter((p) => tab === "all" || p.status === tab);

  return (
    <div className="dx-stack">
      <section className="dx-card dx-dark dx-sum">
        <div><small>Total invested</small><strong><Mask w={6} /></strong></div>
        <div><small>Active plans</small><strong><Mask w={2} /></strong></div>
        <div><small>Completed</small><strong><Mask w={2} /></strong></div>
      </section>

      <div className="dx-bar">
        <Tabs className="dx-tabs--fill" items={tabs} value={tab} onChange={setTab} label="Filter plans" />
        <Link to="/dashboard-v2/investments/new" className="dx-btn dp-btn"><RiAddLine />New plan</Link>
      </div>

      <div className="dx-plans">
        {list.map(({ id, name, Icon, status, progress, perks }) => (
          <article key={id} className="dx-card dx-pc">
            <header className="dx-pc__head">
              <span className="dx-tile"><Icon /></span>
              <div><h3>{name}</h3><small>Plan</small></div>
              <Badge tone={status === "done" ? "blue" : "active"}>{status === "done" ? "Completed" : "Active"}</Badge>
            </header>

            <div className="dx-pc__body">
              <Ring value={progress} />
              <dl className="dx-pc__stats">
                <div><dt>Amount</dt><dd><Mask /></dd></div>
                <div><dt>Earned</dt><dd><Mask /></dd></div>
                <div><dt>Duration</dt><dd><Mask w={3} /></dd></div>
              </dl>
            </div>

            <div className="dx-features">{perks.map((p) => <span key={p}>{p}</span>)}</div>

            <footer className="dx-pc__foot">
              <span><RiCalendar2Fill /> Started <Mask w={5} /></span>
              <Link to={`/dashboard-v2/investments/${id}`}>Details<RiArrowRightLine /></Link>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
