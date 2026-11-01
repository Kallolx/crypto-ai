import { SiBitcoin, SiEthereum, SiBinance, SiSolana, SiTether, SiRipple, SiCardano, SiChainlink } from "react-icons/si";
import { FaEuroSign, FaSterlingSign, FaYenSign } from "react-icons/fa6";
import { LogoMark } from "@/components/ui/Logo/Logo";
import "./CoinIcon.css";

/* Real brand logos (Simple Icons via react-icons) on their brand colours */
const coins = {
  BTC: { Icon: SiBitcoin, bg: "#f7931a" },
  ETH: { Icon: SiEthereum, bg: "#627eea" },
  BNB: { Icon: SiBinance, bg: "#f3ba2f" },
  SOL: { Icon: SiSolana, bg: "linear-gradient(135deg,#9945ff,#14f195)" },
  USDT: { Icon: SiTether, bg: "#26a17b" },
  XRP: { Icon: SiRipple, bg: "#23292f" },
  ADA: { Icon: SiCardano, bg: "#0033ad" },
  LINK: { Icon: SiChainlink, bg: "#2a5ada" },
  EUR: { Icon: FaEuroSign, bg: "#1d4ed8" },
  GBP: { Icon: FaSterlingSign, bg: "#7c3aed" },
  JPY: { Icon: FaYenSign, bg: "#be123c" },
};

export default function CoinIcon({ symbol, size = 28 }) {
  if (symbol === "CAI") return <LogoMark size={size} />;
  const coin = coins[symbol];
  if (!coin) return null;
  const { Icon, bg } = coin;
  return (
    <span className="coin-icon" style={{ width: size, height: size, background: bg }} aria-label={symbol} role="img">
      <Icon style={{ width: size * 0.56, height: size * 0.56 }} />
    </span>
  );
}
