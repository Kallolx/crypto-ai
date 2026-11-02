import "./SectionHeading.css";

/* Eyebrow + title + optional lead. align: "center" | "split" | "left" */
export default function SectionHeading({ eyebrow, title, lead, align = "center", children }) {
  return (
    <div className={`sh sh--${align}`}>
      <div className="sh__main">
        {eyebrow && (
          <div className="sh__eyebrow">
            <span className="sh__dot" />
            {eyebrow}
          </div>
        )}
        <h2>{title}</h2>
        {lead && align !== "split" && <p className="lead">{lead}</p>}
      </div>
      {align === "split" && lead && <p className="sh__aside">{lead}</p>}
      {children}
    </div>
  );
}
