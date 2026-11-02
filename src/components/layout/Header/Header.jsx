import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiMenu4Line, RiCloseLine, RiArrowRightUpLine } from "react-icons/ri";
import Logo from "@/components/ui/Logo/Logo";
import Button from "@/components/ui/Button/Button";
import TickerBar from "@/components/layout/TickerBar/TickerBar";
import { nav } from "@/config/site";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname, hash]);

  const isActive = (to) => (to.includes("#") ? false : pathname === to);

  return (
    <header className={`header ${scrolled || open ? "is-scrolled" : ""}`}>
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

      {open && (
        <nav className="header__drawer container" aria-label="Mobile">
          {nav.map((item) => (
            <NavLink key={item.label} to={item.to} className="header__drawer-link">{item.label}</NavLink>
          ))}
          <Button to="/login" variant="glass" block>Log in</Button>
          <Button to="/signup" block icon={RiArrowRightUpLine}>Get started</Button>
        </nav>
      )}
    </header>
  );
}
