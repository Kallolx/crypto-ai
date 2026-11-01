import { fmt } from "./useMarket";

const pad = (n) => String(n).padStart(2, "0");
const time = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

/* Depth ladder (asks above, bids below) + recent trade tape */
export default function OrderBook({ price, step, askSizes, bidSizes, trades, dir }) {
  const asks = askSizes.map((size, i) => ({ price: price + (i + 1) * step, size })).reverse();
  const bids = bidSizes.map((size, i) => ({ price: price - (i + 1) * step, size }));
  const max = Math.max(...askSizes, ...bidSizes);
  const spread = step * 2;

  const row = (r, side) => (
    <div className={`ob__row ob__row--${side}`} key={r.price}>
      <span className="ob__bar" style={{ width: `${(r.size / max) * 100}%` }} />
      <span className="ob__price">{fmt(r.price)}</span>
      <span className="ob__size">{r.size.toFixed(2)}</span>
    </div>
  );

  return (
    <div className="ob mono">
      <div className="tp__label">Order book</div>
      <div className="ob__head"><span>Price</span><span>Size</span></div>
      {asks.slice(-6).map((r) => row(r, "ask"))}
      <div className={`ob__mid ${dir >= 0 ? "positive" : "negative"}`}>
        {fmt(price)}
        <small>Spread {fmt(spread)}</small>
      </div>
      {bids.slice(0, 6).map((r) => row(r, "bid"))}

      <div className="tp__label ob__tape-label">Recent trades</div>
      <div className="ob__tape">
        {trades.slice(0, 6).map((t) => (
          <div className="ob__trade" key={t.id}>
            <span className={t.side === "buy" ? "positive" : "negative"}>{fmt(t.price)}</span>
            <span>{t.size.toFixed(3)}</span>
            <span className="ob__time">{time(t.t)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
