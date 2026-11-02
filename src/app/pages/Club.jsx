import { RiMoneyDollarCircleLine, RiPlaneLine, RiGiftLine, RiVipCrownLine, RiTimeLine, RiFlag2Line, RiTrophyLine } from "react-icons/ri";
import { Panel, Card, Meter, KV, Empty, Steps, Ring, usd } from "../ui";
import { campaigns, user, rank } from "../data";

const meta = {
  cash: ["Cash rewards", RiMoneyDollarCircleLine, "green"],
  travel: ["Global travel", RiPlaneLine, "cyan"],
  gifts: ["Premium gifts", RiGiftLine, "violet"],
};

const fmt = (label, v) => (label.includes("directs") ? String(v) : usd(v, 0));

/* Prestige Club campaign page: live progress toward the reward, or an empty state */
export default function Club({ kind }) {
  const [title, Icon, tone] = meta[kind];
  const c = campaigns[kind];
  const met = c ? c.goals.filter(([, have, need]) => have >= need).length : 0;
  const overall = c ? (c.goals.reduce((a, [, have, need]) => a + Math.min(1, have / need), 0) / c.goals.length) * 100 : 0;

  return (
    <div className="pg">
      {c ? (
        <Panel
          chips={[[RiVipCrownLine, `Prestige Club · ${title}`], [RiTimeLine, `Ends ${c.ends}`]]}
          title={c.title}
          sub={c.text}
          tiles={[["Reward", c.reward, Icon], ["Goals met", `${met} of ${c.goals.length}`, RiFlag2Line], ["Your tier", user.tier, RiVipCrownLine]]}
          aside={<Ring pct={overall} label={`${overall.toFixed(0)}%`} sub="overall progress" size={150} tone={met === c.goals.length ? "green" : "blue"} />}
        />
      ) : (
        <Panel chips={[[RiVipCrownLine, "Prestige Club"]]} title="Rewards for the business you build." sub="Campaigns open through the year. When one opens, your live progress appears here." />
      )}

      {c ? (
        <div className="grid-3">
          {c.goals.map(([label, have, need]) => {
            const done = have >= need;
            return (
              <div className="card goal" key={label}>
                <div className="goal__top"><span className="stat__label">{label}</span>{done ? <span className="badge badge--ok">Met</span> : <span className="badge badge--wait">In progress</span>}</div>
                <span className="stat__value num">{fmt(label, have)}<small> / {fmt(label, need)}</small></span>
                <Meter pct={(have / need) * 100} tone={done ? "green" : undefined} />
                <small className="note">{done ? "Goal met" : `${fmt(label, need - have)} to go`}</small>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <Empty icon={Icon} title={`No active ${title.toLowerCase()} campaign right now`} text="When a new campaign opens it appears here, together with your live progress toward its reward." />
        </div>
      )}

      <div className="grid-main">
        <Card title="How the club works" icon={Icon} tone={tone}>
          <Steps row items={[["Grow your business", "Team volume and your own investment count toward every campaign."], ["Meet each goal", "Progress updates daily. All goals must be met before the deadline."], ["Claim the reward", "Cash goes to your Affiliate wallet; trips and gifts are arranged by the team."]]} />
        </Card>
        <Card title="Your rank" sub={`${rank.current} → ${rank.next}`} icon={RiTrophyLine} tone="gold">
          <div className="vstack">
            {rank.goals.map(([label, have, need]) => (
              <div key={label} className="goal-line">
                <div><span>{label}</span><b className="num">{usd(have, 0)} / {usd(need, 0)}</b></div>
                <Meter pct={(have / need) * 100} tone="gold" />
              </div>
            ))}
            <KV rows={[["Club tier", user.tier], ["Member since", user.memberSince]]} />
          </div>
        </Card>
      </div>
    </div>
  );
}

