import { RiRobot2Line } from "react-icons/ri";
import EarningsChart from "./EarningsChart";
import { bot, team } from "@/data/dashboard";

/* Three compact panels: daily earnings, AI bot status, referral team */
export default function InsightPanels() {
  return (
    <div className="insights">
      <div className="panel">
        <div className="panel__head">
          <h4>Daily earnings</h4>
          <span className="panel__chip">14D</span>
        </div>
        <EarningsChart />
      </div>

      <div className="panel">
        <div className="panel__head">
          <h4>AI trading bot</h4>
          <span className="bot__state"><i />Running</span>
        </div>
        <div className="bot">
          <span className="bot__icon"><RiRobot2Line /></span>
          <div className="bot__grid mono">
            {bot.map(([k, v]) => (
              <div key={k}><small>{k}</small><b>{v}</b></div>
            ))}
          </div>
        </div>
        <div className="bot__risk">
          <small>Risk level</small>
          <span className="bot__meter"><i style={{ width: "46%" }} /></span>
          <small className="mono">Balanced</small>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h4>Team</h4>
          <span className="panel__chip">3 levels</span>
        </div>
        <ul className="team">
          {team.map((t) => (
            <li key={t.level}>
              <span className="team__lvl mono">{t.level}</span>
              <span className="team__bar"><i style={{ width: `${t.pct}%` }} /></span>
              <span className="team__n mono">{t.members}</span>
              <span className="team__bonus mono positive">+${t.bonus}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
