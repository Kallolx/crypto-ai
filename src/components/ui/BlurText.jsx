import { motion } from "framer-motion";

/* Word-by-word blur-in (in the spirit of React Bits' BlurText).
   Pass `segments` to style parts, e.g. [{ text: "Trade" }, { text: "smarter", className: "text-gradient" }] */
export default function BlurText({ segments, as: Tag = "h1", className, delay = 0, stagger = 0.07 }) {
  const MotionTag = motion[Tag];
  let i = 0;

  return (
    <MotionTag className={className} initial="hidden" animate="show" aria-label={segments.map((s) => s.text).join(" ")}>
      {segments.map((seg, s) => (
        <span key={s} style={seg.block ? { display: "block" } : undefined}>
          {seg.text.split(" ").map((word) => {
            const index = i++;
            return (
              <motion.span
                key={index}
                // class goes on each word: background-clip:text can't paint through transformed children
                className={seg.className}
                aria-hidden="true"
                style={{ display: "inline-block", whiteSpace: "pre" }}
                variants={{
                  hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
                  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + index * stagger } },
                }}
              >
                {word + " "}
              </motion.span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}
