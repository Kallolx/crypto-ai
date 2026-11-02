import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  RiMenu4Line, RiNotification3Line, RiArrowDownSLine, RiUser3Line, RiSettings3Line, RiLogoutBoxRLine, RiHome5Line,
  RiTicket2Line, RiDownload2Line, RiLineChartLine, RiCustomerService2Line,
} from "react-icons/ri";
import { routes, BASE } from "./nav";
import { user, catalogAll } from "./data";

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  const path = pathname.replace(BASE, "").replace(/^\//, "");
  const route = routes.find((r) => r.path === path);
  // Checkout pages: /dashboard/invest/<planId>
  const checkout = path.startsWith("invest/") && catalogAll.find((p) => p.id === path.split("/")[1]);
  const title = checkout ? `Invest in ${checkout.name}` : route?.label ?? "Dashboard";

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const close = (e) => !menuRef.current?.contains(e.target) && setMenu(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menu]);

  return (
    <header className="tb">
      <button className="tb__menu" aria-label="Open menu" onClick={onMenu}><RiMenu4Line /></button>

      <div className="tb__title">
        <h1>{title}</h1>
      </div>

      <div className="tb__quick">
        <Link to={`${BASE}/draw/buy`} className="ui-btn tb__draw"><RiTicket2Line /><span>Draw</span><sup>3d</sup></Link>
        <Link to={`${BASE}/wallet/deposit`} className="ui-btn tb__deposit"><RiDownload2Line /><span>Deposit</span></Link>
        <Link to={`${BASE}/investments`} className="ui-btn ui-btn--cyan tb__invest"><RiLineChartLine /><span>Invest</span></Link>
      </div>

      <div className="tb__actions">
        <Link to={`${BASE}/support/center`} className="tb__icon" aria-label="Support"><RiCustomerService2Line /></Link>
        <button className="tb__icon" aria-label="Notifications, 3 unread"><RiNotification3Line /><i /></button>

        <div className="tb__user" ref={menuRef}>
          <button className="tb__me" aria-expanded={menu} aria-haspopup="menu" onClick={() => setMenu(!menu)}>
            <span className="tb__avatar">{user.initials}</span>
            <span className="tb__who">
              <b>{user.username}</b>
              <small>{user.tier} member</small>
            </span>
            <RiArrowDownSLine className="tb__caret" />
          </button>
          {menu && (
            <div className="tb__drop" role="menu">
              <div className="tb__drop-head">
                <b>{user.name}</b>
                <small>{user.email}</small>
              </div>
              <Link to={`${BASE}/settings`} role="menuitem"><RiUser3Line />Profile</Link>
              <Link to={`${BASE}/settings`} role="menuitem"><RiSettings3Line />Settings</Link>
              <Link to={`${BASE}/support/center`} role="menuitem"><RiCustomerService2Line />Support center</Link>
              <Link to="/" role="menuitem"><RiHome5Line />Back to website</Link>
              <button role="menuitem" onClick={() => navigate("/login")}><RiLogoutBoxRLine />Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
