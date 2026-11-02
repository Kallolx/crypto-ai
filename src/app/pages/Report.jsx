import { useState } from "react";
import { Link } from "react-router-dom";
import { RiDownload2Line, RiSearchLine, RiFileTextLine, RiPieChart2Line, RiFileList3Line, RiCalendarLine, RiHandCoinLine, RiTimeLine } from "react-icons/ri";
import { Panel, Card, Breakdown, Table, Empty, usd } from "../ui";
import { reports, income, lifetime, activePlans, stakes, profitLedger, user, TOKEN } from "../data";
import { BASE } from "../nav";

const amountOf = (s) => Number(String(s).replace(/[^\d.]/g, "")) || 0;

/* Rows, columns, headline tiles and a breakdown for each report type */
function build(slug) {
  const r = reports[slug];
  if (r.kind === "plans") {
    const invested = activePlans.reduce((a, p) => a + p.amount, 0);
    return {
      value: usd(invested), label: "Total invested (active)",
      tiles: [["Active plans", `${activePlans.length} of ${activePlans.length}`], ["Profit earned", usd(activePlans.reduce((a, p) => a + p.earned, 0))], ["Profit today", usd(139.8)], ["Next payout", "Today 21:00"]],
      breakdown: ["Active capital by plan", activePlans.map((p) => [p.name, p.amount])],
      cols: ["Plan", "ID", "Type", "Invested", "Earned", "Started", "Status"],
      rows: activePlans.map((p) => [p.name, p.id, p.kind, usd(p.amount), `+${usd(p.earned)}`, p.started, "Running~ok"]),
    };
  }
  if (r.kind === "stakes") {
    const s = stakes[0];
    return {
      value: usd(stakes.reduce((a, x) => a + x.amount, 0)), label: "Total staked (active)",
      tiles: [["Active stakes", String(stakes.length)], ["Tokens paid", `${s.released.toLocaleString("en-US")} ${TOKEN}`], ["Tokens to come", `${(s.tokens - s.released).toLocaleString("en-US")} ${TOKEN}`], ["Next distribution", s.next]],
      breakdown: ["Tokens", [["Released", s.released], ["Still locked", s.tokens - s.released]]],
      format: (v) => `${v.toLocaleString("en-US")} ${TOKEN}`,
      cols: ["Term", "ID", "Staked", "Tokens", "Next release", "Unlocks", "Status"],
      rows: stakes.map((x) => [x.name, x.id, usd(x.amount), `${x.tokens.toLocaleString("en-US")} ${TOKEN}`, x.next, x.unlock, "Locked~info"]),
    };
  }
  if (r.kind === "all") {
    const rows = [
      ...profitLedger.map(([d, pkg, , amt]) => [d, "Daily profit", pkg, amt, "Credited~ok"]),
      ...["affiliate", "level", "weekly", "rank"].flatMap((k) => reports[k].rows.map((row) => [row[0], reports[k].source, row[1], row[3], row[4]])),
    ];
    return {
      value: usd(lifetime), label: "Total income",
      tiles: [["This month", usd(1284.6)], ["Today", usd(92.4)], ["Biggest source", income[0][0]], ["Credits", String(rows.length)]],
      breakdown: ["Income by source", income],
      cols: ["Date", "Source", "Detail", "Amount", "Status"],
      rows,
    };
  }
  const total = income.find(([key]) => key === r.source)?.[1] ?? 0;
  const groups = {};
  r.rows.forEach((row) => {
    const g = row[1].split(" · ")[0];
    groups[g] = (groups[g] || 0) + amountOf(row[3]);
  });
  return {
    value: usd(total), label: "Total earned",
    tiles: [["This month", usd(r.rows.reduce((a, row) => a + amountOf(row[3]), 0))], ["Credits", String(r.rows.length)], ["Last credit", r.rows[0]?.[0] ?? "—"]],
    breakdown: [`By ${r.cols[1].toLowerCase()}`, Object.entries(groups)],
    cols: r.cols,
    rows: r.rows,
  };
}

export default function Report({ slug }) {
  const r = reports[slug];
  const data = build(slug);
  const [q, setQ] = useState("");
  const rows = data.rows.filter((row) => !q || row.join(" ").toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="pg">
      <Panel
        chips={[[RiFileTextLine, `${r.title} · statement`], [RiCalendarLine, "Updated Nov 02, 2026"]]}
        eyebrow={data.label}
        value={data.value}
        sub={`${r.lead} @${user.username}`}
        tiles={data.tiles.map(([k, v], i) => [k, v, [RiHandCoinLine, RiFileList3Line, RiTimeLine, RiCalendarLine][i]])}
        actions={<>
          <button className="ui-btn ui-btn--cyan"><RiDownload2Line />Export CSV</button>
          <Link className="ui-btn" to={`${BASE}/report-center`}><RiFileTextLine />Report Center</Link>
        </>}
      />

      <div className="grid-main">
        <div className="card">
          <div className="card__head">
            <div className="card__title"><span className="ichip tone-cyan ichip--sm"><RiFileList3Line /></span><div><h3>Records</h3><small>{rows.length} of {data.rows.length}</small></div></div>
            <label className="search-sm"><RiSearchLine /><input type="search" placeholder="Filter records" aria-label="Filter records" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          </div>
          <Table cols={data.cols} rows={rows} empty={<Empty icon={RiSearchLine} title={q ? `No records match “${q}”` : "No records yet"} />} />
        </div>
        <Card title={data.breakdown[0]} icon={RiPieChart2Line} tone="violet">
          <Breakdown items={data.breakdown[1]} format={data.format} />
        </Card>
      </div>
    </div>
  );
}
