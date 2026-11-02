import { useState } from "react";
import { RiAddLine, RiCustomerService2Line } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Button from "@/components/ui/Button/Button";
import { faqs } from "@/data/content";
import { site } from "@/config/site";
import "./FAQ.css";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="faq__aside">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={<>Questions, <span className="text-gradient">answered</span></>}
            lead="Can't find what you need? Our support desk replies within one business day."
          >
            <div className="faq__cta">
              <Button href={`mailto:${site.email}`} variant="glass" icon={RiCustomerService2Line}>Contact support</Button>
            </div>
          </SectionHeading>
        </div>

        <div className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  {f.q}
                  <span className="faq__plus" style={{ rotate: isOpen ? "45deg" : "0deg" }}>
                    <RiAddLine />
                  </span>
                </button>
                {isOpen && (
                  <div className="faq__a">
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
