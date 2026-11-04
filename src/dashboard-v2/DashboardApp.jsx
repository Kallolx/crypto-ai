import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RiMenu2Fill, RiCloseLine, RiLogoutBoxRFill, RiDownload2Fill, RiUpload2Fill } from "react-icons/ri";
import { LogoMark } from "@/components/ui/Logo/Logo";
import { user } from "./data";
import HeaderActions from "./HeaderActions";
import { BRAND, all, groups, tabs } from "./nav";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";
import Investments from "./pages/Investments";
import InvestDetails from "./pages/InvestDetails";
import InvestNew from "./pages/InvestNew";
import InvestFlow from "./pages/InvestFlow";
import Wallets from "./pages/Wallets";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transactions";
import Referral from "./pages/Referral";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import "./DashboardApp.css";
import "./pages/more.css";
import "./pages/sidebar.css";
import "./pages/cards.css";
import "./pages/controls.css";
import "./pages/profile.css";
import "./pages/wallets.css";
import "./pages/header.css";
import "./pages/invest.css";
import "./pages/desktop.css";

/* Floating bottom bar. The glass pill is measured from the active item and glides between them. */
function BottomTabs({ pathname }) {
  const ref = useRef(null);
  const clean = pathname.replace(/\/$/, "");
  const active = tabs.findIndex((t) => (t.end ? clean === t.to : clean === t.to || clean.startsWith(`${t.to}/`)));
  const [pos, setPos] = useState({ x: 0, w: 0, ready: false, animate: false });

  const measure = () => {
    const el = ref.current?.querySelectorAll("a")[active];
    if (el && !tabs[active].center) setPos((p) => ({ ...p, x: el.offsetLeft, w: el.offsetWidth, ready: true }));
    else setPos((p) => ({ ...p, ready: false }));
  };

  useLayoutEffect(measure, [active]);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPos((p) => ({ ...p, animate: true })));
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [active]);

  return (
    <nav className="dx__tabs" aria-label="Dashboard mobile" ref={ref}>
      <span className="dx__glide" aria-hidden="true"
        style={{ transform: `translateX(${pos.x}px)`, width: pos.w, opacity: pos.ready ? 1 : 0, transition: pos.animate ? undefined : "none" }} />
      {tabs.map(({ to, label, Icon, end, center }, i) => (
        <NavLink key={to} to={to} end={end} className={`${center ? "is-center" : ""} ${i === active ? "is-active" : ""}`}><em><Icon /></em><span>{label}</span></NavLink>
      ))}
    </nav>
  );
}

const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "short", year: "numeric" });
const Wordmark = () => <b>{BRAND[0]}<u>{BRAND[1]}</u></b>;

/* Demo dashboard: gradient header, glass cards, grouped sidebar (drawer on mobile) and floating bottom bar. */
export default function DashboardApp() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  // Once the page scrolls, the pinned bar gets its own gradient so content never shows through it
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const clean = pathname.replace(/\/$/, "");
  const current = all.find((n) => n.to === clean) ?? all.find((n) => n.to !== "/dashboard-v2" && clean.startsWith(`${n.to}/`)) ?? all[0];
  const isHome = current === all[0];

  return (
    <div className={`dx ${open ? "is-open" : ""}`}>
      <button className="dx__scrim" aria-label="Close menu" onClick={() => setOpen(false)} />

      <aside className="dx__side">
        <div className="dx__brand">
          <Link to="/dashboard-v2" className="dx__brandlink" aria-label="Go to dashboard home"><LogoMark size={36} /><Wordmark /></Link>
          <button className="dx__x" aria-label="Close menu" onClick={() => setOpen(false)}><RiCloseLine /></button>
        </div>

        <nav aria-label="Dashboard">
          {groups.map((g) => (
            <div key={g.title} className="dx__group">
              <span className="dx__gt">{g.title}</span>
              {g.items.map(({ to, label, Icon, end }) => (
                <NavLink key={to} to={to} end={end} className="dx__link"><span className="dx__ico"><Icon /></span>{label}</NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="dx__foot">
          <Link to="/login"><RiLogoutBoxRFill />Sign out</Link>
          <small className="dx__copy">&copy; {new Date().getFullYear()} {BRAND.join("")}. All rights reserved.</small>
        </div>
      </aside>

      <div className="dx__main">
        <div className={`dx__barwrap ${stuck ? "is-stuck" : ""}`}>
          <div className="dx__bar">
            <button className="dx__round dx__menu" aria-label="Open menu" onClick={() => setOpen(true)}><RiMenu2Fill /></button>
            <Link to="/dashboard-v2" className="dx__mark" aria-label="Go to dashboard home"><LogoMark size={32} /><Wordmark /></Link>
            <div className="dx__dtitle">
              <small>{today}</small>
              <h1>{isHome ? `Welcome back, ${user.name.split(" ")[0]}` : current.label}</h1>
            </div>
            <span className="dx__spacer" />
            <nav className="dx__quick dx__quick--bar" aria-label="Quick actions">
              <Link to="/dashboard-v2/deposit"><RiDownload2Fill /><span>Deposit</span></Link>
              <Link to="/dashboard-v2/withdraw"><RiUpload2Fill /><span>Withdraw</span></Link>
            </nav>
            <HeaderActions />
          </div>
        </div>

        <header className="dx__head">
          <div className="dx__hello">
            <div>
              <small>{today}</small>
              <h1>{isHome ? `Welcome back, ${user.name.split(" ")[0]}` : current.label}</h1>
            </div>
            <nav className="dx__quick" aria-label="Quick actions">
              <Link to="/dashboard-v2/deposit" aria-label="Deposit"><RiDownload2Fill /><span>Deposit</span></Link>
              <Link to="/dashboard-v2/withdraw" aria-label="Withdraw"><RiUpload2Fill /><span>Withdraw</span></Link>
            </nav>
          </div>
        </header>

        <main className="dx__body">
          <Routes>
            <Route index element={<Home />} />
            <Route path="markets" element={<Markets />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="investments" element={<Investments />} />
            <Route path="investments/new" element={<InvestNew />} />
            <Route path="investments/:id" element={<InvestDetails />} />
            <Route path="investments/:id/invest" element={<InvestFlow />} />
            <Route path="wallets" element={<Wallets />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="referral" element={<Referral />} />
            <Route path="activity" element={<Activity />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard-v2" replace />} />
          </Routes>
        </main>
      </div>

      <BottomTabs pathname={pathname} />
    </div>
  );
}
