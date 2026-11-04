import { useId, useSyncExternalStore } from "react";

/* Shared profile photo: set from the Profile page, shown everywhere an avatar appears. */
let photo = null;
const listeners = new Set();
export const setPhoto = (url) => { photo = url; listeners.forEach((l) => l()); };
export const usePhoto = () => useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => photo);

/* Circular avatar: the uploaded photo, or a drawn default portrait */
export default function Avatar({ size = 42, ring = false, online = false, className = "" }) {
  const url = usePhoto();
  const id = useId().replace(/:/g, "");

  return (
    <span className={`dx-avatar ${ring ? "has-ring" : ""} ${className}`} style={{ width: size, height: size }}>
      {url ? (
        <img src={url} alt="" />
      ) : (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" fill={`url(#${id})`} />
          <path d="M8 66c2-15 12-21 24-21s22 6 24 21z" fill="#0b2a8a" />
          <path d="M24 44h16v6c0 3-3 5-8 5s-8-2-8-5z" fill="#f5c9ad" />
          <ellipse cx="32" cy="28" rx="11" ry="12.5" fill="#fbd9c1" />
          <path d="M20.5 27c-1-9 5-15 12.5-15 8 0 13 5 11.5 15-2-5-5-8-9-8.5-4-.5-10 1-15 8.5z" fill="#0b1b4d" />
          <circle cx="27.5" cy="29" r="1.3" fill="#0b1b4d" />
          <circle cx="36.5" cy="29" r="1.3" fill="#0b1b4d" />
          <path d="M28.5 34c2 1.8 5 1.8 7 0" fill="none" stroke="#c47a5a" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
      {online && <i className="dx-avatar__dot" />}
    </span>
  );
}
