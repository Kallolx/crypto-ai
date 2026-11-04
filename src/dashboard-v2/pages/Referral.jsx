import {
  RiWhatsappFill,
  RiTelegramFill,
  RiTwitterXFill,
  RiMailFill,
  RiShareForwardFill,
  RiUserAddFill,
  RiGift2Fill,
} from "react-icons/ri";
import { Badge, CopyButton, Mask } from "../ui";

const share = [
  ["WhatsApp", RiWhatsappFill, "#16a34a"],
  ["Telegram", RiTelegramFill, "#0ea5e9"],
  ["X/Twitter", RiTwitterXFill, "#0b1b4d"],
  ["Email", RiMailFill, "#7c3aed"],
];
const steps = [
  [
    RiShareForwardFill,
    "Share your link",
    "Send your personal invite to a friend.",
  ],
  [RiUserAddFill, "Friend joins", "They create an account from your link."],
  [RiGift2Fill, "You both get a reward", "A thank-you perk lands in Rewards."],
];
const invites = [
  ["Maria S.", "Joined", "active"],
  ["Daniel K.", "Joined", "active"],
  ["Priya R.", "Invited", "wait"],
  ["Tom W.", "Joined", "active"],
];

/* Single-level "invite a friend" screen. Every value is masked. */
export default function Referral() {
  return (
    <div className="dx-stack">
      <section className="dx-card dx-invite">
        <div className="dx-invite__top">
          <span className="dx-tile dx-tile--violet">
            <RiGift2Fill />
          </span>
          <div>
            <h2>Invite a friend</h2>
            <small>Share your link and earn a thank-you perk.</small>
          </div>
        </div>
        <div className="dx-field">
          <small>Your invite link</small>
          <div>
            <span>
              <Mask w={16} />
            </span>
            <CopyButton />
          </div>
        </div>
        <div className="dx-share">
          {share.map(([name, Icon, color]) => (
            <button key={name} type="button" style={{ "--c": color }}>
              <Icon />
              {name}
            </button>
          ))}
        </div>
      </section>

      <section className="dx-sum dx-card">
        <div>
          <small>Invited</small>
          <strong>
            <Mask w={2} />
          </strong>
        </div>
        <div>
          <small>Joined</small>
          <strong>
            <Mask w={2} />
          </strong>
        </div>
        <div>
          <small>Rewards</small>
          <strong>
            <Mask w={4} />
          </strong>
        </div>
      </section>

      <div className="dx-grid">
        <section className="dx-card">
          <div className="dx-title">
            <h2>How it works</h2>
          </div>
          <ul className="dx-list">
            {steps.map(([Icon, t, d]) => (
              <li key={t}>
                <span className="dx-tile dx-tile--blue">
                  <Icon />
                </span>
                <span className="dx-list__main">
                  <b>{t}</b>
                  <small>{d}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="dx-card">
          <div className="dx-title">
            <h2>Your invites</h2>
          </div>
          <ul className="dx-list">
            {invites.map(([n, s, tone]) => (
              <li key={n}>
                <span className="dx-av">{n[0]}</span>
                <span className="dx-list__main">
                  <b>{n}</b>
                  <small>Friend</small>
                </span>
                <Badge tone={tone}>{s}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
