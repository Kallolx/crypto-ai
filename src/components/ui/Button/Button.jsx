import { Link } from "react-router-dom";
import "./Button.css";

/* Glass button with glowing corners and a light sweep on hover.
   variant: "primary" | "glass"   size: "sm" | "md" | "lg" */
export default function Button({ to, href, variant = "primary", size = "md", block, icon: Icon, className = "", children, ...rest }) {
  const cls = ["btn", `btn--${variant}`, `btn--${size}`, block && "btn--block", className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {Icon && <Icon className="btn__icon" aria-hidden="true" />}
    </>
  );

  if (to) return <Link to={to} className={cls} data-cursor="hover" {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} data-cursor="hover" {...rest}>{inner}</a>;
  return <button className={cls} data-cursor="hover" {...rest}>{inner}</button>;
}
