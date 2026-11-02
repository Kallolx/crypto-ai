import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiCalendarEventLine, RiVideoChatLine, RiPlayCircleLine, RiCheckLine, RiUserStarLine, RiTeamLine, RiTimeLine,
  RiMailSendLine, RiArrowLeftLine, RiFileList3Line,
} from "react-icons/ri";
import { Panel, Card, Tabs, Empty, Table, Field, IChip, Banner } from "../ui";
import { events, pastEvents, meetingRequests } from "../data";
import { BASE } from "../nav";

function EventRow({ e, going, onRsvp }) {
  const [mon, d] = e.date.split(" ");
  return (
    <li>
      <span className="datebox"><b className="num">{d}</b><small>{mon}</small></span>
      <span className="list__text"><b>{e.title}</b><small>{e.type} · {e.time || "Recording available"}{e.host ? ` · ${e.host}` : ""}</small></span>
      {onRsvp && (
        <button className={`ui-btn ui-btn--sm ${going ? "" : "ui-btn--primary"}`} onClick={() => onRsvp(e.id)}>
          {going ? <><RiCheckLine />Going</> : "RSVP"}
        </button>
      )}
      {e.recording && <button className="ui-btn ui-btn--sm"><RiPlayCircleLine />Watch</button>}
    </li>
  );
}

export default function Events() {
  const [tab, setTab] = useState("upcoming");
  const [going, setGoing] = useState(() => new Set(events.filter((e) => e.rsvp).map((e) => e.id)));
  const toggle = (id) => setGoing((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    return n;
  });
  const mine = events.filter((e) => going.has(e.id));
  const next = events[0];

  return (
    <div className="pg">
      <Panel
        chips={[[RiCalendarEventLine, "Official events & meetings"], [RiTimeLine, "Times in UTC"]]}
        title="Webinars, AMAs and training from the team"
        sub="RSVP to get reminders, then join right here when it starts. Need a one-to-one call? Request a special Zoom meeting."
        actions={<Link className="ui-btn ui-btn--cyan" to={`${BASE}/events/request`}><RiVideoChatLine />Request a Zoom meeting</Link>}
        aside={
          <div className="vstack">
            <span className="xp__aside-title">Next up</span>
            <div className="next-event">
              <span className="datebox datebox--lg"><b className="num">{next.date.split(" ")[1]}</b><small>{next.date.split(" ")[0]}</small></span>
              <div><b>{next.title}</b><small>{next.type} · {next.time}</small></div>
            </div>
            <button className={`ui-btn ${going.has(next.id) ? "" : "ui-btn--primary"}`} onClick={() => toggle(next.id)}>{going.has(next.id) ? <><RiCheckLine />You're going</> : "RSVP"}</button>
          </div>
        }
      />

      <div className="card">
        <Tabs label="Events" value={tab} onChange={setTab} tabs={[
          ["upcoming", "Upcoming", events.length, RiCalendarEventLine], ["mine", "My events", mine.length, RiUserStarLine],
          ["requests", "Meeting requests", meetingRequests.length, RiVideoChatLine], ["past", "Past", pastEvents.length, RiPlayCircleLine],
        ]} />
        {tab === "upcoming" && <ul className="list">{events.map((e) => <EventRow key={e.id} e={e} going={going.has(e.id)} onRsvp={toggle} />)}</ul>}
        {tab === "mine" && (mine.length
          ? <ul className="list">{mine.map((e) => <EventRow key={e.id} e={e} going onRsvp={toggle} />)}</ul>
          : <Empty icon={RiCalendarEventLine} title="You haven't RSVP'd to anything yet" text="Pick an upcoming event and tap RSVP to get reminders." />)}
        {tab === "requests" && <Table cols={["Request", "With", "When", "Topic", "Status"]} rows={meetingRequests}
          empty={<Empty icon={RiVideoChatLine} title="No meeting requests yet" text="Ask for a one-to-one Zoom call with the team." />} />}
        {tab === "past" && <ul className="list">{pastEvents.map((e) => <EventRow key={e.id} e={e} />)}</ul>}
      </div>
    </div>
  );
}

/* /dashboard/events/request */
export function MeetingRequest() {
  const [who, setWho] = useState("rep");
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="pg">
      <Panel
        chips={[[RiVideoChatLine, "Special Zoom meeting"]]}
        title="Request a one-to-one meeting"
        sub="All fields are required. Times are saved with the time zone you select. Your request is only visible to you and the team."
        actions={<Link className="ui-btn" to={`${BASE}/events`}><RiArrowLeftLine />Back to events</Link>}
        aside={<div className="vstack"><span className="xp__aside-title">Your requests</span>{meetingRequests.map(([id, w, when, , st]) => <div className="mini-row" key={id}><span className="code">{id}</span><span>{w} · {when}</span><span className={`badge badge--${st.split("~")[1]}`}>{st.split("~")[0]}</span></div>)}</div>}
      />
      {sent ? (
        <Banner icon={RiMailSendLine} tone="ok" title="Request sent" text="We'll confirm the time by email." action={<Link className="ui-btn ui-btn--sm" to={`${BASE}/events`}>Back to events</Link>} />
      ) : (
        <form className="card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <div className="formsec">
            <span className="formsec__n num">01</span>
            <div className="formsec__body">
              <h3>Meeting with</h3><p className="note">Select who you'd like to meet.</p>
              <div className="opts">
                {[["ceo", "CEO", "Meet directly with the Crypto-AI CEO.", RiUserStarLine], ["rep", "Representative", "We assign the most suitable person on the team.", RiTeamLine]].map(([id, label, text, Icon]) => (
                  <button type="button" key={id} className="opt opt--row" aria-pressed={who === id} onClick={() => setWho(id)}>
                    <IChip icon={Icon} tone="violet" size="sm" /><span><b>{label}</b><span>{text}</span></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="formsec">
            <span className="formsec__n num">02</span>
            <div className="formsec__body">
              <h3>Preferred schedule</h3><p className="note">Pick a date and time that suits you.</p>
              <div className="grid-3">
                <Field label="Preferred date" required><input type="date" required /></Field>
                <Field label="Preferred time" required><input type="time" required /></Field>
                <Field label="Time zone" required><select defaultValue="Europe/Vilnius"><option>Europe/Vilnius</option><option>Europe/London</option><option>UTC</option></select></Field>
              </div>
            </div>
          </div>
          <div className="formsec">
            <span className="formsec__n num">03</span>
            <div className="formsec__body">
              <h3>Meeting details</h3><p className="note">Tell us what you'd like to discuss.</p>
              <div className="grid-2">
                <Field label="Meeting topic" required><input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Building a team in Germany" required /></Field>
                <Field label="Expected participants" required><input type="number" min="1" defaultValue="1" /></Field>
              </div>
              <Field label="Request details" required hint="Minimum 10 characters."><textarea rows="4" minLength={10} maxLength={2000} required placeholder="What would you like to cover?" /></Field>
            </div>
          </div>
          <div className="formsec__foot">
            <Link className="ui-btn" to={`${BASE}/events`}>Cancel</Link>
            <button className="ui-btn ui-btn--cyan"><RiMailSendLine />Submit meeting request</button>
          </div>
        </form>
      )}
      <Card title="What happens next" icon={RiFileList3Line} tone="blue">
        <p className="note">The team reviews your request within one business day and emails you a confirmed time and Zoom link. You can see its status under Events → Meeting requests.</p>
      </Card>
    </div>
  );
}
