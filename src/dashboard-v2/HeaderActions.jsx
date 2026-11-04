import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiNotification3Fill, RiArrowDownSLine,
  RiUser3Fill, RiWallet3Fill, RiArrowLeftRightFill, RiLogoutBoxRFill, RiCheckDoubleFill,
} from "react-icons/ri";
import Avatar from "./Avatar";
import { user } from "./data";

const initial = [
  { id: 1, title: "Sign-in from a new device", text: "London, UK", time: "2 min", unread: true },
  { id: 2, title: "Deposit confirmed", text: "Added to Main wallet", time: "1 hr", unread: true },
  { id: 3, title: "A friend joined your invite", text: "Maria S. accepted", time: "Yesterday", unread: true },
  { id: 4, title: "Withdrawal request received", text: "Processing", time: "Oct 31", unread: false },
];

const links = [
  [RiUser3Fill, "My profile", "/dashboard-v2/profile"],
  [RiWallet3Fill, "Wallets", "/dashboard-v2/wallets"],
  [RiArrowLeftRightFill, "Transactions", "/dashboard-v2/transactions"],
];

/* Bell with a notifications panel + avatar with an account menu. Panels close on outside click or Escape. */
export default function HeaderActions() {
  const [open, setOpen] = useState(null); // "bell" | "user" | null
  const [items, setItems] = useState(initial);
  const ref = useRef(null);
  const unread = items.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return undefined;
    const out = (e) => { if (!ref.current?.contains(e.target)) setOpen(null); };
    const esc = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", out);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", out); document.removeEventListener("keydown", esc); };
  }, [open]);

  const toggle = (name) => setOpen(open === name ? null : name);

  return (
    <div className="dh" ref={ref}>
      <div className="dh__cluster">
        <button type="button" className="dh__bell" aria-label={`Notifications${unread ? `, ${unread} new` : ""}`} aria-expanded={open === "bell"} onClick={() => toggle("bell")}>
          <RiNotification3Fill />
          {unread > 0 && <b>{unread}</b>}
        </button>

        <button type="button" className="dh__user" aria-label="Account menu" aria-expanded={open === "user"} onClick={() => toggle("user")}>
          <Avatar size={40} ring online />
          <span className="dh__name"><b>{user.name.split(" ")[0]}</b><small>Member</small></span>
          <RiArrowDownSLine className="dh__chev" />
        </button>
      </div>

      {open === "bell" && (
        <div className="dh__panel dx-dark" role="dialog" aria-label="Notifications">
          <div className="dh__phead">
            <h3>Notifications</h3>
            <button type="button" onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))} disabled={!unread}><RiCheckDoubleFill />Mark all read</button>
          </div>
          <ul>
            {items.map(({ id, title, text, time, unread: u }) => (
              <li key={id} className={u ? "is-new" : ""}>
                <span><b>{title}</b><small>{text}</small></span>
                <time className="dh__time">{time}</time>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open === "user" && (
        <div className="dh__panel dh__panel--menu dx-dark" role="menu">
          <div className="dh__me">
            <Avatar size={52} ring />
            <span><b>{user.name}</b><small>{user.email}</small></span>
          </div>
          <nav>
            {links.map(([Icon, label, to]) => (
              <Link key={to} to={to} role="menuitem" onClick={() => setOpen(null)}><Icon />{label}</Link>
            ))}
          </nav>
          <Link to="/login" className="dh__out" role="menuitem"><RiLogoutBoxRFill />Sign out</Link>
        </div>
      )}
    </div>
  );
}
