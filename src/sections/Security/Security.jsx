import { motion } from "framer-motion";
import { RiShieldKeyholeLine } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { security } from "@/data/content";
import "./Security.css";

export default function Security() {
  return (
    <section className="section" id="security">
      <div className="container">
        <Reveal>
          <GlassCard className="security">
            <div className="security__intro">
              <span className="security__badge"><RiShieldKeyholeLine /></span>
              <h2>Built to protect <span className="text-gradient">every layer</span></h2>
              <p className="lead">Account protection, custody controls and trading risk limits work together so the engine never runs unchecked.</p>
            </div>
            <Reveal stagger={0.07} className="security__grid">
              {security.map(({ icon: Icon, title, text }) => (
                <Reveal.Item key={title} className="security__item">
                  <motion.span className="security__icon" whileHover={{ rotate: -8, scale: 1.08 }}><Icon /></motion.span>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </Reveal.Item>
              ))}
            </Reveal>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
