import { RiInformationLine, RiArrowRightUpLine } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Button from "@/components/ui/Button/Button";
import PricingPlans from "./PricingPlans";

/* Home-page pricing block */
export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHeading
          eyebrow="Plans"
          title={<>Pick your <span className="text-gradient">pool</span></>}
          lead="Four crypto tiers and two forex cycles. Start from $50."
        />
        <PricingPlans />
        <div className="pricing__foot">
          <p className="notice">
            <RiInformationLine />
            Rates are target ranges, not guaranteed returns. Trading involves risk and you may lose part or all of your deposit.
            Principal withdrawals carry a 15% fee and earnings are capped (4X passive).
          </p>
          <Button to="/pricing" variant="glass" icon={RiArrowRightUpLine}>Compare plans &amp; calculator</Button>
        </div>
      </div>
    </section>
  );
}
