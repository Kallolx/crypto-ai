import "./Background.css";

/* Fixed page backdrop: drifting aurora blobs, faint grid and a grain layer */
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__aurora bg__aurora--a" />
      <div className="bg__aurora bg__aurora--b" />
      <div className="bg__aurora bg__aurora--c" />
      <div className="bg__grid" />
      <div className="bg__noise" />
    </div>
  );
}
