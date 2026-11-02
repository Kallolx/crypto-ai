import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiFileTextLine, RiArrowRightLine, RiPushpinLine, RiFileList3Line, RiBuilding2Line, RiBookOpenLine, RiTimeLine,
  RiWallet3Line, RiLineChartLine, RiHandCoinLine, RiTeamLine, RiCalendarLine,
} from "react-icons/ri";
import { Panel, Card, Tabs, Table, IChip, Field } from "../ui";
import { Bars } from "../charts";
import { user, ledger, reportLibrary, statements } from "../data";
import { BASE } from "../nav";

// Library entries that have their own page
const routeFor = {
  "My investments": "reports/investments", "My staking": "reports/staking", "Daily profit": "reports/profit", "Affiliate bonus": "reports/affiliate",
  "Level bonus": "reports/level", "Weekly bonus": "reports/weekly", "Withdraw bonus": "reports/withdraw", "Rank rewards": "reports/rank",
  "All income": "reports/all", "Draw tickets": "draw/tickets", Transactions: "wallet/transactions", Deposits: "wallet/deposit",
  Withdrawals: "wallet/withdraw", Transfers: "wallet/transfer", "Direct members": "affiliate/directs", "Downline members": "affiliate/downline",
  "Affiliate tree": "affiliate/tree",
};
const catIcon = { "Wallet & funds": RiWallet3Line, Investments: RiLineChartLine, Income: RiHandCoinLine, Team: RiTeamLine };
const catTone = { "Wallet & funds": "blue", Investments: "cyan", Income: "green", Team: "violet" };
const PERIODS = ["7 days", "30 days", "This month", "Last month", "All time"];
const all = reportLibrary.flatMap(([cat, items]) => items.map((name) => ({ cat, name })));
// Fund records per day, last 14 days (sample)
const activity = [2, 1, 0, 3, 1, 2, 0, 1, 4, 2, 1, 3, 2, 3].map((value, i) => ({ label: `Oct ${20 + i}`, value }));

export default function ReportCenter() {
  const navigate = useNavigate();
  const [report, setReport] = useState("All income");
  const [period, setPeriod] = useState("This month");
  const [cat, setCat] = useState("all");
  const [pinned, setPinned] = useState(["All income", "Transactions"]);
  const shown = cat === "all" ? all : all.filter((r) => r.cat === cat);
  const open = (name) => navigate(`${BASE}/${routeFor[name] || "report-center"}`);
  const togglePin = (name) => setPinned((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  return (
    <div className="pg">
      <Panel
        chips={[[RiFileTextLine, "Report Center"], [RiCalendarLine, "Statement · Nov 2026"]]}
        title="Account statement"
        sub={`@${user.username} · No. RC-202611-48213`}
        tiles={[["Fund records", String(ledger.length), RiFileList3Line], ["Last activity", ledger[0][0].split(",")[0], RiTimeLine], ["Reports in library", String(all.length), RiBookOpenLine], ["Generated", "Nov 02", RiCalendarLine]]}
        actions={<>
          <a className="ui-btn ui-btn--cyan" href="#builder"><RiBuilding2Line />Build statement</a>
          <button className="ui-btn" onClick={() => open("Transactions")}><RiWallet3Line />Transactions</button>
          <button className="ui-btn" onClick={() => open("All income")}><RiHandCoinLine />All income</button>
        </>}
        aside={<div className="xp-chart"><span className="xp__aside-title">Records by day · last 14 days</span><div className="xp-chart__plot"><Bars data={activity} format={(v) => `${v} records`} /></div></div>}
      />

      <div className="grid-2">
        <Card title="Pinned" icon={RiPushpinLine} tone="gold" body={false}>
          <ul className="list">
            {pinned.length ? pinned.map((n) => (
              <li key={n}><span className="list__text"><b>{n}</b><small>{all.find((r) => r.name === n)?.cat}</small></span><button className="ui-btn ui-btn--sm" onClick={() => open(n)}>Open</button></li>
            )) : <li><span className="list__text"><small>Pin a report from the library to keep it here.</small></span></li>}
          </ul>
        </Card>
        <Card title="Monthly statements" icon={RiCalendarLine} tone="blue" body={false}>
          <Table foot={false} cols={["Period", "Deposits", "Earnings", "Withdrawals"]} rows={statements} />
        </Card>
      </div>

      <div className="grid-main" id="builder">
        <Card title="Statement builder" sub="Pick a report and a period. It opens already filtered." icon={RiBuilding2Line} tone="cyan">
          <div className="fieldset">
            <Field label="Report">
              <select value={report} onChange={(e) => setReport(e.target.value)}>
                {reportLibrary.map(([c, items]) => <optgroup key={c} label={c}>{items.map((n) => <option key={n}>{n}</option>)}</optgroup>)}
              </select>
            </Field>
            <div className="grid-2">
              <Field label="From"><input type="date" defaultValue="2026-10-01" /></Field>
              <Field label="To"><input type="date" defaultValue="2026-11-02" /></Field>
            </div>
            <div className="chips">{PERIODS.map((p) => <button key={p} className="chip" aria-pressed={period === p} onClick={() => setPeriod(p)}>{p}</button>)}</div>
            <div className="wallet-row"><IChip icon={RiFileTextLine} tone="blue" size="sm" /><div><b>Opens</b><small className="code">/dashboard/{routeFor[report]}</small></div></div>
            <button className="ui-btn ui-btn--cyan ui-btn--lg" onClick={() => open(report)}>Open statement<RiArrowRightLine /></button>
          </div>
        </Card>
        <Card title="Records by category" icon={RiFileList3Line} tone="violet">
          <ul className="legend legend--rows">
            {reportLibrary.map(([c, items]) => <li key={c}><IChip icon={catIcon[c]} tone={catTone[c]} size="sm" />{c}<b className="num">{items.length}</b></li>)}
          </ul>
        </Card>
      </div>

      <div className="card">
        <div className="card__head"><div className="card__title"><span className="ichip tone-blue ichip--sm"><RiBookOpenLine /></span><div><h3>Report library</h3><small>{all.length} reports across {reportLibrary.length} ledgers</small></div></div></div>
        <Tabs label="Category" value={cat} onChange={setCat} tabs={[["all", "All", all.length], ...reportLibrary.map(([c, items]) => [c, c, items.length, catIcon[c]])]} />
        <div className="libgrid">
          {shown.map((r) => (
            <div key={r.name} className="libitem">
              <IChip icon={catIcon[r.cat]} tone={catTone[r.cat]} size="sm" />
              <span className="list__text"><b>{r.name}</b><small>{r.cat}</small></span>
              <button className={`ui-btn ui-btn--sm ${pinned.includes(r.name) ? "is-pinned" : ""}`} aria-label={`Pin ${r.name}`} aria-pressed={pinned.includes(r.name)} onClick={() => togglePin(r.name)}><RiPushpinLine /></button>
              <button className="ui-btn ui-btn--sm" onClick={() => open(r.name)}>Open</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
