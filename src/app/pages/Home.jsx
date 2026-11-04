import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { RiArrowRightLine, RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { activity, holdings, portfolio, trend } from "../data";

const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function Change({ value }) {
  const up = value >= 0;
  return <span className={`dx-chg ${up ? "is-up" : "is-down"}`}>{up ? <RiArrowUpSFill /> : <RiArrowDownSFill />}{Math.abs(value).toFixed(2)}%</span>;
}

export default function Home() {
  return (
    <div className="dx-grid">
      <section className="dx-card dx-balance">
        <div>
          <small>Portfolio value</small>
          <strong className="text-gradient">{usd(portfolio.value)}</strong>
          <Change value={portfolio.change} />
        </div>
        <div className="dx-balance__chart" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="dx-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["dataMin - 0.2", "dataMax + 0.1"]} />
              <Area type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={3} fill="url(#dx-fill)" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="dx-card">
        <div className="dx-title"><h2>Holdings</h2><Link to="/dashboard/markets">Markets<RiArrowRightLine /></Link></div>
        <ul className="dx-list">
          {holdings.map((h) => (
            <li key={h.symbol}>
              <CoinIcon symbol={h.symbol} size={40} />
              <span className="dx-list__main"><b>{h.name}</b><small>{h.amount}</small></span>
              <span className="dx-list__end"><b>{usd(h.value)}</b><Change value={h.change} /></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dx-card">
        <div className="dx-title"><h2>Recent activity</h2><Link to="/dashboard/activity">View all<RiArrowRightLine /></Link></div>
        <ul className="dx-list">
          {activity.slice(0, 4).map((a) => (
            <li key={a.id}>
              <CoinIcon symbol={a.symbol} size={40} />
              <span className="dx-list__main"><b>{a.title}</b><small>{a.time}</small></span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
