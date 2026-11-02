import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams, Navigate } from "react-router-dom";
import {
  RiRobot2Line, RiInformationLine, RiBitCoinLine, RiGlobalLine, RiCoinsLine, RiCheckLine, RiWallet3Line,
  RiShieldCheckLine, RiTimeLine, RiLineChartLine, RiArrowRightLine, RiFileList3Line,
} from "react-icons/ri";
import { Panel, Card, IChip, Steps, KV, Banner, AmountInput, Field, usd } from "../ui";
import { catalog, catalogAll, usdWallets, bot, TOKEN, TOKEN_PRICE } from "../data";
import { BASE } from "../nav";

const CHIPS = [100, 500, 1000, 5000, 10000];
const depositBalance = usdWallets[0].balance;
const k = (n) => (n >= 1000 ? `$${n / 1000}k` : `$${n}`);
const kindIcon = { crypto: RiBitCoinLine, forex: RiGlobalLine, staking: RiCoinsLine };

// Highest plan whose range contains the amount
const match = (ps, a) => [...ps].reverse().find((p) => a >= p.min && a <= p.max) || ps[0];

const rateLabel = (p) => (p.multiple ? `${p.multiple}× tokens` : `${p.rateMin}–${p.rateMax}% / ${p.unit}`);

/* Estimated payout rows for a plan and amount */
function estimate(plan, amount) {
  if (plan.multiple) {
    const tokens = (amount / TOKEN_PRICE) * plan.multiple;
    return [
      ["Total tokens", `${tokens.toLocaleString("en-US")} ${TOKEN}`],
      ["Value at today's price", usd(tokens * TOKEN_PRICE)],
      ["Locked for", `${plan.lockDays} days`],
      ["Then released", plan.release],
    ];
  }
  const lo = (amount * plan.rateMin) / 100;
  const hi = (amount * plan.rateMax) / 100;
  return [
    [`Profit per ${plan.unit}`, `${usd(lo)} – ${usd(hi)}`],
    ...(plan.unit === "day" ? [["30-day profit", `${usd(lo * 30, 0)} – ${usd(hi * 30, 0)}`]] : []),
    ["Adds to earning limit (4×)", usd(amount * 4, 0)],
    ["Profit lands in", "Profit wallet"],
  ];
}

/* Amount + plan selector with a live estimate; continues to the checkout page */
export function PlanPicker({ kind }) {
  const navigate = useNavigate();
  const list = catalog[kind];
  const [amount, setAmount] = useState(1000);
  const [planId, setPlanId] = useState(() => match(list, 1000).id);
  const plan = list.find((p) => p.id === planId);
  const valid = amount >= plan.min && amount <= plan.max;

  const setAmt = (v) => {
    const n = Math.max(0, Number(v) || 0);
    setAmount(n);
    // Crypto ranges don't overlap, so the amount decides the plan
    if (kind === "crypto") setPlanId(match(list, n).id);
  };
  const pick = (p) => {
    setPlanId(p.id);
    if (amount < p.min || amount > p.max) setAmount(p.min);
  };
  const verb = kind === "staking" ? "Stake" : "Invest";

  return (
    <div className="picker">
      <div className="picker__in">
        <div className="pcards">
          {list.map((p) => (
            <button key={p.id} className="opt pcard" aria-pressed={p.id === planId} onClick={() => pick(p)}>
              {p.featured && <span className="opt__tag">Popular</span>}
              <b>{p.name}</b>
              <span className="pcard__rate num">{kind === "staking" ? `${p.multiple}×` : `${p.rateMin}–${p.rateMax}%`}</span>
              <span>{kind === "staking" ? "total tokens" : `profit per ${p.unit}`}</span>
              <span className="pcard__meta"><span>Amount<b>{k(p.min)} – {k(p.max)}</b></span><span>{kind === "staking" ? "Lock" : "Cap"}<b>{kind === "staking" ? `${p.lockDays}d` : "4×"}</b></span></span>
            </button>
          ))}
        </div>
        {kind === "forex" && (
          <Banner icon={RiRobot2Line} tone={bot.active ? "info" : "warn"} title={bot.active ? "Trading bot active" : "Forex profit needs an active trading bot"}
            text={bot.active ? `Forex profit is paid while the bot is active. Paid until ${bot.paidUntil}.` : "Invest now and activate anytime ($30 a year)."} />
        )}
      </div>

      <div className="picker__out">
        <span className="xp__aside-title">{verb} amount</span>
        <AmountInput value={amount} onChange={setAmt} />
        <div className="chips">
          {CHIPS.map((c) => <button key={c} className="chip" aria-pressed={amount === c} onClick={() => setAmt(c)}>{k(c)}</button>)}
        </div>
        <small className="note">From {usd(plan.min, 0)} to {usd(plan.max, 0)}. {kind === "crypto" ? "Your amount picks the plan." : ""}</small>
        <div className="picker__match">
          <span>Matching plan</span><b>{plan.name}</b><span className="badge badge--info badge--plain">{rateLabel(plan)}</span>
        </div>
        <KV rows={estimate(plan, amount)} />
        {amount > depositBalance && <Banner icon={RiWallet3Line} tone="warn" title="Not enough in your Deposit wallet" action={<Link className="ui-btn ui-btn--sm" to={`${BASE}/wallet/deposit`}>Deposit</Link>} />}
        <button className="ui-btn ui-btn--cyan ui-btn--lg ui-btn--block" disabled={!valid} onClick={() => navigate(`${BASE}/invest/${plan.id}?amount=${amount}`)}>
          {verb} {usd(amount, 0)} in {plan.name}<RiArrowRightLine />
        </button>
        <p className="note"><RiShieldCheckLine /> Next you'll see a checkout summary. Nothing is charged until you confirm.</p>
      </div>
    </div>
  );
}

const copy = {
  crypto: {
    title: "Automated crypto plans, paid daily",
    sub: "Your amount decides your plan. A bigger amount unlocks a higher daily range, credited to your Profit wallet every day.",
    steps: [["Deposit USDT", "Fund your Deposit wallet. Plans are paid from it."], ["Choose your amount", "Between $50 and $50,000. Your amount picks the plan."], ["Earn daily", "Profit lands in your Profit wallet every day until the 4× limit."]],
  },
  forex: {
    title: "Forex plans run by the trading bot",
    sub: "Same bot, two rhythms. Choose how often you'd like your profit to arrive.",
    steps: [["Invest in the plan you pick", "Weekly or monthly payouts, same range."], ["Activate the bot", "$30 a year, paid from your Deposit wallet."], ["Profit starts from activation", "Paid on schedule while the bot is active."]],
  },
  staking: {
    title: `Stake USDT, earn ${TOKEN} tokens`,
    sub: "A longer lock earns more tokens. Every plan releases on a fixed schedule once the lock ends.",
    steps: [["Choose a term", "90, 180 or 365 days."], ["Stake USDT", `Converted at today's ${TOKEN} price.`], ["Receive releases", "Tokens release on schedule once the lock ends."]],
  },
};

/* One page per plan family: hero, picker and how it works */
export default function PlansPage({ kind }) {
  const c = copy[kind];
  const list = catalog[kind];
  return (
    <div className="pg">
      <Panel
        chips={[[kindIcon[kind], `${kind[0].toUpperCase() + kind.slice(1)} plans`], [RiWallet3Line, `Deposit wallet ${usd(depositBalance)}`]]}
        title={c.title}
        sub={c.sub}
        tiles={list.map((p) => [p.name, kind === "staking" ? `${p.multiple}× tokens` : `${p.rateMin}–${p.rateMax}%`])}
        actions={<Link className="ui-btn" to={`${BASE}/reports/${kind === "staking" ? "staking" : "investments"}`}><RiFileList3Line />My {kind === "staking" ? "stakes" : "investments"}</Link>}
      />
      <Card title={kind === "staking" ? "Start a stake" : "How much do you want to invest?"} sub="Pick a plan, set your amount and review on the next step" icon={RiLineChartLine} tone="cyan">
        <PlanPicker kind={kind} />
      </Card>
      <Card title="How it works">
        <Steps items={c.steps} row />
      </Card>
    </div>
  );
}

/* Checkout for a single plan: /dashboard/invest/:planId?amount= */
export function Checkout() {
  const { planId } = useParams();
  const [params] = useSearchParams();
  const plan = catalogAll.find((p) => p.id === planId);
  const [amount, setAmount] = useState(() => params.get("amount") || "");
  const [done, setDone] = useState(false);
  if (!plan) return <Navigate to={`${BASE}/investments`} replace />;

  const amt = Number(amount) || 0;
  const valid = amt >= plan.min && amt <= plan.max && amt <= depositBalance;
  const staking = plan.kind === "staking";
  const lo = staking ? 0 : (amt * plan.rateMin) / 100;
  const hi = staking ? 0 : (amt * plan.rateMax) / 100;
  // Projection bars: 30 days of compounding-free daily profit
  const bars = Array.from({ length: 30 }, (_, i) => 0.35 + ((i * 37) % 11) / 18);

  return (
    <div className="pg">
      <Panel
        chips={[[kindIcon[plan.kind], `${plan.kind} · ${staking ? "token staking" : `paid every ${plan.unit}`}`]]}
        title={plan.name}
        value={staking ? `${plan.multiple}× tokens` : `${plan.rateMin}–${plan.rateMax}% / ${plan.unit}`}
        tiles={[["Range", `${k(plan.min)} – ${k(plan.max)}`, RiWallet3Line], [staking ? "Lock" : "Earning cap", staking ? `${plan.lockDays} days` : "4× amount", RiShieldCheckLine], ["Payout", staking ? plan.release : `Every ${plan.unit}`, RiTimeLine]]}
        aside={
          <div className="proj">
            <span className="xp__aside-title">Your projection</span>
            <small>Your {usd(amt || plan.min, 0)} earns</small>
            <b className="num">{staking ? `${(((amt || plan.min) / TOKEN_PRICE) * plan.multiple).toLocaleString("en-US")} ${TOKEN}` : `${usd(((amt || plan.min) * plan.rateMin) / 100)} – ${usd(((amt || plan.min) * plan.rateMax) / 100)}`}</b>
            <small>{staking ? "in total over the term" : `every ${plan.unit}`}</small>
            <div className="proj__bars">{bars.map((h, i) => <i key={i} style={{ height: `${h * 100}%` }} />)}</div>
          </div>
        }
      />

      {done ? (
        <Banner icon={RiCheckLine} tone="ok" title={`${plan.name} is active`} text={`${usd(amt)} invested from your Deposit wallet. First payout on the next schedule.`}
          action={<Link className="ui-btn ui-btn--sm" to={`${BASE}/reports/investments`}>View my plans</Link>} />
      ) : (
        <div className="grid-main">
          <Card title="How much do you want to invest?" sub="Checkout" icon={RiWallet3Line} tone="blue" action={<span className="badge badge--ok">Paid from your wallet</span>}>
            <div className="fieldset">
              <div className="f">
                <span className="f__row">Investment amount<small>Range {usd(plan.min, 0)} – {usd(plan.max, 0)}</small></span>
                <AmountInput value={amount} onChange={setAmount} />
                <div className="chips">
                  <button className="chip" onClick={() => setAmount(String(plan.min))}>Min {k(plan.min)}</button>
                  <button className="chip" onClick={() => setAmount(String(Math.min(plan.max, Math.floor(depositBalance))))}>Max {k(Math.min(plan.max, Math.floor(depositBalance)))}</button>
                </div>
              </div>
              <div className="sumtiles">
                <div className="sumtiles__hi"><span>{staking ? "Tokens" : `Profit per ${plan.unit}`}</span><b className="num">{staking ? ((amt / TOKEN_PRICE) * plan.multiple).toLocaleString("en-US") : `${usd(lo)} – ${usd(hi)}`}</b></div>
                <div><span>Earning limit</span><b className="num">{staking ? "—" : usd(amt * 4, 0)}</b></div>
                <div><span>Balance after</span><b className="num">{usd(Math.max(0, depositBalance - amt))}</b></div>
              </div>
              <div className="wallet-row">
                <IChip icon={RiWallet3Line} tone="blue" size="sm" />
                <div><b>Deposit wallet</b><small>The amount is deducted from this wallet</small></div>
                <b className={`num ${amt > depositBalance ? "negative" : ""}`}>{usd(depositBalance)}</b>
              </div>
              <Field label="Add a note (optional)"><input placeholder="For your own records" /></Field>
            </div>
          </Card>

          <div className="card summary">
            <div className="card__head"><div className="card__title"><div><h3>Investment summary</h3><small>Review before you confirm</small></div></div></div>
            <div className="card__body">
              <KV rows={[
                ["Plan", plan.name],
                [staking ? "Total tokens" : `Rate per ${plan.unit}`, staking ? `${plan.multiple}×` : `${plan.rateMin}–${plan.rateMax}%`],
                ["Payouts", staking ? plan.release : `Every ${plan.unit}`],
                ["Range", `${usd(plan.min, 0)} – ${usd(plan.max, 0)}`],
                ["Deposit wallet", usd(depositBalance)],
                ["Balance after", usd(Math.max(0, depositBalance - amt))],
              ]} />
              <div className="summary__total"><span>You invest</span><b className="num">{usd(amt)}</b></div>
              <button className="ui-btn ui-btn--cyan ui-btn--lg ui-btn--block" disabled={!valid} onClick={() => setDone(true)}>
                {valid ? `Confirm ${usd(amt, 0)}` : "Enter an amount to continue"}
              </button>
              <p className="note"><RiInformationLine /> Estimates use the published range. Returns vary and aren't guaranteed.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
