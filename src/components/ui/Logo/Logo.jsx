import { Link } from "react-router-dom";
import { site } from "@/config/site";
import "./Logo.css";

/* Brand mark: open "C" ring with an AI node, plus wordmark */
export function LogoMark({ size = 34 }) {
  return (
    <svg className="logo__mark" width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e40af" />
          <stop offset="1" stopColor="#0b1a46" />
        </linearGradient>
        <linearGradient id="lm-c" x1="14" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dbeafe" />
          <stop offset=".5" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="lm-edge" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".85" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset=".7" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#67e8f9" stopOpacity=".8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#lm-bg)" />
      <rect x=".5" y=".5" width="63" height="63" rx="17.5" stroke="url(#lm-edge)" />
      <path d="M43 20.5A16 16 0 1 0 43 43.5" stroke="url(#lm-c)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="45" cy="32" r="5" fill="#22d3ee" />
      <circle cx="45" cy="32" r="9" stroke="#22d3ee" strokeOpacity=".35" />
    </svg>
  );
}

export default function Logo({ size }) {
  const [first, second] = site.name.split("-");
  return (
    <Link to="/" className="logo" aria-label={`${site.name} home`} data-cursor="hover">
      <LogoMark size={size} />
      <span className="logo__word">
        {first}
        {second && (
          <>
            <span className="logo__dash">-</span>
            <span className="logo__accent">{second}</span>
          </>
        )}
      </span>
    </Link>
  );
}
