import { useEffect, useRef } from "react";
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

const clamp = (v) => Math.min(1, Math.max(0, v));

/* Sticky cards pile up as you scroll. Scale and dim are written straight to the DOM
   (one passive scroll listener that returns early while the section is off screen), so React never re-renders. */
export default function HowItWorks() {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = [...stack.querySelectorAll(".stack__card")];
    const dims = cards.map((c) => c.querySelector(".stack__dim"));
    const total = cards.length;

    const update = () => {
      const r = stack.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return; // off screen
      const progress = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
      cards.forEach((card, i) => {
        const start = i / total;
        const t = clamp((progress - start) / (1 - start));
        card.style.transform = `scale(${1 - t * (total - i) * 0.035})`;
        const d = i === total - 1 ? 0 : clamp((progress - start) / (1 / total)) * 0.45;
        dims[i].style.opacity = d;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title={<>From sign-up to <span className="text-gradient">first payout</span></>}
          lead="Six steps, all handled from your dashboard. Scroll to walk through them."
        />
        <div className="stack" ref={stackRef}>
          {steps.map((step, index) => {
            const [a, b] = hues[index % hues.length];
            return (
              <div className="stack__slot" style={{ "--i": index }} key={step.title}>
                <article className="stack__card" style={{ "--a": a, "--b": b }}>
                  <div className="stack__dim" aria-hidden="true" />
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
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
