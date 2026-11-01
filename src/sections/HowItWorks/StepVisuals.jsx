import { motion } from "framer-motion";
import { RiCheckLine, RiShieldCheckFill } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { LogoMark } from "@/components/ui/Logo/Logo";
import "./StepVisuals.css";

/* One mini product mock-up per step, shown on the right of each stacked card */

function Signup() {
  return (
    <div className="sv">
      <div className="sv__row">
        <span className="sv__avatar">AM</span>
        <div>
          <strong>Create account</strong>
          <small>Takes about 2 minutes</small>
        </div>
      </div>
      <div className="sv__field"><small>Email</small><span className="mono">alex@mail.com</span><RiCheckLine className="sv__ok" /></div>
      <div className="sv__field"><small>Password</small><span className="mono">••••••••••••</span></div>
      <div className="sv__toggle">
        <span className="sv__tf"><RiShieldCheckFill />Two-factor authentication</span>
        <i className="sv__switch is-on"><b /></i>
      </div>
      <div className="sv__btn">Continue</div>
    </div>
  );
}

const QR = (() => {
  let s = 11;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const n = 13;
  const cells = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 4 && y < 4) || (x > n - 5 && y < 4) || (x < 4 && y > n - 5);
      if (!finder && r() > 0.52) cells.push([x, y]);
    }
  return { n, cells, finders: [[0, 0], [n - 4, 0], [0, n - 4]] };
})();

function Deposit() {
  return (
    <div className="sv">
      <div className="sv__row">
        <CoinIcon symbol="USDT" size={34} />
        <div>
          <strong>Deposit USDT</strong>
          <small>BNB Smart Chain · BEP20</small>
        </div>
      </div>
      <div className="sv__qrwrap">
        <svg viewBox={`0 0 ${QR.n} ${QR.n}`} className="sv__qr" shapeRendering="crispEdges">
          {QR.finders.map(([x, y]) => (
            <g key={x + "-" + y}>
              <rect x={x} y={y} width="4" height="4" fill="#bfe3ff" />
              <rect x={x + 0.8} y={y + 0.8} width="2.4" height="2.4" fill="#0a1640" />
              <rect x={x + 1.4} y={y + 1.4} width="1.2" height="1.2" fill="#bfe3ff" />
            </g>
          ))}
          {QR.cells.map(([x, y]) => <rect key={x + "," + y} x={x} y={y} width="1" height="1" fill="#bfe3ff" />)}
        </svg>
        <div className="sv__addr">
          <small>Your deposit address</small>
          <span className="mono">0x7a3F…c91E</span>
          <div className="sv__conf">
            <span className="sv__bar"><motion.i initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.4 }} /></span>
            <small className="mono">12/12 confirmations</small>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pool() {
  const items = [["Essential", "0.5–0.75%"], ["Growth", "0.75–1.5%"], ["Premium", "1–2%"]];
  return (
    <div className="sv">
      <div className="sv__row"><strong>Choose your pool</strong><span className="sv__pill">Crypto</span></div>
      <div className="sv__plans">
        {items.map(([n, r], i) => (
          <div key={n} className={`sv__plan ${i === 2 ? "is-on" : ""}`}>
            <small>{n}</small>
            <strong className="mono">{r}</strong>
            <small>per day</small>
          </div>
        ))}
      </div>
      <div className="sv__field"><small>Amount</small><span className="mono">$5,000.00</span></div>
      <div className="sv__slider"><i style={{ width: "38%" }} /><b style={{ left: "38%" }} /></div>
      <div className="sv__btn">Invest now</div>
    </div>
  );
}

const nodes = [
  { s: "BTC", x: 14, y: 20 }, { s: "ETH", x: 86, y: 20 }, { s: "SOL", x: 90, y: 62 },
  { s: "BNB", x: 10, y: 62 }, { s: "EUR", x: 50, y: 88 },
];

function Engine() {
  return (
    <div className="sv sv--engine">
      <svg className="sv__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((n, i) => (
          <g key={n.s}>
            <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(120,190,255,.28)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <circle r="1.3" fill="#22d3ee">
              <animate attributeName="cx" values={`50;${n.x}`} dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`50;${n.y}`} dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      <div className="sv__hub"><LogoMark size={64} /></div>
      {nodes.map((n) => (
        <span key={n.s} className="sv__node" style={{ left: `${n.x}%`, top: `${n.y}%` }}><CoinIcon symbol={n.s} size={30} /></span>
      ))}
    </div>
  );
}

const bars = [38, 52, 44, 66, 58, 74, 62, 88, 70, 96];

function Earnings() {
  return (
    <div className="sv">
      <div className="sv__row">
        <div>
          <small>Profit wallet</small>
          <strong className="sv__big mono">$4,286.72</strong>
        </div>
        <span className="sv__pill positive">+6.4%</span>
      </div>
      <div className="sv__bars">
        {bars.map((h, i) => (
          <motion.i key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }} />
        ))}
      </div>
      <div className="sv__toast">
        <CoinIcon symbol="USDT" size={26} />
        <div><strong>Daily distribution</strong><small>Credited just now</small></div>
        <b className="positive mono">+92.40</b>
      </div>
    </div>
  );
}

function Withdraw() {
  const steps = ["Requested", "Processing", "Sent"];
  return (
    <div className="sv">
      <div className="sv__row">
        <CoinIcon symbol="USDT" size={34} />
        <div><strong>Withdraw</strong><small>To 0x7a3F…c91E</small></div>
      </div>
      <div className="sv__field"><small>Amount</small><span className="mono">250.00 USDT</span><span className="sv__pill">Min $10</span></div>
      <div className="sv__steps">
        {steps.map((s, i) => (
          <div key={s} className={`sv__step ${i < 2 ? "is-done" : ""} ${i === 1 ? "is-now" : ""}`}>
            <i>{i < 1 ? <RiCheckLine /> : null}</i>
            <small>{s}</small>
          </div>
        ))}
      </div>
      <div className="sv__eta mono">Estimated arrival ≤ 96 hours</div>
    </div>
  );
}

const visuals = [Signup, Deposit, Pool, Engine, Earnings, Withdraw];

export default function StepVisual({ index }) {
  const V = visuals[index % visuals.length];
  return <V />;
}
