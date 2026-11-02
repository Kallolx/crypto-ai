import { RiArrowRightUpLine, RiShieldCheckLine, RiTimerFlashLine, RiExchangeDollarLine } from "react-icons/ri";
import Button from "@/components/ui/Button/Button";
import Terminal from "./terminal/Terminal";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-tag">New</span>
          AI engine v4 is live for crypto &amp; forex pools
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">Trade smarter with</span>{" "}
          <span className="text-gradient">AI-driven precision</span>
        </h1>

        <p className="hero__lead">
          Automated strategies, professional fund managers and one transparent dashboard, built for crypto and forex.
        </p>

        <div className="hero__actions">
          <Button to="/signup" size="lg" icon={RiArrowRightUpLine}>Start from $50</Button>
          <Button to="/pricing" size="lg" variant="glass">Explore plans</Button>
        </div>

        <ul className="hero__proof">
          <li><RiExchangeDollarLine />USDT · BEP20 deposits</li>
          <li><RiTimerFlashLine />Payouts within 96h</li>
          <li><RiShieldCheckLine />Multi-sig custody</li>
        </ul>
      </div>

      <div className="container hero__stage">
        <div className="hero__frame">
          <div className="hero__glow" aria-hidden="true" />
          <Terminal />
        </div>
      </div>
    </section>
  );
}
