import { useState } from "react";
import { RiCheckboxCircleFill, RiInformationFill, RiWallet3Fill, RiSafe2Fill, RiGift2Fill, RiGlobalLine } from "react-icons/ri";
import { Mask, Select } from "../ui";

const from = [
  { value: "main", label: "Main wallet", note: "Everyday balance", icon: <RiWallet3Fill /> },
  { value: "savings", label: "Savings", note: "Locked", icon: <RiSafe2Fill /> },
  { value: "rewards", label: "Rewards", note: "Perks earned", icon: <RiGift2Fill /> },
];
const nets = [
  { value: "a", label: "Network A", note: "Fastest", icon: <RiGlobalLine /> },
  { value: "b", label: "Network B", note: "Lowest fee", icon: <RiGlobalLine /> },
  { value: "c", label: "Network C", note: "Standard", icon: <RiGlobalLine /> },
];

export default function Withdraw() {
  const [sent, setSent] = useState(false);
  const [wallet, setWallet] = useState("main");
  const [net, setNet] = useState("a");

  if (sent) {
    return (
      <section className="dx-card dx-done">
        <span className="dx-tile dx-tile--green"><RiCheckboxCircleFill /></span>
        <h2>Request submitted</h2>
        <p>This is a sample confirmation. Nothing was sent.</p>
        <button className="dx-btn" onClick={() => setSent(false)}>Back</button>
      </section>
    );
  }

  return (
    <div className="dx-grid">
      <form className="dx-card dx-stack" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div className="dx-title"><h2>Withdraw funds</h2></div>
        <Select label="From wallet" options={from} value={wallet} onChange={setWallet} />
        <Select label="Network" options={nets} value={net} onChange={setNet} />
        <label className="dx-input"><small>Destination address</small><input placeholder="Paste address" /></label>
        <label className="dx-input"><small>Amount</small><input placeholder="0.00" inputMode="decimal" /></label>
        <button className="dx-btn" type="submit">Continue</button>
        <p className="dx-note"><RiInformationFill />Sample form. Nothing is processed.</p>
      </form>
      <section className="dx-card">
        <div className="dx-title"><h2>Summary</h2></div>
        <dl className="dx-meta">
          <div><dt>Amount</dt><dd><Mask w={5} /></dd></div>
          <div><dt>Network fee</dt><dd><Mask w={3} /></dd></div>
          <div><dt>You receive</dt><dd><Mask w={5} /></dd></div>
          <div><dt>Processing time</dt><dd><Mask w={3} /></dd></div>
        </dl>
      </section>
    </div>
  );
}
