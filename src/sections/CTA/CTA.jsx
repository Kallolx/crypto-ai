import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowRightUpLine, RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal";
import "./CTA.css";

/* Waitlist form, front-end validation only. Wire `onSubmit` to the client's CRM/backend. */
export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(ok ? "ok" : "error");
    if (ok) setEmail("");
  };

  return (
    <section className="section" id="get-started">
      <div className="container">
        <Reveal y={40}>
          <GlassCard strong className="cta">
            <div className="cta__bg" aria-hidden="true">
              <div className="cta__beam" />
              <div className="cta__floor" />
            </div>
            <span className="cta__eyebrow"><span className="cta__live" />Accounts opening now</span>
            <h2>Let the engine <span className="text-gradient">work the markets</span></h2>
            <p className="lead">Join the waitlist for early access, product updates and launch offers.</p>

            <form className="cta__form" onSubmit={submit} noValidate>
              <label className="sr-only" htmlFor="cta-email">Email address</label>
              <input id="cta-email" className="cta__input" type="email" placeholder="you@email.com" autoComplete="email"
                value={email} onChange={(e) => { setEmail(e.target.value); setStatus(null); }} />
              <Button type="submit" icon={RiArrowRightUpLine}>Get early access</Button>
            </form>
            <AnimatePresence mode="wait">
              {status && (
                <motion.p key={status} className={`cta__status ${status === "ok" ? "positive" : "negative"}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                  {status === "ok" ? <><RiCheckboxCircleLine />You're on the list, we'll be in touch.</> : <><RiErrorWarningLine />Please enter a valid email address.</>}
                </motion.p>
              )}
            </AnimatePresence>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
