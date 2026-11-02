import { RiShieldKeyholeLine } from "react-icons/ri";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import { security } from "@/data/content";
import "./Security.css";

export default function Security() {
  return (
    <section className="section" id="security">
      <div className="container">
        <div>
          <GlassCard className="security">
            <div className="security__intro">
              <span className="security__badge"><RiShieldKeyholeLine /></span>
              <h2>Built to protect <span className="text-gradient">every layer</span></h2>
              <p className="lead">Account protection, custody controls and trading risk limits work together so the engine never runs unchecked.</p>
            </div>
            <div className="security__grid">
              {security.map(({ icon: Icon, title, text }) => (
                <div key={title} className="security__item">
                  <span className="security__icon"><Icon /></span>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
