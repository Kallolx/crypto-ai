import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiArrowRightUpLine, RiFileCopyLine, RiCheckLine, RiRobot2Line, RiSparkling2Line, RiPercentLine, RiStackLine,
  RiInformationLine, RiWallet3Line, RiExchangeLine, RiGiftLine,
} from "react-icons/ri";
import PageHero from "@/sections/PageHero/PageHero";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { LogoMark } from "@/components/ui/Logo/Logo";
import { site } from "@/config/site";
import "./TokenPage.css";

const { token } = site;

const utilities = [
  { Icon: RiRobot2Line, title: "Bot subscriptions", text: `Pay for trading-bot access and plan add-ons in ${token.symbol}.` },
  { Icon: RiSparkling2Line, title: "Premium features", text: "Unlock advanced reports and priority tooling." },
  { Icon: RiPercentLine, title: "Fee benefits", text: `Reduced platform fees when settling in ${token.symbol}.` },
  { Icon: RiStackLine, title: "In-app staking", text: "Stake tokens inside the dashboard's staking module." },
];

const allocations = ["Airdrop", "Ecosystem rewards", "Liquidity pool", "Private / seed", "Public sale", "Team & advisers", "Treasury"];

const flow = [
  { Icon: RiWallet3Line, title: "Fund with USDT", text: "Top up your deposit wallet." },
  { Icon: RiExchangeLine, title: "Buy at desk rate", text: `$${token.price} per ${token.symbol}.` },
  { Icon: RiGiftLine, title: `+${token.bonus}% bonus`, text: "Credited separately." },
  { Icon: RiStackLine, title: "Use or stake", text: "Inside your dashboard." },
];

export default function TokenPage() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(token.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <PageHero
        crumb={`${token.symbol} Token`}
        segments={[{ text: "Meet" }, { text: `${token.symbol},`, className: "text-gradient" }, { text: "the fuel of the engine" }]}
        lead={`The ${token.network} utility token behind bot subscriptions, premium features, fee benefits and in-app staking.`}
      >
        <Button to="/signup" size="lg" icon={RiArrowRightUpLine}>Buy {token.symbol}</Button>
        <Button href="#" size="lg" variant="glass">Read the white paper</Button>
      </PageHero>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container token">
          <Reveal className="token__visual">
            <GlassCard strong className="token__coin-card">
              <div className="token__rings" aria-hidden="true"><span /><span /><span /></div>
              <motion.div className="token__coin" animate={{ rotateY: [-20, 20, -20], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
                <LogoMark size={200} />
              </motion.div>
            </GlassCard>
          </Reveal>

          <Reveal stagger={0.07} className="token__specs">
            <Reveal.Item><GlassCard className="spec"><small>Total supply</small><CountUp className="spec__value text-gradient" to={token.supply} /><span>Fixed supply</span></GlassCard></Reveal.Item>
            <Reveal.Item><GlassCard className="spec"><small>Desk sale price</small><strong className="spec__value">${token.price}</strong><span>Per {token.symbol}</span></GlassCard></Reveal.Item>
            <Reveal.Item><GlassCard className="spec"><small>Network</small><strong className="spec__value">BNB Chain</strong><span>BEP20 standard</span></GlassCard></Reveal.Item>
            <Reveal.Item><GlassCard className="spec"><small>Purchase bonus</small><strong className="spec__value text-gradient">+{token.bonus}%</strong><span>$100 → 20,000 + 1,200 {token.symbol}</span></GlassCard></Reveal.Item>
            <Reveal.Item className="spec--wide">
              <GlassCard className="spec">
                <small>Contract address</small>
                <div className="contract">
                  <code>{token.contract}</code>
                  <button onClick={copy} aria-label="Copy contract address">{copied ? <RiCheckLine /> : <RiFileCopyLine />}</button>
                </div>
              </GlassCard>
            </Reveal.Item>
          </Reveal>
        </div>

        <div className="container">
          <Reveal stagger={0.08} className="utilities">
            {utilities.map(({ Icon, title, text }) => (
              <Reveal.Item key={title}>
                <GlassCard className="utility">
                  <span className="utility__icon"><Icon /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </GlassCard>
              </Reveal.Item>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            align="split"
            eyebrow="Tokenomics"
            title={<>Seven planned <span className="text-gradient">allocations</span></>}
            lead={`${(token.supply / 1e6).toFixed(0)} million tokens across the buckets below. Exact percentages are set out in the white paper.`}
          />
          <Reveal stagger={0.05} className="alloc">
            {allocations.map((a, i) => (
              <Reveal.Item key={a} className="alloc__chip"><span className="mono">{String(i + 1).padStart(2, "0")}</span>{a}</Reveal.Item>
            ))}
          </Reveal>
          <Reveal stagger={0.08} className="flow">
            {flow.map(({ Icon, title, text }, i) => (
              <Reveal.Item key={title}>
                <GlassCard className="flow__step">
                  <span className="flow__n mono">Step {i + 1}</span>
                  <Icon className="flow__icon" />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </GlassCard>
              </Reveal.Item>
            ))}
          </Reveal>
          <Reveal className="token__notice">
            <p className="notice">
              <RiInformationLine />
              {token.symbol} is a utility token. It is not equity and gives no claim on {site.name} profits. The desk price is not a
              guaranteed market value, and exchange listing, liquidity and redemption are not guaranteed. Smart contracts can contain bugs.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
