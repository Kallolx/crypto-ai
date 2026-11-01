import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCheckLine, RiArrowRightUpLine, RiFireLine, RiBitCoinLine, RiGlobalLine } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import Button from "@/components/ui/Button/Button";
import { plans } from "@/data/plans";
import "./Pricing.css";

const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const tabs = [
  { id: "crypto", label: "Crypto pools", Icon: RiBitCoinLine },
  { id: "forex", label: "Forex pools", Icon: RiGlobalLine },
];

export default function PricingPlans() {
  const [type, setType] = useState("crypto");
  const list = plans[type];

  return (
    <>
      <div className="pricing__toolbar">
        <div className="seg" role="tablist" aria-label="Plan type">
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} role="tab" aria-selected={type === id} className="seg__btn" onClick={() => setType(id)}>
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <span className="pricing__hint">{type === "crypto" ? "Daily distribution · 4X cap" : "Weekly or monthly cycles · $30 bot fee"}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={type}
          className={`pricing__grid pricing__grid--${list.length}`}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, transition: { duration: 0.15 } } }}
        >
          {list.map((p) => (
            <motion.div
              key={p.id}
              variants={{ hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <GlassCard strong={p.featured} className={`plan ${p.featured ? "plan--featured" : ""}`}>
                <div className="plan__head">
                  <span className="plan__name">{p.name}</span>
                  {p.featured ? (
                    <span className="plan__badge plan__badge--hot"><RiFireLine />Popular</span>
                  ) : (
                    <span className="plan__badge">{p.period === "day" ? "Daily" : p.period}</span>
                  )}
                </div>
                <span className="plan__range">{usd(p.min)} – {usd(p.max)}</span>
                <div className="plan__rate">
                  <strong className="text-gradient">{p.rateMin}–{p.rateMax}%</strong>
                  <span>target per {p.period}</span>
                </div>
                <ul className="plan__features">
                  {p.features.map((f) => (
                    <li key={f}><RiCheckLine />{f}</li>
                  ))}
                </ul>
                <Button to="/signup" variant={p.featured ? "primary" : "glass"} block icon={RiArrowRightUpLine}>
                  Choose {p.name}
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
