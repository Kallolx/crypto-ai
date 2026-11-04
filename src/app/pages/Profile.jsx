import { useState } from "react";
import { Link } from "react-router-dom";
import { RiNotification3Fill, RiShieldCheckFill, RiLogoutBoxRFill } from "react-icons/ri";
import { user } from "../data";

function Setting({ Icon, tone, title, text }) {
  const [on, setOn] = useState(true);
  return (
    <li>
      <span className={`dx-tile dx-tile--${tone}`}><Icon /></span>
      <span className="dx-list__main"><b>{title}</b><small>{text}</small></span>
      <button role="switch" aria-checked={on} aria-label={title} className="dx-switch" onClick={() => setOn(!on)}><i /></button>
    </li>
  );
}

export default function Profile() {
  return (
    <div className="dx-grid">
      <section className="dx-card dx-user">
        <span className="dx-user__avatar">{user.initials}</span>
        <div><h2>{user.name}</h2><small>{user.email}</small></div>
      </section>
      <section className="dx-card">
        <div className="dx-title"><h2>Preferences</h2></div>
        <ul className="dx-list">
          <Setting Icon={RiNotification3Fill} tone="blue" title="Price alerts" text="Notify me about big moves" />
          <Setting Icon={RiShieldCheckFill} tone="green" title="Two-factor security" text="Extra check at sign in" />
        </ul>
        <Link to="/login" className="dx-signout"><RiLogoutBoxRFill />Sign out</Link>
      </section>
    </div>
  );
}
