import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import useLivePrices from "@/hooks/useLivePrices";
import { formatPrice } from "@/data/markets";
import "./TickerBar.css";

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Headline price strip pinned above the navbar. Loops at a constant speed (ignores scroll). */
export default function TickerBar({ speed = 1.6 }) {
  const quotes = useLivePrices();
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() - speed * (delta / 1000));
  });

  const row = quotes.map((q, i) => (
    <span className="ticker__item" key={q.pair + i}>
      <CoinIcon symbol={q.symbol} size={20} />
      <span className="ticker__pair">{q.pair}</span>
      <span className={`ticker__price ${q.dir > 0 ? "flash-up" : q.dir < 0 ? "flash-down" : ""}`} key={q.price}>
        {formatPrice(q.price)}
      </span>
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
        <motion.div className="ticker__track" style={{ x }}>
          <div className="ticker__group">{row}</div>
          <div className="ticker__group" aria-hidden="true">{row}</div>
        </motion.div>
      </div>
    </div>
  );
}
