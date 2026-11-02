import GlassCard from "@/components/ui/GlassCard/GlassCard";
import Amount from "@/components/ui/Amount";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { stats } from "@/data/content";
import { site } from "@/config/site";
import "./Stats.css";

const assets = ["BTC", "ETH", "BNB", "SOL", "USDT", "XRP", "ADA", "LINK", "EUR", "GBP", "JPY"];
const names = { BTC: "Bitcoin", ETH: "Ethereum", BNB: "BNB", SOL: "Solana", USDT: "Tether", XRP: "XRP", ADA: "Cardano", LINK: "Chainlink", EUR: "Euro", GBP: "Pound", JPY: "Yen" };

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div>
          <GlassCard className="stats">
            {stats.map((s) => (
              <div className="stats__item" key={s.label}>
                <Amount className="stats__value text-gradient" to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                <span className="stats__label">{s.label}</span>
              </div>
            ))}
          </GlassCard>
        </div>
        <p className="stats__note">Figures reported by {site.name}. Signal accuracy is a win-rate measure, not a measure of profitability.</p>

        <div className="assets">
          <span className="assets__title">Markets the engine trades</span>
          <div className="assets__track">
            {assets.map((a) => (
              <span className="assets__item" key={a}>
                <CoinIcon symbol={a} size={30} />
                {names[a]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
