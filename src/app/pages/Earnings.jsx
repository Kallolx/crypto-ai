import { useState } from "react";
import { Link } from "react-router-dom";
import { RiCoinsLine, RiUpload2Line, RiArrowLeftRightLine, RiHandCoinLine, RiTeamLine, RiBarChartBoxLine, RiPieChart2Line, RiFileList3Line, RiBankLine } from "react-icons/ri";
import { Panel, Card, CardLink, Breakdown, Table, Ring, usd } from "../ui";
import { Bars } from "../charts";
import DrawBanner from "./DrawBanner";
import { earningsDaily } from "@/data/dashboard";
import { income, lifetime, withdrawn, ledger, usdWallets } from "../data";
import { BASE } from "../nav";

const profitTotal = income[0][1];
const teamTotal = lifetime - profitTotal;
const credits = ledger.filter((r) => r[3].startsWith("+") && !r[1].startsWith("Deposit"));
const withdrawable = [["Profit", usdWallets[1].balance], ["Affiliate", usdWallets[2].balance], ["Withdraw", usdWallets[3].balance]];
const withdrawableTotal = withdrawable.reduce((a, [, v]) => a + v, 0);

export default function Earnings() {
  const [range, setRange] = useState("14D");
  const series = range === "7D" ? earningsDaily.slice(-7) : earningsDaily;

  return (
    <div className="pg">
      <Panel
        chips={[[RiCoinsLine, "Earnings Center"]]}
        eyebrow="Lifetime earnings"
        value={usd(lifetime)}
        sub="Profit from your plans plus income from your team."
        tiles={[["Profit", usd(profitTotal), RiHandCoinLine], ["Team income", usd(teamTotal), RiTeamLine], ["Withdrawn to date", usd(withdrawn), RiBankLine]]}
        aside={
          <div className="vstack">
            <span className="xp__aside-title">Withdrawable now</span>
            <div className="limit-row">
              <Ring pct={100} label={usd(withdrawableTotal / 1000, 1) + "K"} sub="USD" size={116} />
              <ul className="legend">
                {withdrawable.map(([k, v], i) => <li key={k}><i style={{ background: ["#34d399", "#a5b4fc", "#22d3ee"][i] }} />{k}<b className="num">{usd(v, 0)}</b></li>)}
              </ul>
            </div>
            <div className="xp__actions" style={{ marginTop: 4 }}>
              <Link className="ui-btn ui-btn--cyan" to={`${BASE}/wallet/withdraw`}><RiUpload2Line />Withdraw</Link>
              <Link className="ui-btn" to={`${BASE}/wallet/transfer`}><RiArrowLeftRightLine />Transfer</Link>
            </div>
          </div>
        }
      />

      <div className="grid-main">
        <Card title="Daily earnings" sub="Profit credited each day" icon={RiBarChartBoxLine} tone="blue"
          action={<div className="segm" role="tablist">{["7D", "14D"].map((r) => <button key={r} role="tab" aria-selected={range === r} onClick={() => setRange(r)}>{r}</button>)}</div>}>
          <div className="chart-head">
            <b className="num">{usd(series.reduce((a, d) => a + d.value, 0))}</b>
            <span className="delta delta--up">+12.4%</span>
            <small>vs previous period</small>
          </div>
          <div style={{ height: 230 }}><Bars data={series} format={(v) => usd(v)} /></div>
        </Card>
        <Card title="Income by source" sub="Lifetime" icon={RiPieChart2Line} tone="violet" action={<CardLink to={`${BASE}/reports/all`}>Statement</CardLink>}>
          <Breakdown items={income} />
        </Card>
      </div>

      <DrawBanner title="Put some earnings into the draw" text="Tickets are paid from your Deposit wallet. Every ticket is a chance at this month's prizes." />

      <Card title="Recent credits" sub="Profit and bonuses credited to your wallets" icon={RiFileList3Line} tone="green" body={false} action={<CardLink to={`${BASE}/reports/all`}>All income</CardLink>}>
        <Table cols={["Date", "Source", "Wallet", "Amount", "Status"]} rows={credits} />
      </Card>
    </div>
  );
}
