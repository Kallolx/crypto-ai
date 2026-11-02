import { Link } from "react-router-dom";
import { RiTicket2Line } from "react-icons/ri";
import { Countdown } from "../ui";
import { draw } from "../data";
import { BASE } from "../nav";

/* Monthly draw promo strip, reused on Overview, Earnings and Deposit pages */
export default function DrawBanner({ title = "Your ticket to this month's prize draw", text }) {
  return (
    <section className="drawbar">
      <div className="drawbar__text">
        <span className="xp__eyebrow">Monthly draw · {draw.dateLabel}</span>
        <h3>{title}</h3>
        <p>{text || `$${draw.price} a ticket, paid from your Deposit wallet.`}</p>
      </div>
      <div className="drawbar__cd">
        <span className="xp__aside-title">Draw closes in</span>
        <Countdown to={draw.date} />
      </div>
      <div className="drawbar__cta">
        <Link className="ui-btn ui-btn--cyan" to={`${BASE}/draw/buy`}><RiTicket2Line />Get your ticket</Link>
        <Link className="card__link" to={`${BASE}/draw/results`}>See prizes</Link>
      </div>
    </section>
  );
}
