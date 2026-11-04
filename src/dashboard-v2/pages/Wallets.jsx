import { useId } from "react";
import { Link } from "react-router-dom";
import {
  RiWallet3Fill, RiSafe2Fill, RiGift2Fill, RiCoinsFill, RiDownload2Fill, RiUpload2Fill, RiSwapFill, RiArrowRightSLine,
} from "react-icons/ri";
import { Mask } from "../ui";

const wallets = [
  { name: "Main wallet", note: "Everyday balance", tag: "Primary", Icon: RiWallet3Fill, share: 62, color: "#3b82f6" },
  { name: "Savings", note: "Set aside for later", tag: "Locked", Icon: RiSafe2Fill, share: 22, color: "#8b5cf6" },
  { name: "Rewards", note: "Perks you have earned", tag: "Perks", Icon: RiGift2Fill, share: 10, color: "#22d3ee" },
  { name: "Tokens", note: "Digital assets", tag: "Assets", Icon: RiCoinsFill, share: 6, color: "#f59e0b" },
];

const path = "M0 34 C10 30 18 36 28 26 S46 28 56 18 S76 22 100 8";

function Spark() {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="dx-wal__spark" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity=".4" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L100 40 L0 40 Z`} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* One dark summary card on top, then the wallets as a light list with an allocation bar */
export default function Wallets() {
  return (
    <div className="dx-stack">
      <section className="dx-card dx-dark dx-wm">
        <div className="dx-wm__left">
          <div className="dx-wm__top">
            <span className="dx-tile"><RiWallet3Fill /></span>
            <div><small>Total balance</small><strong><Mask w={7} /></strong></div>
            <span className="dx-chip">4 wallets</span>
          </div>
          <Spark />
        </div>

        <div className="dx-wm__right">
          <div className="dx-wm__strip">
            <div><small>Pending</small><b><Mask w={2} /></b></div>
            <div><small>This month</small><b><Mask w={4} /></b></div>
            <div><small>Last activity</small><b>Today</b></div>
          </div>
          <div className="dx-wal__acts">
            <Link to="/dashboard-v2/deposit"><RiDownload2Fill />Deposit</Link>
            <Link to="/dashboard-v2/withdraw"><RiUpload2Fill />Withdraw</Link>
            <button type="button"><RiSwapFill />Transfer</button>
          </div>
        </div>
      </section>

      <section className="dx-card dx-wl">
        <div className="dx-title"><h2>Your wallets</h2><span className="dx-wl__count">{wallets.length} total</span></div>

        <div className="dx-wl__bar" aria-hidden="true">
          {wallets.map((w) => <i key={w.name} style={{ width: `${w.share}%`, background: w.color }} />)}
        </div>

        <ul className="dx-wl__list">
          {wallets.map(({ name, note, tag, Icon, share, color }) => (
            <li key={name}>
              <span className="dx-tile"><Icon /></span>
              <span className="dx-wl__main">
                <b>{name}<em>{tag}</em></b>
                <small>{note}</small>
              </span>
              <span className="dx-wl__end">
                <b><Mask w={6} /></b>
                <em className="dx-pct" style={{ "--c": color }}>{share}%</em>
              </span>
              <RiArrowRightSLine className="dx-wl__go" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
