import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine } from "react-icons/ri";
import { planList } from "../plansData";

/* Plan picker: choose a plan, then continue to the invest flow */
export default function InvestNew() {
  return (
    <div className="dx-stack">
      <section className="dx-card dx-backbar">
        <Link to="/dashboard-v2/investments" className="dx-back"><RiArrowLeftLine />All plans</Link>
        <p className="dx-lead">Pick the plan that fits you. You can compare what each one includes.</p>
      </section>
      <div className="dx-plans">
        {planList.map(({ id, name, Icon, summary, includes }) => (
          <article key={id} className="dx-card dx-pc">
            <header className="dx-pc__head">
              <span className="dx-tile"><Icon /></span>
              <div><h3>{name}</h3><small>{summary}</small></div>
            </header>
            <ul className="dx-checks">{includes.slice(0, 4).map((t) => <li key={t}><RiCheckLine />{t}</li>)}</ul>
            <footer className="dx-pc__foot">
              <Link to={`/dashboard-v2/investments/${id}`}>Details</Link>
              <Link to={`/dashboard-v2/investments/${id}/invest`} className="dx-btn dp-btn">Choose<RiArrowRightLine /></Link>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
