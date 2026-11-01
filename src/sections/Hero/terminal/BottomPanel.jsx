import { useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { fmt } from "./useMarket";

const signals = [
  { side: "BUY", symbol: "ETH", pair: "ETH/USDT", conf: 0.82, time: "12s" },
  { side: "SELL", symbol: "GBP", pair: "GBP/USD", conf: 0.74, time: "48s" },
  { side: "BUY", symbol: "SOL", pair: "SOL/USDT", conf: 0.77, time: "1m" },
  { side: "BUY", symbol: "BTC", pair: "BTC/USDT", conf: 0.69, time: "3m" },
];

const positions = [
  { symbol: "BTC", pair: "BTC/USDT", side: "Long", size: 0.42, entry: 67210 },
  { symbol: "ETH", pair: "ETH/USDT", side: "Long", size: 6.5, entry: 3441 },
  { symbol: "SOL", pair: "SOL/USDT", side: "Short", size: 120, entry: 176.4 },
];

const tabs = ["AI signals", "Open positions"];

export default function BottomPanel({ quotes }) {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <div className="bp">
      <div className="bp__tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className="bp__tab" onClick={() => setTab(t)}>
            {t === "AI signals" && <RiRobot2Line />} {t}
          </button>
        ))}
        <span className="bp__net mono">Net P/L <b className="positive">+$1,284.60</b></span>
      </div>

      {tab === "AI signals" ? (
        <ul className="bp__signals">
          {signals.map((s) => (
            <li key={s.pair} className="bp__signal">
              <CoinIcon symbol={s.symbol} size={24} />
              <span className="bp__pair">{s.pair}<small className="mono">{s.time} ago</small></span>
              <span className={`bp__tag ${s.side === "BUY" ? "is-buy" : "is-sell"}`}>{s.side}</span>
              <span className="bp__conf mono">
                <span className="bp__bar"><span style={{ width: `${s.conf * 100}%` }} /></span>
                {s.conf.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bp__table mono">
          <div className="bp__tr bp__tr--head"><span>Pair</span><span>Side</span><span>Size</span><span>Entry</span><span>Mark</span><span>P/L</span></div>
          {positions.map((p) => {
            const mark = quotes.find((q) => q.symbol === p.symbol)?.price ?? p.entry;
            const pnl = (mark - p.entry) * p.size * (p.side === "Long" ? 1 : -1);
            return (
              <div className="bp__tr" key={p.pair}>
                <span>{p.pair}</span>
                <span className={p.side === "Long" ? "positive" : "negative"}>{p.side}</span>
                <span>{p.size}</span>
                <span>{fmt(p.entry)}</span>
                <span>{fmt(mark)}</span>
                <span className={pnl >= 0 ? "positive" : "negative"}>{pnl >= 0 ? "+" : "−"}${Math.abs(pnl).toLocaleString("en-US", { maximumFractionDigits: 2 })}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
