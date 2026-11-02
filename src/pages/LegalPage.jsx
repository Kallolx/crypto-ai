import { Link } from "react-router-dom";
import { RiInformationLine, RiTimeLine, RiMailLine, RiArrowRightUpLine, RiCheckLine } from "react-icons/ri";
import PageHero from "@/sections/PageHero/PageHero";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import Button from "@/components/ui/Button/Button";
import { legal } from "@/data/legal";
import { site } from "@/config/site";
import "./LegalPage.css";

const tabs = [["terms", "Terms", "/terms"], ["privacy", "Privacy", "/privacy"], ["risk", "Risk", "/risk"]];
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function LegalPage({ doc }) {
  const d = legal[doc];
  const others = tabs.filter(([k]) => k !== doc);

  return (
    <>
      <PageHero crumb={d.crumb} segments={[{ text: d.title[0] }, { text: d.title[1], className: "text-gradient" }]} lead={d.lead} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container legal">
          <nav className="legal__tabs" aria-label="Legal documents">
            {tabs.map(([k, label, to]) => (
              <Link key={k} to={to} className={k === doc ? "is-active" : ""}>{label}</Link>
            ))}
          </nav>

          <div className="legal__meta">
            <span><RiTimeLine />Last updated {d.updated}</span>
            <span><RiMailLine />{site.email}</span>
          </div>

          <div className="legal__glance">
            {d.glance.map(([k, v]) => (
              <div key={k}>
                <GlassCard className="legal__fact">
                  <small>{k}</small>
                  <strong>{v}</strong>
                </GlassCard>
              </div>
            ))}
          </div>

          <div className="legal__body">
            <aside className="legal__toc">
              <span className="legal__toc-title mono">On this page</span>
              <ol>
                {d.sections.map((s, i) => (
                  <li key={s.title}><Link to={`#${slug(s.title)}`}><span className="mono">{String(i + 1).padStart(2, "0")}</span>{s.title}</Link></li>
                ))}
              </ol>
            </aside>

            <div className="legal__list">
              {d.sections.map((s, i) => (
                <div key={s.title} id={slug(s.title)}>
                  <GlassCard className="legal__item">
                    <span className="legal__n mono">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                      {s.points && (
                        <ul>
                          {s.points.map((p) => (
                            <li key={p}><RiCheckLine />{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </GlassCard>
                </div>
              ))}

              <div>
                <GlassCard strong className="legal__contact">
                  <div>
                    <h3>Questions about this document?</h3>
                    <p>Our support team can explain anything that is unclear. Read the related documents too.</p>
                    <div className="legal__links">
                      {others.map(([k, label, to]) => <Link key={k} to={to}>{label} <RiArrowRightUpLine /></Link>)}
                    </div>
                  </div>
                  <Button href={`mailto:${site.email}`} icon={RiMailLine}>Contact support</Button>
                </GlassCard>
              </div>

              <p className="notice"><RiInformationLine />Draft text for review. The final document must be approved by qualified legal counsel before launch.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
