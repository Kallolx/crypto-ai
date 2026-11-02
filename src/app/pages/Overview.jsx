import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiDownload2Line, RiUpload2Line, RiArrowLeftRightLine, RiWallet3Line, RiHandCoinLine, RiShakeHandsLine, RiBankLine,
  RiCoinsLine, RiSafe2Line, RiLineChartLine, RiRobot2Line, RiCheckLine, RiTicket2Line, RiShieldKeyholeLine,
  RiTrophyLine, RiTeamLine, RiUserFollowLine, RiFileList3Line, RiPieChart2Line, RiCalendarLine, RiArrowRightLine,
  RiHashtag, RiLinksLine,
} from "react-icons/ri";
import { portfolioRanges } from "@/data/dashboard";
import {
  user, usdWallets, tokenWallets, totalUsd, activePlans, earningLimit, income, ledger, team, rank, bot, TOKEN,
} from "../data";
import { BASE } from "../nav";
import { Trend } from "../charts";
import { Panel, Card, CardLink, Stat, Ring, KV, Meter, Breakdown, Tabs, Table, IChip, CopyButton, usd } from "../ui";
import DrawBanner from "./DrawBanner";
import "./Overview.css";

const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "short", year: "numeric" });
const compact = (v) => `$${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K`;
const walletIcon = { deposit: RiWallet3Line, profit: RiHandCoinLine, affiliate: RiShakeHandsLine, withdraw: RiBankLine };
const invested = activePlans.reduce((a, p) => a + p.amount, 0);

const setup = [
  ["Fund your account", "Deposit USDT into your Deposit wallet.", RiDownload2Line, true, "wallet/deposit"],
  ["Activate the trading bot", "Enables profit on Forex plans.", RiRobot2Line, bot.active, "investments"],
  ["Choose a plan", "Crypto, forex or staking.", RiLineChartLine, true, "plans/crypto"],
  ["Enter the monthly draw", "Grab a ticket for the next draw.", RiTicket2Line, true, "draw/buy"],
  ["Secure your account", "Turn on two-factor authentication.", RiShieldKeyholeLine, false, "settings"],
];

function Growth() {
  const [range, setRange] = useState("1M");
  const data = portfolioRanges[range];
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const change = ((last - first) / first) * 100;
  return (
    <Card title="Portfolio growth" sub="Invested capital plus profit credited to your account" icon={RiLineChartLine} tone="blue"
      action={<div className="segm" role="tablist" aria-label="Range">{Object.keys(portfolioRanges).map((r) => <button key={r} role="tab" aria-selected={range === r} onClick={() => setRange(r)}>{r}</button>)}</div>}>
      <div className="chart-head">
        <b className="num">{usd(last, 0)}</b>
        <span className={`delta ${change >= 0 ? "delta--up" : "delta--down"}`}>{change >= 0 ? "+" : ""}{change.toFixed(2)}%</span>
        <small>over {range}</small>
        <span className="pv__legend"><i />Value <i className="is-dash" />Deposited</span>
      </div>
      <div className="pv__chart"><Trend data={data} format={(v) => usd(v, 0)} compact={compact} /></div>
    </Card>
  );
}

function Activity() {
  const [tab, setTab] = useState("all");
  const rows = ledger.filter((r) => tab === "all" || (tab === "in" ? r[3].startsWith("+") : !r[3].startsWith("+"))).slice(0, 6);
  const count = (pred) => ledger.filter(pred).length;
  return (
    <div className="card">
      <div className="card__head">
        <div className="card__title"><IChip icon={RiFileList3Line} tone="cyan" size="sm" /><div><h3>Recent activity</h3><small>Your latest wallet credits and debits</small></div></div>
        <CardLink to={`${BASE}/wallet/transactions`}>All transactions</CardLink>
      </div>
      <Tabs label="Direction" value={tab} onChange={setTab} tabs={[["all", "All", ledger.length], ["in", "In", count((r) => r[3].startsWith("+"))], ["out", "Out", count((r) => !r[3].startsWith("+"))]]} />
      <Table foot={false} cols={["Date", "Type", "Wallet", "Amount", "Status"]} rows={rows} />
    </div>
  );
}

export default function Overview() {
  const limitPct = (earningLimit.earned / earningLimit.max) * 100;
  const done = setup.filter((s) => s[3]).length;

  return (
    <div className="pg">
      <Panel
        chips={[[RiCalendarLine, today], [RiCheckLine, `${user.tier} member`]]}
        eyebrow={`Welcome back, ${user.name.split(" ")[0]} · total balance`}
        value={usd(totalUsd)}
        sub={`Across Deposit, Withdraw, Profit and Affiliate wallets · ${tokenWallets[0].balance.toLocaleString("en-US")} ${TOKEN}`}
        tiles={[
          ...usdWallets.map((w) => [w.label.replace(" wallet", ""), usd(w.balance), walletIcon[w.id]]),
          ["Token staking", tokenWallets[0].balance.toLocaleString("en-US"), RiCoinsLine],
          ["Token withdrawal", tokenWallets[1].balance.toLocaleString("en-US"), RiSafe2Line],
        ]}
        actions={<>
          <Link className="ui-btn ui-btn--cyan" to={`${BASE}/wallet/deposit`}><RiDownload2Line />Deposit</Link>
          <Link className="ui-btn" to={`${BASE}/wallet/withdraw`}><RiUpload2Line />Withdraw</Link>
          <Link className="ui-btn" to={`${BASE}/wallet/transfer`}><RiArrowLeftRightLine />Transfer</Link>
          <Link className="card__link" to={`${BASE}/wallet`}>Open Wallet Center<RiArrowRightLine /></Link>
        </>}
        aside={
          <div className="vstack">
            <span className="xp__aside-title">Earning limit · cap used</span>
            <Ring pct={limitPct} sub="used" size={136} />
            <KV rows={[["Maximum", usd(earningLimit.max, 0)], ["Earned", usd(earningLimit.earned, 0)], ["Remaining", usd(earningLimit.max - earningLimit.earned, 0)]]} />
          </div>
        }
      />

      <div className="card setup">
        <div className="setup__head">
          <div><h3>Account setup</h3><small>{done} of {setup.length} steps complete</small></div>
          <Meter pct={(done / setup.length) * 100} />
        </div>
        <div className="setup__steps">
          {setup.map(([title, text, Icon, ok, to]) => (
            <Link key={title} to={`${BASE}/${to}`} className={`setup__step ${ok ? "is-done" : "is-next"}`}>
              <IChip icon={ok ? RiCheckLine : Icon} tone={ok ? "green" : "cyan"} size="sm" />
              <b>{title}</b>
              <small>{text}</small>
              <span className="setup__go">{ok ? "Done" : "Start"}<RiArrowRightLine /></span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid-4">
        <Stat label="Active investment" value={usd(invested, 0)} icon={RiLineChartLine} tone="blue" foot={`${activePlans.length} plans running`} spark={[9, 10, 10, 11, 12, 12, 13, 14, 14, 15, 15, 16]} />
        <Stat label="Profit" value={usd(usdWallets[1].balance)} icon={RiHandCoinLine} tone="green" delta={6.4} foot="vs last month" spark={[8, 9, 8, 10, 11, 10, 12, 13, 12, 14, 15, 17]} sparkColor="#34d399" />
        <Stat label="Affiliate earnings" value={usd(usdWallets[2].balance)} icon={RiShakeHandsLine} tone="violet" delta={12.1} foot="vs last month" spark={[5, 6, 6, 8, 7, 9, 10, 9, 12, 13, 15, 16]} sparkColor="#a5b4fc" />
        <Stat label="Trading bot" value={bot.active ? "Active" : "Not paid"} icon={RiRobot2Line} tone="cyan" foot={bot.active ? `Paid until ${bot.paidUntil}` : "Activate for $30"} spark={[4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11]} sparkColor="#22d3ee" />
      </div>

      <div className="grid-main">
        <Growth />
        <Card title="Income breakdown" sub="Where your credits come from" icon={RiPieChart2Line} tone="violet" action={<CardLink to={`${BASE}/earnings`}>Earnings</CardLink>}>
          <Breakdown items={income} />
        </Card>
      </div>

      <DrawBanner />

      <div className="grid-main">
        <Activity />
        <Card title="Milestones" sub="Your next rank and weekly reward" icon={RiTrophyLine} tone="gold" action={<CardLink to={`${BASE}/reports/rank`}>Rewards</CardLink>}>
          <div className="vstack">
            <div className="ranks">
              <div><span>Current</span><b>{rank.current}</b></div>
              <RiArrowRightLine />
              <div><span>Next</span><b className="ranks__next">{rank.next}</b></div>
            </div>
            {rank.goals.map(([label, have, need]) => (
              <div className="goal-line" key={label}>
                <div><span>{label}</span><b className="num">{usd(have, 0)} / {usd(need, 0)}</b></div>
                <Meter pct={(have / need) * 100} tone="gold" />
              </div>
            ))}
            <div className="goal-line">
              <div><span>Weekly bonus</span><b className="num">{usd(rank.weekly.earned, 0)} of {usd(rank.weekly.target, 0)} target</b></div>
              <Meter pct={(rank.weekly.earned / rank.weekly.target) * 100} />
            </div>
            <small className="note">Next payout {rank.weekly.next}</small>
          </div>
        </Card>
      </div>

      <div className="card team-card">
        <div className="card__head">
          <div className="card__title"><IChip icon={RiTeamLine} tone="violet" size="sm" /><div><h3>Your team</h3><small>Grow your network to unlock bonuses</small></div></div>
          <CardLink to={`${BASE}/affiliate`}>Affiliate</CardLink>
        </div>
        <div className="team-card__body">
          <div className="team-card__stats">
            {[["Direct members", team.directs, RiUserFollowLine], ["Active directs", team.activeDirects, RiCheckLine], ["Downline", team.downline, RiTeamLine], ["Team investment", usd(team.volume, 0), RiLineChartLine]].map(([k, v, Icon]) => (
              <div key={k}><IChip icon={Icon} tone="blue" size="sm" /><span>{k}</span><b className="num">{v}</b></div>
            ))}
          </div>
          <div className="team-card__ref">
            <div className="ref-row"><IChip icon={RiHashtag} tone="cyan" size="sm" /><div><span>Referral code</span><b className="code">{user.sponsorId}</b></div><CopyButton text={user.sponsorId} /></div>
            <div className="ref-row"><IChip icon={RiLinksLine} tone="cyan" size="sm" /><div><span>Invite link</span><b className="code">{user.inviteLink}</b></div><CopyButton text={`https://${user.inviteLink}`} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
