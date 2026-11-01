import { RiCheckLine } from "react-icons/ri";
import "./Checkbox.css";

export default function Checkbox({ checked, onChange, error, children }) {
  return (
    <div className={`chk-wrap ${error ? "has-error" : ""}`}>
      <label className="chk" data-cursor="hover">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="chk__box"><RiCheckLine /></span>
        <span className="chk__text">{children}</span>
      </label>
      {error && <p className="chk__error" role="alert">{error}</p>}
    </div>
  );
}
