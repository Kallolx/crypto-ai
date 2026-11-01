import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useLocation } from "react-router-dom";

/* Handles route changes and "/#section" links through Lenis so scrolling stays smooth */
function RouteScroll() {
  const lenis = useLenis();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!lenis) return;
    if (hash) {
      // wait a frame so the target section has rendered
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el, { offset: -110 });
      });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis, pathname, hash]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <RouteScroll />
      {children}
    </ReactLenis>
  );
}
