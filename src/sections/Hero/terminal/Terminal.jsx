import { useState } from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import Button from "@/components/ui/Button/Button";
import useLivePrices from "@/hooks/useLivePrices";
import { site } from "@/config/site";
import useMarket, { TIMEFRAMES, fmt } from "./useMarket";
import CandleChart from "./CandleChart";
import OrderBook from "./OrderBook";
import Watchlist from "./Watchlist";
import BottomPanel from "./BottomPanel";
import "./Terminal.css";

const pairLabel = { BTC: "BTC/USDT", ETH: "ETH/USDT", SOL: "SOL/USDT", BNB: "BNB/USDT", XRP: "XRP/USDT", LINK: "LINK/USDT" };

/* Hero trading terminal: watchlist · candlestick chart · order book · AI signals / positions */
export default function Terminal() {
  const [symbol, setSymbol] = useState("BTC");
  const [tf, setTf] = useState("15m");
  const quotes = useLivePrices(1800);
  const m = useMarket(symbol, tf);
  const up = m.change >= 0;

  return (
    <GlassCard strong className="tp">
      <div className="tp__chrome">
        <span className="tp__dots"><i /><i /><i /></span>
        <span className="tp__url mono">app.{site.domain}/terminal</span>
        <span className="tp__status"><span className="tp__live" />Engine online</span>
      </div>

      <div className="tp__body">
        <Watchlist quotes={quotes} active={symbol} onSelect={setSymbol} />

        <section className="tp__center">
          <header className="tp__head">
            <div className="tp__pair">
              <CoinIcon symbol={symbol} size={34} />
              <div>
                <strong>{pairLabel[symbol]}</strong>
                <small>Spot · Perpetual</small>
              </div>
            </div>
            <div className="tp__price">
              <span className={`tp__big mono ${m.dir >= 0 ? "positive" : "negative"}`}>{fmt(m.price)}</span>
              <span className={`tp__chg ${up ? "positive" : "negative"}`}>
                {up ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                {Math.abs(m.change).toFixed(2)}%
              </span>
            </div>
            <dl className="tp__stats mono">
              <div><dt>24h High</dt><dd>{fmt(m.high)}</dd></div>
              <div><dt>24h Low</dt><dd>{fmt(m.low)}</dd></div>
              <div><dt>Volume</dt><dd>{m.volume.toFixed(0)}K</dd></div>
            </dl>
          </header>

          <div className="tp__toolbar">
            <div className="tp__tfs" role="tablist" aria-label="Timeframe">
              {TIMEFRAMES.map((t) => (
                <button key={t} role="tab" aria-selected={tf === t} className="tp__tf" onClick={() => setTf(t)}>
                  {t}
                </button>
              ))}
            </div>
            <span className="tp__ind mono">Candles · MA 20 · Vol</span>
          </div>

          <CandleChart candles={m.candles} price={m.price} dir={m.dir} chartKey={`${symbol}-${tf}`} />
          <BottomPanel quotes={quotes} />
        </section>

        <aside className="tp__right">
          <OrderBook price={m.price} step={m.step} askSizes={m.askSizes} bidSizes={m.bidSizes} trades={m.trades} dir={m.dir} />
          <div className="tp__trade">
            <Button to="/#get-started" size="sm" block>Buy</Button>
            <Button to="/#get-started" size="sm" variant="glass" block className="tp__sell">Sell</Button>
          </div>
        </aside>
      </div>
    </GlassCard>
  );
}
