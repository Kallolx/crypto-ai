import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { RiArrowLeftLine, RiCheckLine, RiDownload2Fill, RiAddLine, RiAddCircleFill } from "react-icons/ri";
import { Badge, Mask } from "../ui";
import { Ring } from "./Investments";
import { findPlan, planDocs, planFaq } from "../plansData";

const timeline = [["Plan started", "Your plan was created"], ["In progress", "Reports are generated on schedule"], ["Completes", "The plan closes and a final report is issued"]];

export default function InvestDetails() {
  const { id } = useParams();
  const plan = findPlan(id);
  const [open, setOpen] = useState(0);
  if (!plan) return <Navigate to="/dashboard-v2/investments" replace />;

  const { name, Icon, status, progress, summary, includes } = plan;
  const stage = status === "done" ? 2 : progress > 5 ? 1 : 0;

  return (
    <div className="dx-stack">
      <div className="dx-card dx-backbar"><Link to="/dashboard-v2/investments" className="dx-back"><RiArrowLeftLine />All plans</Link></div>

      <section className="dx-card dx-pd">
        <header className="dx-pc__head">
          <span className="dx-tile"><Icon /></span>
          <div><h2>{name}</h2><small>{summary}</small></div>
          <Badge tone={status === "done" ? "blue" : "active"}>{status === "done" ? "Completed" : "Active"}</Badge>
        </header>
        <div className="dx-pd__body">
          <Ring value={progress} />
          <dl className="dx-pd__stats">
            <div><dt>Amount</dt><dd><Mask /></dd></div>
            <div><dt>Earned</dt><dd><Mask /></dd></div>
            <div><dt>Duration</dt><dd><Mask w={3} /></dd></div>
            <div><dt>Started</dt><dd><Mask w={5} /></dd></div>
            <div><dt>Ends</dt><dd><Mask w={5} /></dd></div>
            <div><dt>Plan ID</dt><dd><Mask w={6} /></dd></div>
          </dl>
        </div>
        <Link to={`/dashboard-v2/investments/${id}/invest`} className="dx-btn dp-btn dp-block">
          {status === "done" ? <RiAddCircleFill /> : <RiAddLine />}{status === "done" ? "Invest again" : "Invest more"}
        </Link>
      </section>

      <div className="dx-grid">
        <section className="dx-card">
          <div className="dx-title"><h2>What's included</h2></div>
          <ul className="dx-checks">{includes.map((t) => <li key={t}><RiCheckLine />{t}</li>)}</ul>
        </section>

        <section className="dx-card">
          <div className="dx-title"><h2>Timeline</h2></div>
          <ol className="dx-tl">
            {timeline.map(([t, d], i) => (
              <li key={t} className={i <= stage ? "is-done" : ""}>
                <i />
                <span><b>{t}</b><small>{d}</small></span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="dx-card">
        <div className="dx-title"><h2>Documents</h2></div>
        <ul className="dx-list">
          {planDocs.map((d) => (
            <li key={d}><span className="dx-tile"><RiDownload2Fill /></span><span className="dx-list__main"><b>{d}</b><small>PDF · sample file</small></span><button type="button" className="dp-ghost">Download</button></li>
          ))}
        </ul>
      </section>

      <section className="dx-card">
        <div className="dx-title"><h2>Questions</h2></div>
        <div className="dx-faq">
          {planFaq.map(([q, a], i) => (
            <div key={q} className={i === open ? "is-open" : ""}>
              <button type="button" aria-expanded={i === open} onClick={() => setOpen(i === open ? -1 : i)}>{q}<RiAddLine /></button>
              {i === open && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
