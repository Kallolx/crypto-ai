import { useState } from "react";
import { RiInformationFill } from "react-icons/ri";
import { CopyButton, Mask, QrPlaceholder, Tabs } from "../ui";

const networks = ["Network A", "Network B", "Network C"];
const steps = ["Choose a network", "Send funds to the address", "Wait for confirmation"];

export default function Deposit() {
  const [net, setNet] = useState(networks[0]);
  return (
    <div className="dx-grid">
      <section className="dx-card dx-stack">
        <div className="dx-title"><h2>Add funds</h2></div>
        <Tabs className="dx-tabs--fill" items={networks.map((n) => [n, n])} value={net} onChange={setNet} label="Network" />
        <div className="dx-qrbox"><QrPlaceholder /></div>
        <div className="dx-field">
          <small>Deposit address</small>
          <div><span><Mask w={18} /></span><CopyButton /></div>
        </div>
        <p className="dx-note"><RiInformationFill />Sample screen. No real address is shown.</p>
      </section>
      <section className="dx-card">
        <div className="dx-title"><h2>How it works</h2></div>
        <ol className="dx-steps">
          {steps.map((s, i) => <li key={s}><b>{i + 1}</b>{s}</li>)}
        </ol>
        <dl className="dx-meta">
          <div><dt>Minimum</dt><dd><Mask /></dd></div>
          <div><dt>Confirmations</dt><dd><Mask w={2} /></dd></div>
          <div><dt>Arrival time</dt><dd><Mask w={3} /></dd></div>
        </dl>
      </section>
    </div>
  );
}
