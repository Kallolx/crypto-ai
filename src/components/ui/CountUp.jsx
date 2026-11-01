import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/* Spring-driven count-up that starts when scrolled into view */
export default function CountUp({ to, decimals = 0, prefix = "", suffix = "", locale = true, className }) {
  const ref = useRef(null);
  const value = useMotionValue(0);
  const spring = useSpring(value, { damping: 40, stiffness: 90 });
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const format = (n) =>
    prefix +
    (locale
      ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals)) +
    suffix;

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = format(v);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring, decimals, prefix, suffix]
  );

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  );
}
