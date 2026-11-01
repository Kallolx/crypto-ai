import { RiArrowUpSFill, RiArrowDownSFill, RiStarFill } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { fmt } from "./useMarket";

export const WATCH = ["BTC", "ETH", "SOL", "BNB", "XRP", "LINK"];

export default function Watchlist({ quotes, active, onSelect }) {
  const list = WATCH.map((s) => quotes.find((q) => q.symbol === s)).filter(Boolean);

  return (
    <aside className="wl">
      <div className="tp__label"><RiStarFill /> Watchlist</div>
      <ul>
        {list.map((q) => {
          const on = q.symbol === active;
          return (
            <li key={q.symbol}>
              <button className={`wl__item ${on ? "is-active" : ""}`} onClick={() => onSelect(q.symbol)} data-cursor="hover">
                <CoinIcon symbol={q.symbol} size={26} />
                <span className="wl__name">
                  <b>{q.symbol}</b>
                  <small className="mono">{fmt(q.price)}</small>
                </span>
                <span className={`wl__chg mono ${q.change >= 0 ? "positive" : "negative"}`}>
                  {q.change >= 0 ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                  {Math.abs(q.change).toFixed(2)}%
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
