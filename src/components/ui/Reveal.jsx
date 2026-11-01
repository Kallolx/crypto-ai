import { motion } from "framer-motion";

/* Fade-up on scroll. Use <Reveal stagger> around a list to cascade its <Reveal.Item> children. */
const ease = [0.22, 1, 0.36, 1];

export default function Reveal({ as = "div", delay = 0, y = 28, stagger, className, children, ...rest }) {
  const Comp = motion[as];
  if (stagger) {
    return (
      <Comp
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

Reveal.Item = function RevealItem({ as = "div", className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants} {...rest}>
      {children}
    </Comp>
  );
};
