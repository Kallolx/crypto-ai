import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  RiSearchLine, RiCustomerService2Line, RiVideoChatLine, RiCheckLine, RiArrowDownSLine, RiTimeLine, RiQuestionLine,
  RiTicketLine, RiBookOpenLine, RiHourglassLine, RiLoader4Line, RiCheckDoubleLine, RiArrowRightLine, RiHandCoinLine,
  RiCalendarCheckLine, RiDownload2Line, RiUpload2Line, RiArrowLeftRightLine, RiLineChartLine, RiUser3Line, RiMore2Line,
} from "react-icons/ri";
import { Panel, Card, Tabs, Table, Empty, KV, IChip, Field, Banner } from "../ui";
import { tickets, ticketTopics, help, schedule } from "../data";
import { BASE } from "../nav";

const popular = ["Withdrawals", "Deposits", "2FA", "Earning limit", "Staking"];
const topicIcon = { deposit: RiDownload2Line, withdrawal: RiUpload2Line, transfer: RiArrowLeftRightLine, plans: RiLineChartLine, account: RiUser3Line, other: RiMore2Line };

function SearchBox({ value, onChange, onSubmit }) {
  return (
    <form className="vstack" onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
      <label className="search-lg">
        <RiSearchLine />
        <input type="search" placeholder="Describe your question, e.g. withdrawal limit" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Search the Help Center" />
        <button className="ui-btn ui-btn--cyan ui-btn--sm">Search</button>
      </label>
      <div className="chips">
        <span className="note">Popular:</span>
        {popular.map((p) => <button type="button" key={p} className="chip" onClick={() => onChange(p.split(" ")[0])}>{p}</button>)}
      </div>
    </form>
  );
}

export function SupportCenter() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("withdrawal");
  const [sent, setSent] = useState(false);
  const [q, setQ] = useState("");
  const open = tickets.filter((t) => !t.status.startsWith("Resolved")).length;
  const steps = [
    ["Pending", 0, "Waiting for our team", RiHourglassLine, "gold"],
    ["In progress", tickets.filter((t) => t.status.startsWith("In progress")).length, "Our team is working on it", RiLoader4Line, "blue"],
    ["Resolved", tickets.filter((t) => t.status.startsWith("Resolved")).length, "Closed with a reply", RiCheckDoubleLine, "green"],
  ];

  return (
    <div className="pg">
      <Panel
        chips={[[RiCustomerService2Line, "Support Center"], [RiCheckLine, "Track every reply in one place"]]}
        title="How can we help you today?"
        sub="Search our answers, raise a ticket, or meet the team on Zoom. We're with you at every step."
        tiles={[["Open tickets", `${open} / 3`, RiTicketLine], ["Resolved", String(steps[2][1]), RiCheckDoubleLine], ["Instant answers", String(help.length), RiBookOpenLine]]}
        aside={<div className="support-art"><IChip icon={RiCustomerService2Line} tone="cyan" size="lg" /><b>Avg. first reply</b><span className="num">4 hours</span></div>}
      >
        <div style={{ width: "100%", marginTop: 14 }}>
          <SearchBox value={q} onChange={setQ} onSubmit={() => navigate(`${BASE}/support/help?q=${encodeURIComponent(q)}`)} />
        </div>
      </Panel>

      <div className="grid-2">
        <a className="card action-card" href="#new-request">
          <IChip icon={RiTicketLine} tone="cyan" size="lg" />
          <div><h3>Create a ticket</h3><p className="note">Deposit, withdrawal or account issue? Our team replies on the ticket with next steps.</p></div>
          <span className="card__link">Start a ticket<RiArrowRightLine /></span>
        </a>
        <Link className="card action-card" to={`${BASE}/events/request`}>
          <IChip icon={RiVideoChatLine} tone="violet" size="lg" />
          <div><h3>Request a Zoom meeting</h3><p className="note">A private session with the CEO or a representative, at a time that suits you.</p></div>
          <span className="card__link">Book a meeting<RiArrowRightLine /></span>
        </Link>
      </div>

      <div className="journey">
        {steps.map(([label, count, text, Icon, tone], i) => (
          <div className="card journey__step" key={label}>
            <IChip icon={Icon} tone={tone} />
            <div><small>Step {i + 1}</small><b>{label}</b><small>{text}</small></div>
            <span className="num">{count}</span>
          </div>
        ))}
      </div>

      <div className="grid-main" id="new-request">
        <Card title="New request" sub="Our team replies on your ticket, usually with next steps" icon={RiTicketLine} tone="cyan">
          {sent ? (
            <Banner icon={RiCheckLine} tone="ok" title="Ticket created" text="You'll get an email when the team replies." />
          ) : (
            <form className="fieldset" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="f">
                <span>1 · What's it about?</span>
                <div className="opts opts--topics">
                  {ticketTopics.map(([id, label, hint]) => (
                    <button type="button" key={id} className="opt opt--row" aria-pressed={topic === id} onClick={() => setTopic(id)}>
                      <IChip icon={topicIcon[id]} tone="blue" size="sm" /><span><b>{label}</b><span>{hint}</span></span>
                    </button>
                  ))}
                </div>
              </div>
              <Field label="2 · Subject" required><input placeholder="Short summary of the issue" required /></Field>
              <Field label="3 · Details" required hint="Include amounts, dates and any transaction hash."><textarea rows="4" placeholder="Tell us what happened" required /></Field>
              <button className="ui-btn ui-btn--cyan ui-btn--lg"><RiCustomerService2Line />Submit ticket</button>
            </form>
          )}
        </Card>
        <Card title="Response times" icon={RiTimeLine} tone="blue">
          <KV rows={[["Average first reply", "4 hours"], ["Withdrawal issues", "Under 4h"], ["Deposits", "Under 2h"], ["Account security", "Under 1h"], ["Working days", "Mon – Sat"]]} />
        </Card>
      </div>

      <Card title="Ticket history" sub={`${tickets.length} tickets`} icon={RiTicketLine} tone="violet" body={false}>
        <Table cols={["Ticket", "Subject", "Topic", "Updated", "Status"]} rows={tickets.map((t) => [t.id, t.subject, t.topic, t.updated, t.status])} />
      </Card>
    </div>
  );
}

export function HelpCenter() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(0);
  const cats = [...new Set(help.map(([c]) => c))];
  const list = help.filter(([c, title, body]) => (cat === "all" || c === cat) && (!q || `${title} ${body}`.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="pg">
      <Panel
        chips={[[RiBookOpenLine, "Help Center"]]}
        title="How can we help?"
        sub={`${help.length} answers about deposits, withdrawals, plans, your team and your account.`}
        actions={<Link className="ui-btn" to={`${BASE}/support/center`}><RiCustomerService2Line />Contact support</Link>}
        aside={<div className="support-art"><IChip icon={RiQuestionLine} tone="cyan" size="lg" /><b>Still stuck?</b><span>Open a ticket</span></div>}
      >
        <div style={{ width: "100%", marginTop: 14 }}><SearchBox value={q} onChange={(v) => { setQ(v); setOpen(0); }} /></div>
      </Panel>
      <div className="card">
        <div className="card__head"><div className="card__title"><IChip icon={RiBookOpenLine} tone="blue" size="sm" /><div><h3>All articles</h3><small>{list.length} of {help.length} answers</small></div></div></div>
        <Tabs label="Category" value={cat} onChange={(c) => { setCat(c); setOpen(0); }} tabs={[["all", "All", help.length], ...cats.map((c) => [c, c, help.filter((h) => h[0] === c).length])]} />
        {list.length ? (
          <ul className="faq-list">
            {list.map(([c, title, body], i) => (
              <li key={title} className={open === i ? "is-open" : ""}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <IChip icon={RiQuestionLine} tone="blue" size="sm" />
                  <span className="list__text"><b>{title}</b><small>{c}</small></span>
                  <RiArrowDownSLine />
                </button>
                {open === i && <p>{body}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <Empty icon={RiSearchLine} title="No answers match" text="Try another word or pick a different category." />
        )}
      </div>
    </div>
  );
}

export function RewardSchedule() {
  const icons = [RiHandCoinLine, RiCalendarCheckLine, RiCheckDoubleLine, RiCheckDoubleLine, RiTimeLine];
  return (
    <div className="pg">
      <Panel
        chips={[[RiTimeLine, "My reward time"], [RiCheckLine, "Times shown in UTC"]]}
        eyebrow="Next payout"
        value="Today · 21:00 UTC"
        sub="Rewards are paid automatically at fixed times. Daily profit of about $139.80 is due across your two crypto plans."
        tiles={schedule.slice(0, 3).map(([name, , , next]) => [name, next.replace(" UTC", ""), RiTimeLine])}
      />
      <div className="card">
        <div className="card__head"><div className="card__title"><IChip icon={RiCalendarCheckLine} tone="cyan" size="sm" /><div><h3>Reward schedule</h3><small>When the system pays each reward, for every member</small></div></div></div>
        <ul className="list">
          {schedule.map(([name, text, runs, next], i) => (
            <li key={name}>
              <IChip icon={icons[i]} tone={i === 0 ? "green" : "blue"} size="sm" />
              <span className="list__text"><b>{name}</b><small>{text}</small></span>
              <span className="sched"><small>Runs</small>{runs}</span>
              <span className="sched"><small>Next run</small>{next}</span>
              <span className="badge badge--ok">On schedule</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
