import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { RiMenu4Line, RiCloseLine, RiArrowRightUpLine } from "react-icons/ri";
import Logo from "@/components/ui/Logo/Logo";
import Button from "@/components/ui/Button/Button";
import TickerBar from "@/components/layout/TickerBar/TickerBar";
import { nav } from "@/config/site";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { pathname, hash } = useLocation();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 16));
  useEffect(() => setOpen(false), [pathname, hash]);

  const isActive = (to) => (to.includes("#") ? false : pathname === to);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <TickerBar />
      <div className="header__bar container">
        <Logo />
        <nav className="header__nav" aria-label="Main">
          {nav.map((item) => (
            <NavLink key={item.label} to={item.to} className={() => `header__link ${isActive(item.to) ? "is-active" : ""}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Button to="/login" variant="glass" size="sm" className="header__login">Log in</Button>
          <Button to="/signup" size="sm" icon={RiArrowRightUpLine} className="header__cta">Get started</Button>
          <button className="header__toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <RiCloseLine /> : <RiMenu4Line />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="header__drawer container"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile"
          >
            {nav.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <NavLink to={item.to} className="header__drawer-link">{item.label}</NavLink>
              </motion.div>
            ))}
            <Button to="/login" variant="glass" block>Log in</Button>
            <Button to="/signup" block icon={RiArrowRightUpLine}>Get started</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
