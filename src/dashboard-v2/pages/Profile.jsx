import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiUser3Fill, RiLockPasswordFill, RiNotification3Fill, RiShieldKeyholeFill, RiDeleteBin6Fill,
  RiLogoutBoxRFill, RiCamera2Fill, RiSmartphoneFill, RiComputerFill, RiTabletFill, RiVerifiedBadgeFill, RiDownload2Fill,
  RiAlertFill, RiHistoryFill, RiLinksFill, RiSave3Fill, RiCheckboxCircleFill, RiMailFill, RiPhoneFill,
} from "react-icons/ri";
import { Modal, Select, Switch, Tabs } from "../ui";
import { user } from "../data";
import Avatar, { setPhoto, usePhoto } from "../Avatar";

const sections = [["profile", "Profile"], ["security", "Security"], ["prefs", "Preferences"], ["data", "Privacy & data"]];

const opt = (list) => list.map((v) => ({ value: v, label: v }));
const countries = opt(["United Kingdom", "Germany", "France", "Spain", "Italy", "Netherlands", "Australia", "Singapore", "India", "Turkey", "Nigeria", "Brazil"]);
const languages = opt(["English", "Deutsch", "Français", "Español", "Italiano", "Português", "Türkçe"]);
const zones = opt(["UTC", "Europe/London", "Europe/Berlin", "Asia/Singapore", "Asia/Kolkata", "Australia/Sydney"]);
const currencies = opt(["USD", "EUR", "GBP", "AUD", "SGD"]);
const dateFormats = opt(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]);
const dials = opt(["+44", "+49", "+33", "+34", "+39", "+31", "+61", "+65", "+91", "+90", "+234", "+55"]);

const sessions = [
  { id: 1, Icon: RiComputerFill, name: "Windows · Browser", where: "London, UK", when: "Active now", current: true },
  { id: 2, Icon: RiSmartphoneFill, name: "Phone · App", where: "London, UK", when: "2 hours ago" },
  { id: 3, Icon: RiTabletFill, name: "Tablet · Browser", where: "Manchester, UK", when: "Oct 29" },
];

/* Setting row: icon tile, title + description, control on the right */
const Row = ({ Icon, title, text, children }) => (
  <div className="dp-row">
    <span className="dx-tile"><Icon /></span>
    <span className="dp-row__txt"><b>{title}</b>{text && <small>{text}</small>}</span>
    <div className="dp-row__ctl">{children}</div>
  </div>
);

const Input = ({ label, ...rest }) => <label className="dx-input"><small>{label}</small><input {...rest} /></label>;
const Group = ({ title, text, children }) => (
  <section className="dx-card dp-group">
    <div className="dp-group__head"><h2>{title}</h2>{text && <p>{text}</p>}</div>
    {children}
  </section>
);

function SaveBar({ onSave, saved }) {
  return (
    <div className="dp-save">
      <span className={`dp-save__msg ${saved ? "is-on" : ""}`}><RiCheckboxCircleFill />Changes saved</span>
      <button type="button" className="dx-btn dp-btn" onClick={onSave}><RiSave3Fill />Save changes</button>
    </div>
  );
}

export default function Profile() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const photo = usePhoto();
  const file = useRef(null);

  const [form, setForm] = useState({ first: "Alex", last: "Morgan", email: user.email, dial: "+44", phone: "7700 900123", country: "United Kingdom", bio: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const pick = (k) => (v) => setForm({ ...form, [k]: v });

  const [prefs, setPrefs] = useState({ language: "English", zone: "Europe/London", currency: "USD", date: "DD/MM/YYYY" });
  const [sec, setSec] = useState({ twofa: true, alerts: true, biometric: false });
  const [list, setList] = useState(sessions);

  const [confirm, setConfirm] = useState(null); // "delete" | "deactivate" | "clear" | null
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };
  const closeModal = () => { setConfirm(null); setTyped(""); setDone(false); };

  const modal = {
    delete: { title: "Delete account", text: "This permanently removes your profile, wallets view, history and settings. This cannot be undone.", cta: "Delete my account", word: "DELETE" },
    deactivate: { title: "Deactivate account", text: "Your profile is hidden and you are signed out everywhere. You can come back any time by signing in.", cta: "Deactivate", word: "" },
    clear: { title: "Clear activity history", text: "Removes the activity and login history shown in your account.", cta: "Clear history", word: "" },
  }[confirm];

  return (
    <div className="dx-stack">
      {/* ---------- summary ---------- */}
      <section className="dx-card dx-dark dp-hero">
        <div className="dp-avatar">
          <Avatar size={76} ring />
          <button type="button" aria-label="Change photo" onClick={() => file.current?.click()}><RiCamera2Fill /></button>
          <input ref={file} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && setPhoto(URL.createObjectURL(e.target.files[0]))} />
        </div>
        <div className="dp-hero__id">
          <h2>{form.first} {form.last}</h2>
          <small>{form.email}</small>
          <div className="dp-hero__tags">
            <span><RiVerifiedBadgeFill />Verified</span>
            <span>Member since Aug 2026</span>
          </div>
        </div>
        <Link to="/login" className="dp-out"><RiLogoutBoxRFill />Sign out</Link>
      </section>

      <Tabs className="dx-tabs--scroll" items={sections} value={tab} onChange={setTab} label="Profile sections" />

      {/* ---------- profile ---------- */}
      {tab === "profile" && (
        <>
          <Group title="Personal details" text="This is how you appear in your account.">
            <div className="dp-grid">
              <Input label="First name" value={form.first} onChange={set("first")} />
              <Input label="Last name" value={form.last} onChange={set("last")} />
              <Input label="Email" type="email" value={form.email} onChange={set("email")} />
              <div className="dp-phone">
                <Select label="Code" options={dials} value={form.dial} onChange={pick("dial")} />
                <Input label="Phone number" inputMode="tel" value={form.phone} onChange={set("phone")} />
              </div>
              <Select label="Country" options={countries} value={form.country} onChange={pick("country")} />
              <label className="dx-input dp-span"><small>About you</small><textarea rows="3" value={form.bio} onChange={set("bio")} placeholder="A short bio (optional)" /></label>
            </div>
            <SaveBar onSave={save} saved={saved} />
          </Group>
        </>
      )}

      {/* ---------- security ---------- */}
      {tab === "security" && (
        <>
          <Group title="Password" text="Use at least 8 characters with a mix of letters, numbers and symbols.">
            <div className="dp-grid">
              <Input label="Current password" type="password" placeholder="••••••••" />
              <span className="dp-span-hide" />
              <Input label="New password" type="password" placeholder="••••••••" />
              <Input label="Confirm new password" type="password" placeholder="••••••••" />
            </div>
            <SaveBar onSave={save} saved={saved} />
          </Group>

          <Group title="Protection">
            <Row Icon={RiShieldKeyholeFill} title="Two-factor authentication" text="Ask for a code at every sign in"><Switch label="Two-factor authentication" checked={sec.twofa} onChange={(v) => setSec({ ...sec, twofa: v })} /></Row>
            <Row Icon={RiNotification3Fill} title="Sign-in alerts" text="Email me about new devices"><Switch label="Sign-in alerts" checked={sec.alerts} onChange={(v) => setSec({ ...sec, alerts: v })} /></Row>
            <Row Icon={RiLockPasswordFill} title="Biometric unlock" text="Use fingerprint or face on supported phones"><Switch label="Biometric unlock" checked={sec.biometric} onChange={(v) => setSec({ ...sec, biometric: v })} /></Row>
            <Row Icon={RiMailFill} title="Recovery email" text="alex.backup@example.com"><button type="button" className="dp-ghost">Change</button></Row>
            <Row Icon={RiPhoneFill} title="Recovery phone" text="Not added"><button type="button" className="dp-ghost">Add</button></Row>
          </Group>

          <Group title="Active sessions" text="Devices that are signed in to your account.">
            {list.map(({ id, Icon, name, where, when, current }) => (
              <Row key={id} Icon={Icon} title={`${name}${current ? " (this device)" : ""}`} text={`${where} · ${when}`}>
                {!current && <button type="button" className="dp-ghost" onClick={() => setList(list.filter((s) => s.id !== id))}>Sign out</button>}
              </Row>
            ))}
            <div className="dp-save">
              <span />
              <button type="button" className="dp-ghost dp-ghost--danger" onClick={() => setList(list.filter((s) => s.current))}>Sign out all other devices</button>
            </div>
          </Group>
        </>
      )}

      {/* ---------- preferences ---------- */}
      {tab === "prefs" && (
        <Group title="Preferences" text="Language, region and how things look.">
          <div className="dp-grid">
            <Select label="Language" options={languages} value={prefs.language} onChange={(v) => setPrefs({ ...prefs, language: v })} />
            <Select label="Time zone" options={zones} value={prefs.zone} onChange={(v) => setPrefs({ ...prefs, zone: v })} />
            <Select label="Display currency" options={currencies} value={prefs.currency} onChange={(v) => setPrefs({ ...prefs, currency: v })} />
            <Select label="Date format" options={dateFormats} value={prefs.date} onChange={(v) => setPrefs({ ...prefs, date: v })} />
          </div>
          <SaveBar onSave={save} saved={saved} />
        </Group>
      )}

      {/* ---------- privacy & data ---------- */}
      {tab === "data" && (
        <>
          <Group title="Your data" text="Download or clear what we keep about you.">
            <Row Icon={RiDownload2Fill} title="Export my data" text="A copy of your profile and history"><button type="button" className="dx-btn dp-btn"><RiDownload2Fill />Export</button></Row>
            <Row Icon={RiHistoryFill} title="Clear activity history" text="Remove login and activity history"><button type="button" className="dp-ghost" onClick={() => setConfirm("clear")}>Clear</button></Row>
            <Row Icon={RiLinksFill} title="Connected apps" text="Disconnect apps that can access your account"><button type="button" className="dp-ghost">Manage</button></Row>
          </Group>

          <section className="dx-card dp-danger">
            <div className="dp-group__head"><h2><RiAlertFill />Danger zone</h2><p>These actions affect your whole account.</p></div>
            <Row Icon={RiUser3Fill} title="Deactivate account" text="Hide your profile and sign out everywhere"><button type="button" className="dp-ghost dp-ghost--danger" onClick={() => setConfirm("deactivate")}>Deactivate</button></Row>
            <Row Icon={RiDeleteBin6Fill} title="Delete account" text="Permanently remove your account and data"><button type="button" className="dx-btn dx-btn--danger dp-btn" onClick={() => setConfirm("delete")}><RiDeleteBin6Fill />Delete account</button></Row>
          </section>
        </>
      )}

      {/* ---------- confirm dialog ---------- */}
      <Modal open={!!confirm} onClose={closeModal} title={modal?.title}>
        {modal && !done && (
          <div className="dp-modal">
            <span className="dx-tile"><RiAlertFill /></span>
            <h3>{modal.title}</h3>
            <p>{modal.text}</p>
            {modal.word && (
              <label className="dp-confirm"><small>Type {modal.word} to confirm</small><input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={modal.word} /></label>
            )}
            <div className="dp-modal__acts">
              <button type="button" className="dp-ghost dp-ghost--light" onClick={closeModal}>Cancel</button>
              <button type="button" className="dx-btn dx-btn--danger dp-btn" disabled={!!modal.word && typed !== modal.word} onClick={() => setDone(true)}>{modal.cta}</button>
            </div>
          </div>
        )}
        {modal && done && (
          <div className="dp-modal">
            <span className="dx-tile"><RiCheckboxCircleFill /></span>
            <h3>Request received</h3>
            <p>This is a sample screen, so nothing was changed.</p>
            <div className="dp-modal__acts"><button type="button" className="dx-btn dp-btn" onClick={closeModal}>Done</button></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
