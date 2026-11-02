import { useState } from "react";
import {
  RiShieldCheckLine, RiCheckLine, RiErrorWarningLine, RiUser3Line, RiLockPasswordLine, RiShieldKeyholeLine,
  RiNotification3Line, RiComputerLine, RiMapPinLine, RiTimeLine, RiMailLine, RiCalendarLine, RiGlobalLine, RiSettings3Line,
  RiArrowRightLine, RiVerifiedBadgeLine,
} from "react-icons/ri";
import { Panel, Card, Tabs, Table, KV, Ring, IChip, Field, Banner } from "../ui";
import { user, sessions } from "../data";

function Saved({ show }) {
  return show ? <span className="badge badge--ok">Saved</span> : null;
}

function Profile() {
  const [saved, setSaved] = useState(false);
  const [first, last] = user.name.split(" ");
  return (
    <form className="fieldset" onSubmit={(e) => { e.preventDefault(); setSaved(true); }} onChange={() => setSaved(false)}>
      <span className="xp__aside-title">Identity</span>
      <div className="grid-2">
        <Field label="First name"><input defaultValue={first} /></Field>
        <Field label="Last name"><input defaultValue={last} /></Field>
        <Field label="Email" hint="Locked for your security"><input value={user.email} disabled /></Field>
        <Field label="Username"><input value={user.username} disabled /></Field>
      </div>
      <span className="xp__aside-title">Address</span>
      <div className="grid-2">
        <Field label="Street address"><input placeholder="Street address or P.O. box" /></Field>
        <Field label="Apt, suite, unit"><input placeholder="Optional" /></Field>
        <Field label="City"><input placeholder="City" /></Field>
        <Field label="Country"><select defaultValue="LT"><option value="LT">Lithuania</option><option value="GB">United Kingdom</option><option value="DE">Germany</option></select></Field>
      </div>
      <span className="xp__aside-title">Contact & time zone</span>
      <div className="grid-2">
        <Field label="WhatsApp"><input placeholder="+44 7700 900000" /></Field>
        <Field label="Time zone" hint="Used for event times and emails"><select defaultValue="Europe/Vilnius"><option>Europe/Vilnius</option><option>Europe/London</option><option>UTC</option></select></Field>
      </div>
      <div className="xp__actions"><button className="ui-btn ui-btn--cyan">Save changes</button><Saved show={saved} /></div>
    </form>
  );
}

function Password() {
  const [saved, setSaved] = useState(false);
  return (
    <form className="fieldset narrow" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
      <Field label="Current password"><input type="password" autoComplete="current-password" /></Field>
      <Field label="New password" hint="At least 8 characters with upper and lower case, a number and a symbol"><input type="password" autoComplete="new-password" /></Field>
      <Field label="Confirm new password"><input type="password" autoComplete="new-password" /></Field>
      <div className="xp__actions"><button className="ui-btn ui-btn--cyan">Update password</button><Saved show={saved} /></div>
    </form>
  );
}

function TwoFactor({ on, setOn }) {
  return (
    <div className="fieldset narrow">
      <Banner icon={on ? RiShieldCheckLine : RiErrorWarningLine} tone={on ? "ok" : "warn"} title={`Two-factor authentication is ${on ? "on" : "off"}`}
        text={on ? "Codes from your authenticator app are required for withdrawals and transfers." : "A code from your phone stops anyone who learns your password."} />
      <KV rows={[["Method", "Authenticator app"], ["Required for", "Sign-in, withdrawals, transfers"], ["Backup codes", on ? "8 remaining" : "—"]]} />
      <div className="xp__actions"><button className={`ui-btn ${on ? "" : "ui-btn--cyan"}`} onClick={() => setOn(!on)}>{on ? "Turn off 2FA" : "Turn on 2FA"}</button></div>
    </div>
  );
}

function Notifications() {
  const items = [["Daily profit credited", true], ["Withdrawal status", true], ["New team member", true], ["Events and webinars", false], ["Monthly draw reminders", true]];
  return (
    <ul className="list toggles">
      {items.map(([label, on]) => (
        <li key={label}>
          <span className="list__text"><b>{label}</b><small>Email</small></span>
          <label className="switch"><input type="checkbox" defaultChecked={on} aria-label={label} /><i /></label>
        </li>
      ))}
    </ul>
  );
}

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const [twoFa, setTwoFa] = useState(false);
  const steps = [["Full name", "Added", RiUser3Line, true, "profile"], ["Address", "Add street, city", RiMapPinLine, false, "profile"], ["Two-factor", twoFa ? "On" : "Turn on 2FA", RiShieldKeyholeLine, twoFa, "2fa"], ["Time zone", "Confirmed", RiTimeLine, true, "profile"]];
  const strength = (steps.filter((s) => s[3]).length / steps.length) * 100;

  return (
    <div className="pg">
      <Panel
        chips={[[RiSettings3Line, "Account settings"], [twoFa ? RiShieldCheckLine : RiErrorWarningLine, twoFa ? "2FA on" : "2FA off"], [RiCalendarLine, `Member since ${user.memberSince}`]]}
        aside={
          <div className="limit-row">
            <Ring pct={strength} label={`${strength}%`} sub="strength" size={112} tone={strength === 100 ? "green" : "gold"} />
            <div className="vstack" style={{ gap: 4 }}>
              <span className="xp__aside-title">Account strength</span>
              <b>{strength === 100 ? "Fully secured" : "Needs attention"}</b>
              <small className="note">{steps.filter((s) => !s[3]).length} steps left to fully secure your account.</small>
            </div>
          </div>
        }
      >
        <div className="profile-id">
          <span className="profile-id__avatar">{user.initials}</span>
          <div><h2>{user.name}</h2><span className="badge badge--plain badge--info">@{user.username}</span></div>
        </div>
        <div className="secure-steps">
          {steps.map(([label, text, Icon, ok, to]) => (
            <button key={label} className="secure-step" onClick={() => setTab(to)}>
              <IChip icon={ok ? RiCheckLine : Icon} tone={ok ? "green" : "gold"} size="sm" />
              <div><b>{label}</b><small>{text}</small></div>
              {!ok && <RiArrowRightLine className="muted" />}
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid-main">
        <div className="card">
          <Tabs label="Settings" value={tab} onChange={setTab} tabs={[
            ["profile", "Profile", null, RiUser3Line], ["password", "Password", null, RiLockPasswordLine], ["2fa", "Two-factor", null, RiShieldKeyholeLine],
            ["notifications", "Notifications", null, RiNotification3Line], ["sessions", "Sessions", null, RiComputerLine], ["status", "Account status", null, RiVerifiedBadgeLine],
          ]} />
          {tab === "sessions" ? (
            <Table cols={["Device", "Location", "Last active", "Status"]} rows={sessions} />
          ) : (
            <div className="card__body">
              {tab === "profile" && <Profile />}
              {tab === "password" && <Password />}
              {tab === "2fa" && <TwoFactor on={twoFa} setOn={setTwoFa} />}
              {tab === "notifications" && <Notifications />}
              {tab === "status" && <Banner icon={RiVerifiedBadgeLine} tone="ok" title="No restrictions on your account" text="All features on your account are available." />}
            </div>
          )}
        </div>
        <div className="vstack">
          <Card title="Account snapshot" icon={RiUser3Line} tone="blue">
            <KV rows={[["Username", user.username], ["Email", user.email], ["Country", "Lithuania"], ["Time zone", "Europe/Vilnius"], ["Member since", user.memberSince]]} />
          </Card>
          <Card title="Payout address" sub="Where withdrawals are sent" icon={RiGlobalLine} tone="cyan">
            <KV rows={[["Network", "USDT · BEP20"], ["Address", "0x7a3F…c91E"], ["Last changed", "Oct 22, 2026"]]} />
          </Card>
          <Banner icon={RiMailLine} title="Stay secure" text="We never ask for your password or 2FA codes by email or chat." />
        </div>
      </div>
    </div>
  );
}
