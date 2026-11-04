import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RiFileCopyFill, RiCheckboxCircleFill, RiArrowDownSLine, RiCheckLine, RiCloseLine } from "react-icons/ri";

/* Every number in the portfolio piece is hidden behind dots */
export const Mask = ({ w = 4 }) => <span className="dx-mask" aria-label="Hidden value">{"•".repeat(w)}</span>;

export const Badge = ({ tone = "blue", children }) => <em className={`dx-badge dx-badge--${tone}`}>{children}</em>;

/* Copy-style button that only toggles its own label (nothing is copied) */
export function CopyButton({ label = "Copy" }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="dx-copy" onClick={() => { setDone(true); setTimeout(() => setDone(false), 1400); }}>
      {done ? <RiCheckboxCircleFill /> : <RiFileCopyFill />}{done ? "Copied" : label}
    </button>
  );
}

export function QrPlaceholder() {
  const n = 15;
  let s = 5;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const f = (x < 5 && y < 5) || (x > n - 6 && y < 5) || (x < 5 && y > n - 6);
    if (!f && r() > 0.5) cells.push([x, y]);
  }
  const finders = [[0, 0], [n - 5, 0], [0, n - 5]];
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="dx-qr" shapeRendering="crispEdges" aria-hidden="true">
      {finders.map(([x, y]) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="5" height="5" fill="#0b1b4d" />
          <rect x={x + 1} y={y + 1} width="3" height="3" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="1" height="1" fill="#0b1b4d" />
        </g>
      ))}
      {cells.map(([x, y]) => <rect key={`${x},${y}`} x={x} y={y} width="1" height="1" fill="#0b1b4d" />)}
    </svg>
  );
}

/* Tabs with a gliding glass pill. The pill is measured from the active button and moved with a CSS transition. */
export function Tabs({ items, value, onChange, label, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, w: 0, ready: false, animate: false });

  const measure = () => {
    const el = ref.current?.querySelector('[aria-selected="true"]');
    if (el) setPos((p) => ({ ...p, x: el.offsetLeft, w: el.offsetWidth, ready: true }));
  };

  useLayoutEffect(measure, [value, items.length]);
  useEffect(() => {
    // switch transitions on only after the first placement, so the pill never glides in from the left on mount
    const raf = requestAnimationFrame(() => setPos((p) => ({ ...p, animate: true })));
    // re-measure whenever the row (or its buttons) changes size: fonts, resize, flex layout settling
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    ref.current.querySelectorAll("button").forEach((b) => ro.observe(b));
    document.fonts?.ready.then(measure);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div ref={ref} className={`dx-tabs ${className}`} role="tablist" aria-label={label}>
      <span className="dx-tabs__glide" aria-hidden="true"
        style={{ transform: `translateX(${pos.x}px)`, width: pos.w, opacity: pos.ready ? 1 : 0, transition: pos.animate ? undefined : "none" }} />
      {items.map(([id, text]) => (
        <button key={id} type="button" role="tab" aria-selected={value === id} onClick={() => onChange(id)}>{text}</button>
      ))}
    </div>
  );
}

/* Custom dropdown (listbox) instead of the browser select */
export function Select({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className={`dx-sel ${open ? "is-open" : ""}`} ref={ref}>
      <small>{label}</small>
      <button type="button" className="dx-sel__btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        {current.icon && <span className="dx-sel__ico">{current.icon}</span>}
        <span className="dx-sel__val">{current.label}</span>
        <RiArrowDownSLine className="dx-sel__chev" />
      </button>
      {open && (
        <ul className="dx-sel__menu" role="listbox">
          {options.map((o) => (
            <li key={o.value}>
              <button type="button" role="option" aria-selected={o.value === value} onClick={() => { onChange(o.value); setOpen(false); }}>
                {o.icon && <span className="dx-sel__ico">{o.icon}</span>}
                <span>{o.label}{o.note && <small>{o.note}</small>}</span>
                {o.value === value && <RiCheckLine />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Switch({ checked, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} className="dx-switch" onClick={() => onChange(!checked)}><i /></button>
  );
}

/* Dark glass dialog. Closes with Escape, the close button or a click on the backdrop. */
export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="dx-modal" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dx-modal__panel dx-dark" role="dialog" aria-modal="true" aria-label={title}>
        <button type="button" className="dx-modal__x" aria-label="Close" onClick={onClose}><RiCloseLine /></button>
        {children}
      </div>
    </div>
  );
}
