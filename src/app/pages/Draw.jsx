import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiTicket2Line, RiCheckLine, RiTrophyLine, RiMedalLine, RiAwardLine, RiCalendarLine, RiWallet3Line, RiAddLine,
  RiSubtractLine, RiFileList3Line, RiUserStarLine, RiCoinsLine,
} from "react-icons/ri";
import { Panel, Card, CardLink, Countdown, Steps, Table, Empty, Banner, IChip, usd } from "../ui";
import { draw, myTickets, lastDraw, usdWallets } from "../data";
import { BASE } from "../nav";

const pool = draw.prizes.reduce((a, [, amt, n]) => a + amt * n, 0);
const winners = draw.prizes.reduce((a, [, , n]) => a + n, 0);
const placeIcon = [RiTrophyLine, RiMedalLine, RiAwardLine];

function TicketArt() {
  return (
    <div className="ticket">
      <div className="ticket__top">
        <span className="xp__eyebrow">Crypto-AI</span>
        <b>Monthly Draw</b>
        <span className="ticket__prize num">{usd(draw.prizes[0][1], 0)} USDT</span>
      </div>
      <div className="ticket__stub">
        <span>Admit one</span>
        <b className="num">{usd(draw.price)}</b>
      </div>
    </div>
  );
}

export function BuyTickets() {
  const [qty, setQty] = useState(5);
  const [done, setDone] = useState(false);
  const total = qty * draw.price;
  const balance = usdWallets[0].balance;
  const set = (n) => { setQty(Math.max(1, Math.min(10, n))); setDone(false); };

  return (
    <div className="pg">
      <Panel
        chips={[[RiTicket2Line, "Monthly draw · tickets on sale"]]}
        title="Your ticket to this month's prize draw"
        sub="Buy tickets from your Deposit wallet and get ready for the live draw."
        actions={<>
          <a className="ui-btn ui-btn--cyan" href="#buy"><RiTicket2Line />Get your tickets</a>
          <a className="ui-btn" href="#how">How it works</a>
        </>}
        aside={<TicketArt />}
      >
        <Countdown to={draw.date} />
        <div className="xp__chips xp__chips--foot">
          <span className="xp__chip"><RiCalendarLine />Draw on {draw.dateLabel}</span>
          <span className="xp__chip"><RiCoinsLine />{usd(draw.price)} per ticket</span>
          <span className="xp__chip"><RiUserStarLine />You hold {draw.myTickets} tickets for this draw</span>
        </div>
      </Panel>

      <div className="grid-main">
        <Card title="This month's prizes" sub={`${usd(pool, 0)} across ${winners} winners. Every ticket is a chance at every prize.`} icon={RiTrophyLine} tone="gold">
          <div className="grand">
            <IChip icon={RiTrophyLine} tone="gold" size="lg" />
            <div><span>Grand prize</span><b className="num">{usd(draw.prizes[0][1], 0)} USDT</b></div>
          </div>
          <div className="prizes">
            {draw.prizes.slice(1).map(([name, amt, n], i) => (
              <div className="prize" key={i}>
                <IChip icon={i < 2 ? placeIcon[i + 1] : RiAwardLine} tone={i < 2 ? "violet" : "blue"} size="sm" />
                <span>{name}</span>
                <b className="num">{usd(amt, 0)}</b>
                <small>{n > 1 ? `${n} winners · each` : "1 winner"}</small>
              </div>
            ))}
          </div>
        </Card>

        <div className="card" id="buy">
          <div className="card__head"><div className="card__title"><IChip icon={RiTicket2Line} tone="cyan" size="sm" /><div><h3>Buy tickets</h3><small>Instant entry into the {draw.dateLabel} draw</small></div></div></div>
          <div className="card__body fieldset">
            <span className="xp__aside-title">How many tickets?</span>
            <div className="opts opts--4">
              {draw.packs.map((n) => (
                <button key={n} className="opt opt--center" aria-pressed={qty === n} onClick={() => set(n)}>
                  {n === 5 && <span className="opt__tag">Popular</span>}
                  <b className="num">{n}</b><span>ticket{n > 1 ? "s" : ""}</span>
                </button>
              ))}
            </div>
            <div className="stepper">
              <button aria-label="One fewer" onClick={() => set(qty - 1)}><RiSubtractLine /></button>
              <b className="num">{qty}</b>
              <button aria-label="One more" onClick={() => set(qty + 1)}><RiAddLine /></button>
              <small>1–10 per purchase</small>
            </div>
            <div className="summary__total"><span>Total payable</span><b className="num">{usd(total)}</b></div>
            <div className="wallet-row">
              <IChip icon={RiWallet3Line} tone="blue" size="sm" />
              <div><b>Deposit wallet</b><small>Covers {Math.floor(balance / draw.price)} tickets</small></div>
              <b className="num">{usd(balance)}</b>
            </div>
            {done
              ? <Banner icon={RiCheckLine} tone="ok" title={`${qty} tickets added`} text="They're in My tickets with the draw date." />
              : <button className="ui-btn ui-btn--cyan ui-btn--lg ui-btn--block" disabled={total > balance} onClick={() => setDone(true)}><RiTicket2Line />Buy {qty} ticket{qty > 1 ? "s" : ""} for {usd(total, 0)}</button>}
            <p className="note">Winners are drawn at random. Winning isn't guaranteed.</p>
          </div>
        </div>
      </div>

      <div className="grid-main" id="how">
        <Card title="How it works" sub="Three steps between you and the draw">
          <Steps row items={[["Buy tickets", `${usd(draw.price, 0)} each, 1–10 per purchase, from your Deposit wallet.`], ["Wait for the draw", `The draw runs on ${draw.dateLabel}. More tickets, more chances.`], ["Check the results", "Winners are announced on the results page."]]} />
        </Card>
        <Card title="Recent winners" sub="Members who won in past draws" body={false} action={<CardLink to={`${BASE}/draw/results`}>All results</CardLink>}>
          <ul className="list">
            {lastDraw.top.map(([place, name, amt, member, ticket], i) => (
              <li key={place}>
                <IChip icon={placeIcon[i]} tone={i === 0 ? "gold" : "violet"} size="sm" />
                <span className="list__text"><b>{member}</b><small>Ticket {ticket} · {lastDraw.month}</small></span>
                <span className="list__val num">{usd(amt, 0)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function MyTickets() {
  const entered = myTickets.filter((t) => t[5].startsWith("Entered")).length;
  return (
    <div className="pg">
      <Panel
        eyebrow="My tickets"
        value={`${myTickets.length} tickets`}
        sub="Tickets for current and past draws, with their results."
        tiles={[["This draw", String(entered), RiTicket2Line], ["Wins", "1", RiTrophyLine], ["Won", "$100.00", RiCoinsLine]]}
        actions={<Link className="ui-btn ui-btn--cyan" to={`${BASE}/draw/buy`}><RiTicket2Line />Buy tickets</Link>}
        aside={<><span className="xp__aside-title">Next draw closes in</span><Countdown to={draw.date} /></>}
      />
      <Card title="Tickets" sub={`Showing 1–${myTickets.length} of ${myTickets.length}`} icon={RiFileList3Line} tone="cyan" body={false}>
        <Table cols={["Ticket number", "Price", "Type", "Draw date", "Purchased", "Status"]} rows={myTickets}
          empty={<Empty icon={RiTicket2Line} title="No tickets yet" text="Tickets you buy show up here with their draw date and result." />} />
      </Card>
    </div>
  );
}

export function DrawResults() {
  return (
    <div className="pg">
      <Panel
        chips={[[RiCheckLine, "Results final"]]}
        title={`${lastDraw.month} draw`}
        sub={`All ${lastDraw.winners} winners were drawn on ${lastDraw.date}. Congratulations to every winner!`}
        tiles={[["Prize pool", usd(lastDraw.pool, 0), RiCoinsLine], ["Winners", String(lastDraw.winners), RiUserStarLine], ["Your result", "7th · $100", RiAwardLine]]}
        actions={<Link className="ui-btn ui-btn--cyan" to={`${BASE}/draw/buy`}><RiTicket2Line />Buy tickets for November</Link>}
        aside={<div className="grand-mini"><RiTrophyLine /><span>Grand prize</span><b className="num">{usd(lastDraw.top[0][2], 0)}</b><small>USDT</small></div>}
      />
      <div className="podium">
        {[1, 0, 2].map((i) => {
          const [place, name, amt, member, ticket] = lastDraw.top[i];
          const Icon = placeIcon[i];
          return (
            <div className={`card podium__card podium__card--${i + 1}`} key={place}>
              <IChip icon={Icon} tone={i === 0 ? "gold" : "violet"} size="lg" />
              <span className="podium__place">{place} place · {name}</span>
              <b className="num">{usd(amt, 0)}</b>
              <small className="code">{member} · {ticket}</small>
            </div>
          );
        })}
      </div>
      <Card title="Other prize winners" sub="Every winner from 4th place onward" icon={RiAwardLine} tone="blue" body={false}>
        <Table cols={["Place", "Member", "Ticket", "Prize"]} rows={lastDraw.others} />
      </Card>
    </div>
  );
}

