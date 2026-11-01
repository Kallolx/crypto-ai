import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { steps } from "@/data/content";
import StepVisual from "./StepVisuals";
import "./HowItWorks.css";

const hues = [
  ["#1d4ed8", "#22d3ee"],
  ["#2563eb", "#818cf8"],
  ["#0e7490", "#3b82f6"],
  ["#4338ca", "#22d3ee"],
  ["#1e40af", "#34d399"],
  ["#2563eb", "#a5b4fc"],
];

/* One sticky card. As later cards slide over it, it scales down and dims. */
function StackCard({ step, index, total, progress }) {
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [0, index === total - 1 ? 0 : 0.45]);
  const [a, b] = hues[index % hues.length];

  return (
    <div className="stack__slot" style={{ "--i": index }}>
      <motion.article className="stack__card" style={{ scale, "--a": a, "--b": b }}>
        <motion.div className="stack__dim" style={{ opacity: dim }} aria-hidden="true" />

        <div className="stack__copy">
          <span className="stack__num">{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          <ul className="stack__meta">
            {step.meta.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>

        <div className="stack__visual" aria-hidden="true">
          <StepVisual index={index} />
        </div>
      </motion.article>
    </div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title={<>From sign-up to <span className="text-gradient">first payout</span></>}
          lead="Six steps, all handled from your dashboard. Scroll to walk through them."
        />
        <div className="stack" ref={ref}>
          {steps.map((step, i) => (
            <StackCard key={step.title} step={step} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
