import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Jumps to the top on route change, or to the "/#section" target when a hash is present */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // wait a frame so the target section has rendered
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
