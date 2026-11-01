import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./Cursor.css";

/* Trailing ring + precise dot. Ring grows over links/buttons ([data-cursor="hover"], a, button).
   Disabled on touch devices. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches);
    if (!fine.matches) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHover(!!e.target.closest?.('a, button, [data-cursor="hover"], input, select, summary'));
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className={`cursor-ring ${hover ? "is-hover" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: down ? 0.8 : hover ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        aria-hidden="true"
      />
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible && !hover ? 1 : 0 }}
        aria-hidden="true"
      />
    </>
  );
}
