import Reveal from "@/components/ui/Reveal";
import "./SectionHeading.css";

/* Eyebrow + title + optional lead. align: "center" | "split" | "left" */
export default function SectionHeading({ eyebrow, title, lead, align = "center", children }) {
  return (
    <div className={`sh sh--${align}`}>
      <div className="sh__main">
        {eyebrow && (
          <Reveal className="sh__eyebrow">
            <span className="sh__dot" />
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h2" delay={0.06}>{title}</Reveal>
        {lead && align !== "split" && <Reveal as="p" className="lead" delay={0.12}>{lead}</Reveal>}
      </div>
      {align === "split" && lead && <Reveal as="p" className="sh__aside" delay={0.12}>{lead}</Reveal>}
      {children}
    </div>
  );
}
