import {
  RiRobot2Line, RiCoinsLine, RiGlobalLine, RiShieldCheckLine, RiTimerFlashLine, RiLayoutGridLine,
  RiArrowUpSFill, RiArrowDownSFill, RiDashboardLine, RiWallet3Line, RiHandCoinLine, RiTeamLine,
  RiExchangeLine, RiFileChartLine, RiStackLine, RiDownload2Line, RiUpload2Line,
} from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import { LogoMark } from "@/components/ui/Logo/Logo";
import { site } from "@/config/site";
import EngineCandles from "./EngineCandles";
import "./Products.css";

const modules = [
  [RiDashboardLine, "Portfolio"], [RiStackLine, "Investments"], [RiDownload2Line, "Deposit"], [RiUpload2Line, "Withdraw"],
  [RiHandCoinLine, "Profit wallet"], [RiWallet3Line, "Affiliate"], [RiTeamLine, "Team tree"], [RiExchangeLine, "Transfers"],
  [RiFileChartLine, "Reports"], [RiCoinsLine, "Staking"],
];

const Head = ({ icon: Icon, tag, title, text }) => (
  <div className="bento__head">
    {Icon && <span className="bento__icon"><Icon /></span>}
    <span className="bento__tag">{tag}</span>
    <h3>{title}</h3>
    {text && <p>{text}</p>}
  </div>
);

export default function Products() {
  return (
    <section className="section" id="products">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="The ecosystem"
          title={<>Four products. <span className="text-gradient">One engine.</span></>}
          lead={`From automated signal execution to managed pools and the ${site.token.symbol} token, everything connects inside your account.`}
        />

        <div className="bento">
          {/* AI engine */}
          <div className="bento__cell bento__cell--xl">
            <GlassCard className="bento__card">
              <Head icon={RiRobot2Line} tag="01 · Core technology" title="AI Trading Bot"
                text="Scans crypto and forex markets around the clock, generates trade decisions and executes them automatically, inside strict, pre-set risk limits." />
              <div className="engine">
                <ul className="engine__signals">
                  <li><span className="pip" />BUY BTC <b>0.82</b></li>
                  <li className="is-sell"><span className="pip" />SELL GBP/USD <b>0.74</b></li>
                  <li><span className="pip" />BUY SOL <b>0.77</b></li>
                </ul>
                <EngineCandles />
              </div>
            </GlassCard>
          </div>

          {/* Crypto pool */}
          <div className="bento__cell bento__cell--wide">
            <GlassCard className="bento__card">
              <Head icon={RiCoinsLine} tag="02 · Managed pool" title="Crypto Pool"
                text="Diversified digital-asset strategies run by automated models with human oversight." />
              <div className="pool">
                <div className="pool__coins">
                  {["BTC", "ETH", "BNB", "SOL", "USDT"].map((c, i) => (
                    <span key={c} style={{ zIndex: 5 - i }}>
                      <CoinIcon symbol={c} size={46} />
                    </span>
                  ))}
                </div>
                <div className="pool__bar" aria-hidden="true">
                  {[["#f7931a", 38], ["#627eea", 26], ["#f3ba2f", 14], ["#14f195", 12], ["#26a17b", 10]].map(([c, w]) => (
                    <span key={c} style={{ background: c, width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* FX */}
          <div className="bento__cell">
            <GlassCard className="bento__card">
              <Head icon={RiGlobalLine} tag="03 · Forex" title="FX Alpha Pool" />
              <ul className="fx">
                {[["EUR", "EUR/USD", 0.12], ["GBP", "GBP/USD", -0.08], ["JPY", "USD/JPY", 0.21]].map(([s, p, c]) => (
                  <li key={p}>
                    <span><CoinIcon symbol={s} size={20} />{p}</span>
                    <span className={c >= 0 ? "positive" : "negative"}>{c >= 0 ? <RiArrowUpSFill /> : <RiArrowDownSFill />}{Math.abs(c)}%</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Token */}
          <div className="bento__cell">
            <GlassCard className="bento__card">
              <Head tag="04 · Utility" title={`${site.token.symbol} Token`} text="Subscriptions, fee benefits & staking." />
              <div className="token-mini">
                <LogoMark size={86} />
              </div>
            </GlassCard>
          </div>

          {/* Security */}
          <div className="bento__cell">
            <GlassCard className="bento__card">
              <Head tag="Security" title="Cold storage & multi-sig" />
              <div className="shield">
                <span className="shield__ring" />
                <span className="shield__ring shield__ring--2" />
                <RiShieldCheckLine />
              </div>
            </GlassCard>
          </div>

          {/* Payouts */}
          <div className="bento__cell">
            <GlassCard className="bento__card">
              <Head icon={RiTimerFlashLine} tag="Withdrawals" title="Fast USDT payouts" text="From $10, straight to your wallet." />
              <div className="payout">
                <span className="payout__num text-gradient">24h</span>
                <span className="payout__track"><span style={{ width: "72%" }} /></span>
              </div>
            </GlassCard>
          </div>

          {/* Modules */}
          <div className="bento__cell bento__cell--wide">
            <GlassCard className="bento__card">
              <Head icon={RiLayoutGridLine} tag="Investor dashboard" title="Every module, one login" />
              <ul className="modules">
                {modules.map(([Icon, label]) => (
                  <li key={label}><Icon />{label}</li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
