import { useMemo, useState } from "react";
import { RiInformationLine, RiArrowUpSFill } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Amount from "@/components/ui/Amount";
import { plans } from "@/data/plans";
import { simulate, scenarioRates, isForex, BOT_FEE, PRINCIPAL_FEE, CAP_MULTIPLE } from "./simulate";
import CalcChart from "./CalcChart";
import "./Calculator.css";

const DURATIONS = [[7, "7D"], [30, "30D"], [90, "90D"], [180, "180D"], [365, "1Y"]];
const SCENARIOS = [["low", "Conservative"], ["mid", "Mid-range"], ["high", "Optimistic"]];
const CHIPS = [["Min", 0], ["25%", 0.25], ["50%", 0.5], ["75%", 0.75], ["Max", 1]];
const MILESTONES = [7, 30, 90, 180, 365];

const usd = (n, d = 2) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d });

function Switch({ checked, onChange, label, hint, disabled }) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled} className="cs" onClick={() => onChange(!checked)}>
      <span className="cs__text"><b>{label}</b><small>{hint}</small></span>
      <i className="cs__track"><span /></i>
    </button>
  );
}

export default function Calculator() {
  const [planId, setPlanId] = useState("premium");
  const [raw, setRaw] = useState("5000");
  const [days, setDays] = useState(90);
  const [scenario, setScenario] = useState("mid");
  const [compound, setCompound] = useState(false);
  const [cap, setCap] = useState(true);
  const [exitPrincipal, setExitPrincipal] = useState(false);

  const plan = [...plans.crypto, ...plans.forex].find((p) => p.id === planId);
  const forex = isForex(plan);
  const amount = Math.min(Math.max(Number(raw) || plan.min, plan.min), plan.max);
  const rates = scenarioRates(plan);

  const choosePlan = (p) => {
    setPlanId(p.id);
    setRaw(String(Math.min(Math.max(Number(raw) || p.min, p.min), p.max)));
  };

  const runs = useMemo(() => {
    const run = (rate) => simulate({ plan, amount, rate, compound, cap });
    return { low: run(rates.low), mid: run(rates.mid), high: run(rates.high) };
  }, [plan, amount, compound, cap, rates.low, rates.mid, rates.high]);

  const chosen = runs[scenario];
  const profit = chosen.series[days];
  const balance = amount + profit;
  const roi = (profit / amount) * 100;
  const botFee = forex ? BOT_FEE : 0;
  const exitFee = exitPrincipal ? amount * PRINCIPAL_FEE : 0;
  const net = balance - botFee - exitFee;
  const perDay = profit / days;
  const capHit = chosen.capDay && chosen.capDay <= days;
  const fill = ((amount - plan.min) / (plan.max - plan.min)) * 100;

  return (
    <section className="section" id="calculator">
      <div className="container">
        <SectionHeading
          eyebrow="Return illustrator"
          title={<>Model your <span className="text-gradient">outcome</span></>}
          lead="Pick a plan, amount and horizon, then compare conservative, mid and optimistic scenarios, with compounding, the earnings cap and fees."
        />
        <div>
          <GlassCard strong className="calc">
            {/* ---------- inputs ---------- */}
            <div className="calc__inputs">
              <div className="cf">
                <span className="cf__label">Plan</span>
                <div className="cf__groups">
                  {[["Crypto", plans.crypto], ["Forex", plans.forex]].map(([name, list]) => (
                    <div className="cf__group" key={name}>
                      <small>{name}</small>
                      <div className="cf__chips">
                        {list.map((p) => (
                          <button key={p.id} className={`cf__chip ${p.id === planId ? "is-active" : ""}`} onClick={() => choosePlan(p)}>{p.name}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="cf__meta mono">
                  {usd(plan.min, 0)} – {usd(plan.max, 0)} · {plan.rateMin}–{plan.rateMax}% per {plan.period}
                </p>
              </div>

              <div className="cf">
                <label className="cf__label" htmlFor="calc-amount">Investment amount</label>
                <div className="cf__amount">
                  <span>$</span>
                  <input id="calc-amount" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value.replace(/[^\d]/g, ""))} onBlur={() => setRaw(String(amount))} />
                </div>
                <input className="cf__range" type="range" min={plan.min} max={plan.max} step={plan.max > 10000 ? 100 : 10} value={amount}
                  onChange={(e) => setRaw(e.target.value)} style={{ "--fill": `${fill}%` }} aria-label="Investment amount" />
                <div className="cf__quick">
                  {CHIPS.map(([label, t]) => (
                    <button key={label} onClick={() => setRaw(String(Math.round((plan.min + (plan.max - plan.min) * t) / 10) * 10))}>{label}</button>
                  ))}
                </div>
              </div>

              <div className="cf">
                <span className="cf__label">Time horizon</span>
                <div className="cf__seg">
                  {DURATIONS.map(([d, label]) => (
                    <button key={d} className={days === d ? "is-active" : ""} onClick={() => setDays(d)}>{label}</button>
                  ))}
                </div>
              </div>

              <div className="cf">
                <span className="cf__label">Scenario</span>
                <div className="cf__seg cf__seg--3">
                  {SCENARIOS.map(([k, label]) => (
                    <button key={k} className={scenario === k ? "is-active" : ""} onClick={() => setScenario(k)}>
                      {label}<small className="mono">{rates[k]}%</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cf cf--switches">
                <Switch checked={compound} onChange={setCompound} label="Compound earnings" hint="Reinvest each credit into the next period" />
                <Switch checked={cap && !forex} onChange={setCap} disabled={forex} label={`${CAP_MULTIPLE}X earnings cap`} hint={forex ? "Applies to crypto plans" : "Total earnings stop at 4× your investment"} />
                <Switch checked={exitPrincipal} onChange={setExitPrincipal} label="Withdraw principal at the end" hint="Deducts the 15% principal fee" />
              </div>
            </div>

            {/* ---------- results ---------- */}
            <div className="calc__output">
              <div className="co__head">
                <div>
                  <span className="cf__label">Estimated profit · {days === 365 ? "1 year" : `${days} days`}</span>
                  <Amount className="co__profit text-gradient" to={profit} prefix="$" decimals={2} />
                </div>
                <span className="co__roi positive"><RiArrowUpSFill />{roi.toFixed(1)}% ROI</span>
              </div>

              <div className="co__stats">
                <div><small>End balance</small><Amount to={balance} prefix="$" decimals={2} /></div>
                <div><small>Avg per day</small><Amount to={perDay} prefix="$" decimals={2} /></div>
                <div><small>Net payout{botFee || exitFee ? " (after fees)" : ""}</small><Amount to={net} prefix="$" decimals={2} /></div>
              </div>

              {capHit && (
                <p className="co__flag"><RiInformationLine />The {CAP_MULTIPLE}X cap is reached on day {chosen.capDay}, earnings stop after that.</p>
              )}

              <CalcChart amount={amount} days={days} low={runs.low.series} mid={runs.mid.series} high={runs.high.series} chosen={chosen.series} />

              <div className="co__table mono">
                <div className="co__tr co__tr--head"><span>Horizon</span><span>Low</span><span>Mid</span><span>High</span></div>
                {MILESTONES.map((d) => (
                  <div className={`co__tr ${d === days ? "is-active" : ""}`} key={d}>
                    <span>{d === 365 ? "1 year" : `${d} days`}</span>
                    <span>{usd(runs.low.series[d], 0)}</span>
                    <span>{usd(runs.mid.series[d], 0)}</span>
                    <span>{usd(runs.high.series[d], 0)}</span>
                  </div>
                ))}
              </div>

              <p className="notice">
                <RiInformationLine />
                Mathematical illustration only, not a forecast or promise of returns. Target rates are not guaranteed, results can be lower,
                and you may lose part or all of your deposit.{forex ? ` Includes the $${BOT_FEE} forex bot fee.` : ""}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
