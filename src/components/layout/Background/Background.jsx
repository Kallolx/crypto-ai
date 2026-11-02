import "./Background.css";

/* Fixed page backdrop: static gradient glows and a faint grid */
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__grid" />
    </div>
  );
}
