import { Link } from "react-router-dom";
import "./PageHero.css";

/* Compact hero for inner pages. `segments` are title parts, e.g. [{ text: "Meet" }, { text: "X", className: "text-gradient" }] */
export default function PageHero({ crumb, segments, lead, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <nav className="page-hero__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </nav>
        <h1 className="page-hero__title">
          {segments.map((seg, i) => (
            <span key={i} className={seg.className}>{(i ? " " : "") + seg.text}</span>
          ))}
        </h1>
        {lead && <p className="lead">{lead}</p>}
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </section>
  );
}
