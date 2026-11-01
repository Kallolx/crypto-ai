import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RiArrowRightUpLine, RiShieldCheckLine, RiTimerFlashLine, RiExchangeDollarLine } from "react-icons/ri";
import BlurText from "@/components/ui/BlurText";
import Button from "@/components/ui/Button/Button";
import Terminal from "./terminal/Terminal";
import "./Hero.css";

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export default function Hero() {
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start 0.25"] });
  // Terminal tilts back and straightens as it scrolls into view
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section className="hero">
      <div className="container hero__inner">
        <motion.div className="hero__badge" {...fadeUp(0)}>
          <span className="hero__badge-tag">New</span>
          AI engine v4 is live for crypto &amp; forex pools
        </motion.div>

        <BlurText
          className="hero__title"
          delay={0.1}
          segments={[
            { text: "Trade smarter with", block: true },
            { text: "AI-driven precision", className: "text-gradient" },
          ]}
        />

        <motion.p className="hero__lead" {...fadeUp(0.45)}>
          Automated strategies, professional fund managers and one transparent dashboard, built for crypto and forex.
        </motion.p>

        <motion.div className="hero__actions" {...fadeUp(0.55)}>
          <Button to="/signup" size="lg" icon={RiArrowRightUpLine}>Start from $50</Button>
          <Button to="/pricing" size="lg" variant="glass">Explore plans</Button>
        </motion.div>

        <motion.ul className="hero__proof" {...fadeUp(0.65)}>
          <li><RiExchangeDollarLine />USDT · BEP20 deposits</li>
          <li><RiTimerFlashLine />Payouts within 96h</li>
          <li><RiShieldCheckLine />Multi-sig custody</li>
        </motion.ul>
      </div>

      <div className="container hero__stage" ref={stageRef}>
        <motion.div
          className="hero__frame"
          style={{ rotateX, scale }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.6 }}
        >
          <div className="hero__glow" aria-hidden="true" />
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
