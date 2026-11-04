import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { RiArrowLeftLine, RiCheckLine, RiCheckboxCircleFill, RiInformationFill, RiWallet3Fill, RiSafe2Fill, RiGift2Fill } from "react-icons/ri";
import { Mask, Select, Tabs } from "../ui";
import { findPlan } from "../plansData";

const wallets = [
  { value: "main", label: "Main wallet", note: "Everyday balance", icon: <RiWallet3Fill /> },
  { value: "savings", label: "Savings", note: "Locked", icon: <RiSafe2Fill /> },
  { value: "rewards", label: "Rewards", note: "Perks earned", icon: <RiGift2Fill /> },
];
const terms = [{ value: "30", label: "30 days" }, { value: "60", label: "60 days" }, { value: "90", label: "90 days" }, { value: "180", label: "180 days" }];
const chips = [["min", "Minimum"], ["quarter", "25%"], ["half", "50%"], ["max", "Maximum"]];
const steps = [["form", "Details"], ["review", "Review"], ["done", "Done"]];

/* Three-step invest flow: details, review, done. UI only: amounts stay masked and nothing is processed. */
export default function InvestFlow() {
  const { id } = useParams();
  const plan = findPlan(id);
  const [step, setStep] = useState("form");
  const [amount, setAmount] = useState("");
  const [chip, setChip] = useState("min");
  const [wallet, setWallet] = useState("main");
  const [term, setTerm] = useState("90");
  const [agree, setAgree] = useState(false);
  if (!plan) return <Navigate to="/dashboard-v2/investments" replace />;

  const idx = steps.findIndex(([k]) => k === step);
  const w = wallets.find((x) => x.value === wallet);

  return (
    <div className="dx-stack">
      <div className="dx-card dx-backbar"><Link to={`/dashboard-v2/investments/${id}`} className="dx-back"><RiArrowLeftLine />{plan.name} details</Link></div>

      <ol className="dx-steps2">
        {steps.map(([k, label], i) => (
          <li key={k} className={i <= idx ? "is-on" : ""}><b>{i < idx ? <RiCheckLine /> : i + 1}</b>{label}</li>
        ))}
      </ol>

      {step === "form" && (
        <form className="dx-card dx-stack" onSubmit={(e) => { e.preventDefault(); setStep("review"); }}>
          <div className="dx-title"><h2>Invest in {plan.name}</h2></div>
          <label className="dx-input"><small>Amount</small><input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))} placeholder="0.00" inputMode="decimal" /></label>
          <Tabs className="dx-tabs--scroll" items={chips} value={chip} onChange={setChip} label="Quick amount" />
          <Select label="Pay from" options={wallets} value={wallet} onChange={setWallet} />
          <Select label="Plan length" options={terms} value={term} onChange={setTerm} />
          <button className="dx-btn dp-btn dp-block" type="submit">Review</button>
          <p className="dx-note"><RiInformationFill />Sample form. Nothing is processed.</p>
        </form>
      )}

      {step === "review" && (
        <section className="dx-card dx-stack">
          <div className="dx-title"><h2>Review your plan</h2></div>
          <dl className="dx-meta">
            <div><dt>Plan</dt><dd>{plan.name}</dd></div>
            <div><dt>Amount</dt><dd><Mask w={5} /></dd></div>
            <div><dt>Pay from</dt><dd>{w.label}</dd></div>
            <div><dt>Length</dt><dd>{term} days</dd></div>
            <div><dt>Fee</dt><dd><Mask w={3} /></dd></div>
            <div><dt>Total</dt><dd><Mask w={5} /></dd></div>
          </dl>
          <label className="dx-check">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span><RiCheckLine /></span>
            I have read the plan terms and risk disclosure.
          </label>
          <div className="dx-flowacts">
            <button type="button" className="dp-ghost" onClick={() => setStep("form")}>Back</button>
            <button type="button" className="dx-btn dp-btn" disabled={!agree} onClick={() => setStep("done")}>Confirm</button>
          </div>
        </section>
      )}

      {step === "done" && (
        <section className="dx-card dx-done">
          <span className="dx-tile"><RiCheckboxCircleFill /></span>
          <h2>Plan request received</h2>
          <p>This is a sample confirmation. Nothing was invested.</p>
          <Link to={`/dashboard-v2/investments/${id}`} className="dx-btn dp-btn">View plan</Link>
        </section>
      )}
    </div>
  );
}
