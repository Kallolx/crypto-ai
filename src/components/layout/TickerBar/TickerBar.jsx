import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { markets, formatPrice } from "@/data/markets";
import "./TickerBar.css";

/* Headline price strip pinned above the navbar. Loops with a CSS transform animation. */
export default function TickerBar() {
  const row = markets.map((q) => (
    <span className="ticker__item" key={q.pair}>
      <CoinIcon symbol={q.symbol} size={20} />
      <span className="ticker__pair">{q.pair}</span>
      <span className="ticker__price">{formatPrice(q.price)}</span>
      <span className={q.change >= 0 ? "positive" : "negative"}>
        {q.change >= 0 ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
        {Math.abs(q.change).toFixed(2)}%
      </span>
    </span>
  ));

  return (
    <div className="ticker" aria-label="Market prices (simulated)">
      <span className="ticker__live">
        <span className="ticker__pulse" />
        Live
      </span>
      <div className="ticker__viewport">
        <div className="ticker__track">
          <div className="ticker__group">{row}</div>
          <div className="ticker__group" aria-hidden="true">{row}</div>
        </div>
      </div>
    </div>
  );
}
