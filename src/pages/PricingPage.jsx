import { RiInformationLine } from "react-icons/ri";
import PageHero from "@/sections/PageHero/PageHero";
import PricingPlans from "@/sections/Pricing/PricingPlans";
import Calculator from "@/sections/Calculator/Calculator";
import CTA from "@/sections/CTA/CTA";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import { terms } from "@/data/plans";
import { site } from "@/config/site";
import "./PricingPage.css";

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        segments={[{ text: "Plans built for" }, { text: "every portfolio", className: "text-gradient" }]}
        lead="Choose a crypto tier with daily distributions or a forex cycle paid weekly or monthly. Every plan is funded in USDT (BEP20)."
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <PricingPlans />
        </div>
      </section>

      <Calculator />

      <section className="section" id="terms">
        <div className="container">
          <SectionHeading
            align="split"
            eyebrow="Key terms"
            title={<>Clear rules, <span className="text-gradient">up front</span></>}
            lead="Fees, minimums and caps that apply across plans. Read the full Terms & Conditions before depositing."
          />
          <div className="terms">
            {terms.map(([k, v]) => (
              <div key={k}>
                <GlassCard className="terms__item">
                  <span>{k}</span>
                  <strong>{v}</strong>
                </GlassCard>
              </div>
            ))}
          </div>
          <div className="terms__notice">
            <p className="notice">
              <RiInformationLine />
              Target rates are not guaranteed. Trading crypto and forex is high risk and you may lose some or all of your deposit.
              Not available to residents of the {site.restricted}.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
