import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiFileCopyLine, RiCheckLine, RiInboxLine, RiArrowRightLine } from "react-icons/ri";
import { Spark } from "./charts";

/* Shared building blocks for the investor pages */

export const usd = (n, d = 2) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;

async function toClipboard(text, done) {
  try {
    await navigator.clipboard.writeText(text);
    done(true);
    setTimeout(() => done(false), 1400);
  } catch {
    /* clipboard unavailable */
  }
}

/* Tinted square icon. tone: blue | cyan | violet | green | gold | red */
export function IChip({ icon: Icon, tone = "blue", size }) {
  return <span className={`ichip tone-${tone} ${size ? `ichip--${size}` : ""}`}><Icon /></span>;
}

/* Hero panel that opens every page.
   chips: [[Icon, label]] · tiles: [[label, value, Icon?]] · aside: right-hand visual */
export function Panel({ chips, eyebrow, title, value, sub, tiles, actions, aside, children }) {
  return (
    <section className="xp">
      <div className="xp__main">
        {chips && (
          <div className="xp__chips">
            {chips.map(([Icon, label]) => <span key={label} className="xp__chip">{Icon && <Icon />}{label}</span>)}
          </div>
        )}
        {eyebrow && <span className="xp__eyebrow">{eyebrow}</span>}
        {title && <h2 className="xp__title">{title}</h2>}
        {value && <span className="xp__value num">{value}</span>}
        {sub && <p className="xp__sub">{sub}</p>}
        {tiles && (
          <div className="xp__tiles">
            {tiles.map(([label, v, Icon]) => (
              <div key={label} className="xp__tile">
                <span>{Icon && <Icon />}{label}</span>
                <b className="num">{v}</b>
              </div>
            ))}
          </div>
        )}
        {children}
        {actions && <div className="xp__actions">{actions}</div>}
      </div>
      {aside && <div className="xp__aside">{aside}</div>}
    </section>
  );
}

/* Route-level pills for hub sections (Wallet, Affiliate…) */
export function SubNav({ items }) {
  return (
    <nav className="subnav" aria-label="Section">
      {items.map(([label, to, Icon]) => (
        <NavLink key={to} to={to} end className="subnav__item">{Icon && <Icon />}{label}</NavLink>
      ))}
    </nav>
  );
}

/* Card with header row; pass icon/tone for a leading icon chip */
export function Card({ title, sub, icon, tone, action, children, body = true, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="card__head">
          <div className="card__title">
            {icon && <IChip icon={icon} tone={tone} size="sm" />}
            <div>
              <h3>{title}</h3>
              {sub && <small>{sub}</small>}
            </div>
          </div>
          {action}
        </div>
      )}
      {body ? <div className="card__body">{children}</div> : children}
    </div>
  );
}

export function CardLink({ to, children }) {
  return <Link className="card__link" to={to}>{children}<RiArrowRightLine /></Link>;
}

/* KPI tile with icon chip, optional delta and edge-to-edge sparkline */
export function Stat({ label, value, icon, tone = "blue", foot, delta, spark, sparkColor }) {
  return (
    <div className="card stat">
      <div className="stat__body">
        <div className="stat__top">
          <span className="stat__label">{label}</span>
          {icon && <IChip icon={icon} tone={tone} size="sm" />}
        </div>
        <span className="stat__value num">{value}</span>
        {(foot || delta != null) && (
          <span className="stat__foot">
            {delta != null && <span className={`delta ${delta >= 0 ? "delta--up" : "delta--down"}`}>{delta >= 0 ? "+" : ""}{delta}%</span>}
            {foot}
          </span>
        )}
      </div>
      {spark && <div className="stat__spark"><Spark data={spark} color={sparkColor} /></div>}
    </div>
  );
}

/* Circular gauge. pct 0–100 */
export function Ring({ pct, label, sub, size = 140, tone = "blue" }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(100, pct));
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id={`ring-${tone}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={tone === "gold" ? "#fcd34d" : tone === "green" ? "#34d399" : "#60a5fa"} />
            <stop offset="1" stopColor={tone === "gold" ? "#f59e0b" : tone === "green" ? "#10b981" : "#22d3ee"} />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(148,178,255,0.12)" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={`url(#ring-${tone})`} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${(p / 100) * c} ${c}`} transform="rotate(-90 60 60)" />
      </svg>
      <div className="ring__label">
        <b className="num">{label ?? `${p.toFixed(1)}%`}</b>
        {sub && <small>{sub}</small>}
      </div>
    </div>
  );
}

/* Numbered "how it works" list */
export function Steps({ items, row }) {
  return (
    <ol className={`steps ${row ? "steps--row" : ""}`}>
      {items.map(([title, text], i) => (
        <li key={title}>
          <span className="steps__n num">{i + 1}</span>
          <div><b>{title}</b><p>{text}</p></div>
        </li>
      ))}
    </ol>
  );
}

/* Tab strip; controlled by the parent */
export function Tabs({ tabs, value, onChange, label }) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {tabs.map(([id, text, count, Icon]) => (
        <button key={id} role="tab" aria-selected={value === id} onClick={() => onChange(id)}>
          {Icon && <Icon />}
          {text}
          {count != null && <span className="tabs__count">{count}</span>}
        </button>
      ))}
    </div>
  );
}

export function CopyButton({ text, label = "Copy", small = true }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={`ui-btn ${small ? "ui-btn--sm" : ""}`} onClick={() => toClipboard(text, setDone)}>
      {done ? <RiCheckLine /> : <RiFileCopyLine />}{done ? "Copied" : label}
    </button>
  );
}

/* Read-only value with a copy button */
export function CopyField({ label, value }) {
  return (
    <div className="copy">
      {label && <span className="copy__label">{label}</span>}
      <div className="copy__box">
        <code>{value}</code>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

/* Label + value rows */
export function KV({ rows }) {
  return (
    <dl className="kv">
      {rows.map(([k, v]) => (
        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

export function Meter({ pct, tone }) {
  return <span className={`meter ${tone ? `meter--${tone}` : ""}`}><i style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} /></span>;
}

const brkTones = ["#3b82f6", "#22d3ee", "#a5b4fc", "#34d399", "#fcd34d", "#fb7185"];

/* Share bars with colour keys, e.g. income by source */
export function Breakdown({ items, format = (v) => usd(v) }) {
  const total = items.reduce((a, [, v]) => a + v, 0) || 1;
  return (
    <ul className="brk">
      {items.map(([label, v], i) => (
        <li key={label}>
          <i style={{ background: brkTones[i % brkTones.length] }} />
          <span className="brk__label">{label}</span>
          <span className="brk__val num">{format(v)}</span>
          <span className="brk__pct">{Math.round((v / total) * 100)}%</span>
          <span className="brk__bar"><b style={{ width: `${(v / total) * 100}%`, background: brkTones[i % brkTones.length] }} /></span>
        </li>
      ))}
    </ul>
  );
}

export function Empty({ icon = RiInboxLine, title, text, action }) {
  return (
    <div className="empty">
      <IChip icon={icon} tone="cyan" size="lg" />
      <b>{title}</b>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}

/* Static countdown blocks (computed once per render) */
export function Countdown({ to }) {
  const ms = Math.max(0, new Date(to) - new Date());
  const parts = [["Days", Math.floor(ms / 864e5)], ["Hours", Math.floor(ms / 36e5) % 24], ["Mins", Math.floor(ms / 6e4) % 60]];
  return (
    <div className="cd">
      {parts.map(([k, v]) => (
        <div key={k}><b className="num">{String(v).padStart(2, "0")}</b><small>{k}</small></div>
      ))}
    </div>
  );
}

/* "Text~tone" -> status badge */
export function Status({ value }) {
  const [text, tone] = value.split("~");
  return tone ? <span className={`badge badge--${tone}`}>{text}</span> : text;
}

const isNumeric = (v) => /^[~+−-]?\$?[\d,.]+( [A-Z]+)?%?$/.test(v);

/* Data table. Rows are arrays of strings (or nodes); numeric columns right-align. */
export function Table({ cols, rows, empty, foot = true }) {
  if (!rows.length) return empty || <Empty title="Nothing here yet" />;
  const num = cols.map((_, j) => rows.every((r) => typeof r[j] === "string" && isNumeric(r[j])));
  const tone = (v) => (typeof v === "string" && /^\+\$/.test(v) ? "positive" : "");
  return (
    <>
      <div className="tbl">
        <table>
          <thead><tr>{cols.map((c, j) => <th key={c} className={num[j] ? "r" : undefined}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((v, j) => (
                  <td key={j} className={num[j] ? `r num ${tone(v)}` : j === 0 ? "fw" : undefined}>
                    {typeof v === "string" ? <Status value={v} /> : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {foot && <div className="tbl__foot"><span>Showing 1–{rows.length} of {rows.length}</span></div>}
    </>
  );
}

/* Labelled form field wrapper */
export function Field({ label, hint, children, required }) {
  return (
    <label className="f">
      <span>{label}{required && <em> *</em>}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function AmountInput({ value, onChange, placeholder = "0.00", unit = "USDT" }) {
  return (
    <div className="amount">
      <span>$</span>
      <input inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} aria-label="Amount" />
      <span>{unit}</span>
    </div>
  );
}

export function Banner({ icon: Icon, tone = "info", title, text, action }) {
  return (
    <div className={`banner banner--${tone}`}>
      {Icon && <IChip icon={Icon} tone={tone === "warn" ? "gold" : tone === "ok" ? "green" : "blue"} size="sm" />}
      <div><b>{title}</b>{text && <p>{text}</p>}</div>
      {action}
    </div>
  );
}

