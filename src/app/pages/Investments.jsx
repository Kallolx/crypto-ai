import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiRobot2Line, RiLineChartLine, RiBitCoinLine, RiGlobalLine, RiCoinsLine, RiTicket2Line, RiWallet3Line,
  RiHandCoinLine, RiShieldCheckLine, RiPieChart2Line, RiFileList3Line, RiDownload2Line,
} from "react-icons/ri";
import { Panel, Card, CardLink, Tabs, Table, KV, Ring, Empty, Banner, Steps, Countdown, usd } from "../ui";
import { Donut, Bars } from "../charts";
import { PlanPicker } from "./Plans";
import { earningsDaily } from "@/data/dashboard";
import { activePlans, stakes, bot, earningLimit, profitLedger, usdWallets, myTickets, draw, TOKEN } from "../data";
import { BASE } from "../nav";

const invested = activePlans.reduce((a, p) => a + p.amount, 0);
const profit = activePlans.reduce((a, p) => a + p.earned, 0);
const staked = stakes.reduce((a, s) => a + s.amount, 0);

const allocation = [
  { label: "Crypto", value: activePlans.filter((p) => p.kind === "Crypto").reduce((a, p) => a + p.amount, 0), color: "#3b82f6" },
  { label: "Forex", value: activePlans.filter((p) => p.kind === "Forex").reduce((a, p) => a + p.amount, 0), color: "#22d3ee" },
  { label: "Staking", value: staked, color: "#a5b4fc" },
];
const allocTotal = allocation.reduce((a, x) => a + x.value, 0);

function BotProduct() {
  return (
    <div className="grid-2">
      <div className="botcard">
        <div className="botcard__head">
          <span className="ichip tone-cyan ichip--lg"><RiRobot2Line /></span>
          <div><b>Trading bot</b><small>{bot.active ? `Active until ${bot.paidUntil}` : "Not active"}</small></div>
          <span className={`badge ${bot.active ? "badge--ok" : "badge--wait"}`}>{bot.active ? "Active" : "Inactive"}</span>
        </div>
        <KV rows={[["Yearly fee", usd(bot.fee)], ["Access", "12 months from payment"], ["Forex plans you own", String(activePlans.filter((p) => p.kind === "Forex").length)]]} />
        <button className="ui-btn ui-btn--block" disabled={bot.active}>{bot.active ? "Bot is active" : `Activate · ${usd(bot.fee)}`}</button>
      </div>
      <Steps items={[["Invest in a Forex plan", "With or without the bot active."], ["Activate the bot", "$30 a year from your Deposit wallet."], ["Profit on schedule", "Paid from the day you activate."]]} />
    </div>
  );
}

function DrawProduct() {
  return (
    <div className="grid-2">
      <div className="vstack">
        <KV rows={[["Next draw", draw.dateLabel], ["Ticket price", usd(draw.price)], ["Top prize", `${usd(draw.prizes[0][1], 0)} USDT`], ["Your tickets", String(draw.myTickets)]]} />
        <Link className="ui-btn ui-btn--cyan" to={`${BASE}/draw/buy`}><RiTicket2Line />Choose tickets</Link>
      </div>
      <div className="vstack"><span className="xp__aside-title">Draw closes in</span><Countdown to={draw.date} /></div>
    </div>
  );
}

function InvestNow() {
  const [kind, setKind] = useState("crypto");
  return (
    <div className="card">
      <div className="card__head">
        <div className="card__title">
          <span className="ichip tone-cyan ichip--sm"><RiLineChartLine /></span>
          <div><h3>Invest now</h3><small>Choose a product, set your amount and continue. You review every detail before anything is charged.</small></div>
        </div>
        <div className="mini-bal">
          <span className="ichip tone-blue ichip--sm"><RiWallet3Line /></span>
          <span><small>Deposit balance</small><b className="num">{usd(usdWallets[0].balance)}</b></span>
          <Link className="ui-btn ui-btn--sm" to={`${BASE}/wallet/deposit`}><RiDownload2Line />Deposit</Link>
        </div>
      </div>
      <Tabs label="Product" value={kind} onChange={setKind} tabs={[
        ["crypto", "Crypto", 4, RiBitCoinLine], ["forex", "Forex", 2, RiGlobalLine], ["bot", "Trading bot", null, RiRobot2Line],
        ["staking", "Staking", 3, RiCoinsLine], ["draw", "Monthly draw", null, RiTicket2Line],
      ]} />
      <div className="card__body">
        {kind === "bot" ? <BotProduct /> : kind === "draw" ? <DrawProduct /> : <PlanPicker key={kind} kind={kind} />}
      </div>
    </div>
  );
}

function Positions() {
  const [tab, setTab] = useState("crypto");
  const crypto = activePlans.filter((p) => p.kind === "Crypto");
  const forex = activePlans.filter((p) => p.kind === "Forex");
  const entered = myTickets.filter((t) => t[5].startsWith("Entered"));
  const planRows = (ps) => ps.map((p) => [p.name, p.id, usd(p.amount), `+${usd(p.earned)}`, p.rate, p.next, "Running~ok"]);

  return (
    <div className="card">
      <div className="card__head">
        <div className="card__title"><span className="ichip tone-violet ichip--sm"><RiPieChart2Line /></span><div><h3>My positions</h3><small>What you already own. To buy more, use Invest now above.</small></div></div>
      </div>
      <Tabs label="Position type" value={tab} onChange={setTab} tabs={[
        ["crypto", "Crypto", crypto.length, RiBitCoinLine], ["forex", "Forex", forex.length, RiGlobalLine], ["bot", "Trading bot", null, RiRobot2Line],
        ["staking", "Staking", stakes.length, RiCoinsLine], ["draw", "Monthly draw", entered.length, RiTicket2Line],
      ]} />
      {tab === "crypto" && <Table cols={["Plan", "ID", "Invested", "Earned", "Rate", "Next payout", "Status"]} rows={planRows(crypto)} />}
      {tab === "forex" && <Table cols={["Plan", "ID", "Invested", "Earned", "Rate", "Next payout", "Status"]} rows={planRows(forex)} />}
      {tab === "staking" && (
        <Table cols={["Term", "ID", "Staked", "Tokens", "Released", "Unlocks", "Status"]}
          rows={stakes.map((s) => [s.name, s.id, usd(s.amount), `${s.tokens.toLocaleString("en-US")} ${TOKEN}`, `${s.released.toLocaleString("en-US")} ${TOKEN}`, s.unlock, "Locked~info"])} />
      )}
      {tab === "bot" && (
        <div className="card__body"><KV rows={[["Status", bot.active ? "Active" : "Not active"], ["Yearly fee", usd(bot.fee)], ["Paid until", bot.paidUntil], ["Forex plans using it", String(forex.length)]]} /></div>
      )}
      {tab === "draw" && (entered.length
        ? <Table cols={["Ticket", "Price", "Type", "Draw date", "Bought", "Status"]} rows={entered} />
        : <Empty icon={RiTicket2Line} title="No tickets for this draw" text="Tickets you buy are listed here with their draw date and result." action={<Link className="ui-btn" to={`${BASE}/draw/buy`}>Buy tickets</Link>} />)}
    </div>
  );
}

export default function Investments() {
  const [range, setRange] = useState("7D");
  const series = range === "7D" ? earningsDaily.slice(-7) : earningsDaily;
  const limitPct = (earningLimit.earned / earningLimit.max) * 100;

  return (
    <div className="pg">
      <Panel
        chips={[[RiLineChartLine, "Investment Center"], [RiRobot2Line, `Trading bot · ${bot.active ? "Active" : "Not paid"}`]]}
        eyebrow="Portfolio value"
        value={usd(invested + staked + profit)}
        sub={`+${usd(profit)} total profit · ROI ${((profit / invested) * 100).toFixed(1)}%`}
        tiles={[["Active capital", usd(invested + staked, 0), RiShieldCheckLine], ["Profit wallet", usd(usdWallets[1].balance), RiHandCoinLine], ["Deposit wallet", usd(usdWallets[0].balance), RiWallet3Line], ["Earning cap used", `${limitPct.toFixed(1)}%`, RiPieChart2Line]]}
        actions={<>
          <Link className="ui-btn ui-btn--cyan" to={`${BASE}/plans/crypto`}><RiBitCoinLine />Crypto</Link>
          <Link className="ui-btn" to={`${BASE}/plans/forex`}><RiGlobalLine />Forex</Link>
          <Link className="ui-btn" to={`${BASE}/plans/staking`}><RiCoinsLine />Stake</Link>
          <Link className="ui-btn" to={`${BASE}/draw/buy`}><RiTicket2Line />Buy tickets</Link>
        </>}
        aside={
          <div className="xp-chart">
            <div className="xp-chart__head">
              <div><span className="xp__aside-title">Daily profit</span><b className="num">{usd(series.reduce((a, d) => a + d.value, 0))}</b><small>last {range === "7D" ? "7" : "14"} days</small></div>
              <div className="segm" role="tablist">{["7D", "14D"].map((r) => <button key={r} role="tab" aria-selected={range === r} onClick={() => setRange(r)}>{r}</button>)}</div>
            </div>
            <div className="xp-chart__plot"><Bars data={series} format={(v) => usd(v)} /></div>
          </div>
        }
      />

      <InvestNow />
      <Positions />

      <div className="grid-main">
        <Card title="Profit ledger" sub="Latest profit credited from your plans" icon={RiFileList3Line} tone="green" action={<CardLink to={`${BASE}/reports/profit`}>View all</CardLink>} body={false}>
          <Table cols={["Date", "Plan", "Rate", "Profit"]} rows={profitLedger} />
        </Card>
        <div className="vstack">
          <Card title="Allocation" sub="Where your active capital is" icon={RiPieChart2Line} tone="violet">
            <div className="mini-donut">
              <div className="mini-donut__ring"><Donut data={allocation} /><span className="num">{usd(allocTotal / 1000, 1)}K</span></div>
              <ul>{allocation.map((a) => <li key={a.label}><i style={{ background: a.color }} />{a.label}<b className="num">{Math.round((a.value / allocTotal) * 100)}%</b></li>)}</ul>
            </div>
          </Card>
          <Card title="Earning limits" sub="Profit and income stop when a limit is reached" icon={RiShieldCheckLine} tone="gold">
            <div className="limit-row">
              <Ring pct={limitPct} sub="used" size={118} />
              <KV rows={[["Maximum", usd(earningLimit.max, 0)], ["Earned", usd(earningLimit.earned, 0)], ["Remaining", usd(earningLimit.max - earningLimit.earned, 0)]]} />
            </div>
          </Card>
          <Banner icon={RiShieldCheckLine} title="Every new plan adds 4× its amount" text="Your earning limit grows with what you invest." />
        </div>
      </div>
    </div>
  );
}
