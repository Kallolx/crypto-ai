import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiDashboardLine, RiUserFollowLine, RiTeamLine, RiNodeTree, RiShieldStarLine, RiShakeHandsLine, RiQrCodeLine,
  RiShareLine, RiUserAddLine, RiHandCoinLine, RiLockLine, RiLockUnlockLine, RiCheckLine, RiMessage3Line,
  RiDownload2Line, RiLinksLine,
} from "react-icons/ri";
import { Panel, SubNav, Card, CardLink, CopyField, CopyButton, Steps, Table, KV, Meter, Ring, Empty, usd } from "../ui";
import Qr from "../Qr";
import { user, team, inviteKit, usdWallets, directMembers, downline, treeLevels } from "../data";
import { BASE } from "../nav";

const A = `${BASE}/affiliate`;
const link = `https://${user.inviteLink}`;
const sponsor = { earned: 200, goal: 10, until: "Dec 01, 2026" };

function AffNav() {
  return (
    <SubNav items={[
      ["Overview", A, RiDashboardLine], ["Direct members", `${A}/directs`, RiUserFollowLine], ["Downline", `${A}/downline`, RiTeamLine],
      ["Affiliate tree", `${A}/tree`, RiNodeTree], ["Affiliate status", `${A}/status`, RiShieldStarLine],
    ]} />
  );
}

function InvitePanel() {
  return (
    <div className="invite">
      <div className="invite__qr"><Qr value={link} size={132} /><small>Scan to join your team</small></div>
      <div className="vstack">
        <CopyField label={`Invite link · code ${user.sponsorId}`} value={link} />
        <div className="xp__actions" style={{ marginTop: 0 }}>
          <CopyButton text={link} label="Copy invite link" small={false} />
          <button className="ui-btn"><RiDownload2Line />Download invite card</button>
        </div>
      </div>
    </div>
  );
}

export function AffiliateOverview() {
  return (
    <div className="pg">
      <AffNav />
      <Panel
        chips={[[RiShakeHandsLine, "Affiliate Center"], [RiCheckLine, "Earnings active"]]}
        eyebrow="Affiliate wallet"
        value={usd(usdWallets[2].balance)}
        sub={`You've earned ${usd(sponsor.earned)} sponsor income this period, above the ${usd(sponsor.goal)} needed to keep affiliate income active until ${sponsor.until}.`}
        tiles={[["Team income this month", usd(team.monthIncome), RiHandCoinLine], ["Direct members", `${team.directs}`, RiUserFollowLine], ["Downline", `${team.downline}`, RiTeamLine], ["Team investment", usd(team.volume, 0), RiShareLine]]}
        aside={<><span className="xp__aside-title">Invite people</span><InvitePanel /></>}
      />

      <div className="grid-main">
        <Card title="How it works" sub="Three steps to your first affiliate income" icon={RiShareLine} tone="cyan">
          <Steps row items={[["Share your link", "Invite people with your personal referral link."], ["Members join and invest", "They become your direct members when they sign up."], ["Earn affiliate income", "Bonuses and rewards land in your Affiliate wallet."]]} />
        </Card>
        <Card title="Earning window" sub="Keep affiliate income active" icon={RiShieldStarLine} tone="green">
          <div className="limit-row">
            <Ring pct={100} label="Active" sub={`until ${sponsor.until.slice(0, 6)}`} size={110} tone="green" />
            <KV rows={[["Sponsor income", usd(sponsor.earned)], ["Needed", usd(sponsor.goal)], ["Active until", sponsor.until]]} />
          </div>
        </Card>
      </div>

      <div className="grid-main">
        <Card title="Team by level" sub="Bonus rates on your first three levels" icon={RiTeamLine} tone="violet" body={false} action={<CardLink to={`${A}/tree`}>Full tree</CardLink>}>
          <Table cols={["Level", "Members", "Active", "Volume", "Rate", "Bonus earned"]} rows={team.levels} />
        </Card>
        <Card title="Invite kit" sub="Ready-made messages with your link filled in" icon={RiMessage3Line} tone="blue">
          <div className="vstack">
            {inviteKit.map(([label, text]) => (
              <div className="kit" key={label}>
                <div className="kit__head"><b>{label}</b><CopyButton text={text} /></div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent members" icon={RiUserAddLine} tone="cyan" body={false} action={<CardLink to={`${A}/directs`}>All direct members</CardLink>}>
        <Table cols={["Member", "Level", "Joined", "Invested", "Status"]} rows={team.recent} />
      </Card>
    </div>
  );
}

function TeamPage({ title, sub, cols, rows, tiles }) {
  return (
    <div className="pg">
      <AffNav />
      <Panel eyebrow={title} value={`${rows.length} members`} sub={sub} tiles={tiles}
        aside={<><span className="xp__aside-title">Grow your team</span><p className="note">Share your referral link to invite new members.</p><CopyField value={link} /></>} />
      <Card title="Team members" sub={`Showing 1–${rows.length} of ${rows.length}`} icon={RiTeamLine} tone="violet" body={false}>
        <Table cols={cols} rows={rows} empty={<Empty icon={RiUserAddLine} title="No members yet" text="Members who join with your referral link will appear here." action={<CopyButton text={link} label="Copy referral link" small={false} />} />} />
      </Card>
    </div>
  );
}

export function DirectMembers() {
  const active = directMembers.filter((r) => r[5].startsWith("Active")).length;
  return (
    <TeamPage title="Direct team" sub="People who joined using your referral link." rows={directMembers}
      cols={["Member", "Username", "Joined", "Recent investment", "Active investment", "Status"]}
      tiles={[["Active investors", `${active} / ${directMembers.length}`, RiUserFollowLine], ["Active investment", "$20,000", RiHandCoinLine]]} />
  );
}

export function Downline() {
  return (
    <TeamPage title="Downline" sub="Everyone below your direct members, across all unlocked levels." rows={downline}
      cols={["Member", "Level", "Sponsor", "Active investment", "Status"]}
      tiles={[["Total downline", String(team.downline), RiTeamLine], ["Levels unlocked", `${treeLevels.filter((l) => l.unlocked).length} / 15`, RiLockUnlockLine]]} />
  );
}

export function AffiliateTree() {
  const [open, setOpen] = useState(1);
  const unlocked = treeLevels.filter((l) => l.unlocked).length;
  const next = treeLevels.find((l) => !l.unlocked);
  return (
    <div className="pg">
      <AffNav />
      <Panel
        eyebrow="Affiliate network"
        value={`${team.downline} team members`}
        sub="Across 15 affiliate levels. Levels unlock as your number of active direct sponsors grows."
        tiles={[["Direct sponsors", String(team.activeDirects), RiUserFollowLine], ["Levels unlocked", `${unlocked} / 15`, RiLockUnlockLine]]}
        aside={next && (
          <div className="vstack">
            <span className="xp__aside-title"><RiLockLine />Next unlock: level {next.level}</span>
            <p className="note">Add {next.need - team.activeDirects} more active direct sponsor{next.need - team.activeDirects > 1 ? "s" : ""} to unlock it.</p>
            <Meter pct={(team.activeDirects / next.need) * 100} />
            <small className="note num">{team.activeDirects} / {next.need} sponsors</small>
            <CopyField value={link} />
          </div>
        )}
      />
      <Card title="Affiliate levels" sub="Levels unlock as your number of direct sponsors grows" icon={RiNodeTree} tone="violet" body={false}>
        <ul className="levels">
          {treeLevels.map((l) => (
            <li key={l.level} className={l.unlocked ? "is-open" : ""}>
              <button onClick={() => setOpen(open === l.level ? 0 : l.level)} disabled={!l.unlocked} aria-expanded={open === l.level}>
                <span className="levels__n num">{String(l.level).padStart(2, "0")}</span>
                <span className="list__text"><b>Level {l.level}</b><small>{l.members} members</small></span>
                <span className="levels__need num">{Math.min(team.activeDirects, l.need)}/{l.need} sponsors</span>
                <span className={`badge ${l.unlocked ? "badge--ok" : "badge--wait"}`}>{l.unlocked ? "Unlocked" : "Locked"}</span>
              </button>
              {open === l.level && l.unlocked && (
                <div className="levels__body">
                  <Table foot={false} cols={["Member", "Level", "Sponsor", "Active investment", "Status"]}
                    rows={downline.filter((d) => d[1] === `Level ${l.level}`).concat(l.level === 1 ? directMembers.map((m) => [m[0], "Level 1", user.username, m[4], m[5]]) : [])} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function AffiliateStatus() {
  const pct = Math.min(100, (sponsor.earned / sponsor.goal) * 100);
  return (
    <div className="pg">
      <AffNav />
      <Panel
        chips={[[RiShieldStarLine, "Affiliate qualification"]]}
        title="Your affiliate income is active"
        sub={`Every ${usd(sponsor.goal)} of sponsor income from your direct members' investments unlocks affiliate income for the next 30 days.`}
        tiles={[["Sponsor income", `${usd(sponsor.earned)} / ${usd(sponsor.goal)}`, RiHandCoinLine], ["Status", "Qualified", RiCheckLine], ["Active until", sponsor.until, RiLinksLine]]}
        aside={<Ring pct={pct} label={`${pct.toFixed(0)}%`} sub="qualified" size={150} tone="green" />}
      />
      <Card title="Counting toward your next extension" sub="Investments by your direct members since your last extension" icon={RiHandCoinLine} tone="green" body={false}>
        <Table cols={["Member", "Invested", "Date", "Sponsor income"]} rows={[["Maria S.", "$2,500.00", "Oct 31", "+$200.00"], ["Jonas P.", "$500.00", "Oct 12", "+$40.00"]]} />
      </Card>
    </div>
  );
}
