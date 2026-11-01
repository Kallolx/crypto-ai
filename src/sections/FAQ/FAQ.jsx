import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiAddLine, RiCustomerService2Line } from "react-icons/ri";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal";
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
            <Reveal delay={0.2} className="faq__cta">
              <Button href={`mailto:${site.email}`} variant="glass" icon={RiCustomerService2Line}>Contact support</Button>
            </Reveal>
          </SectionHeading>
        </div>

        <Reveal stagger={0.06} className="faq__list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal.Item key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  {f.q}
                  <motion.span className="faq__plus" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <RiAddLine />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal.Item>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
