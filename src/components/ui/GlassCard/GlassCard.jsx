import { useRef } from "react";
import "./GlassCard.css";

/* Frosted glass card with lit corners and a cursor-follow spotlight */
export default function GlassCard({ as: Tag = "div", strong, className = "", children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onMove} className={`glass ${strong ? "glass--strong" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
