import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiArrowRightSLine, RiCloseLine, RiArrowRightUpLine } from "react-icons/ri";
import Logo, { LogoMark } from "@/components/ui/Logo/Logo";
import { site } from "@/config/site";
import { sidebar, BASE } from "./nav";
import "./Sidebar.css";

const href = (to) => (to ? `${BASE}/${to}` : BASE);

function Group({ item }) {
  const { pathname } = useLocation();
  const inside = pathname.startsWith(href(item.to) + "/");
  const [open, setOpen] = useState(inside);
  const Icon = item.icon;
  const expanded = open || inside;

  return (
    <li>
      <button className={`sb__item ${inside ? "is-current" : ""}`} aria-expanded={expanded} onClick={() => setOpen(!expanded)}>
        <Icon className="sb__icon" />
        <span className="sb__label">{item.label}</span>
        {item.tag && <span className="sb__tag">{item.tag}</span>}
        <span className="sb__count">{item.children.length}</span>
        <RiArrowRightSLine className="sb__chev" />
      </button>
      {expanded && (
        <ul className="sb__sub">
          {item.children.map(([label, slug]) => (
            <li key={slug}>
              <NavLink to={`${href(item.to)}/${slug}`} className="sb__subitem">{label}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ onClose }) {
  return (
    <aside className="sb" aria-label="Dashboard">
      <div className="sb__top">
        <Logo size={32} />
        <button className="sb__close" aria-label="Close menu" onClick={onClose}><RiCloseLine /></button>
      </div>

      <nav className="sb__nav">
        {sidebar.map((g, gi) => (
          <div className="sb__group" key={gi}>
            {g.title && <span className="sb__title">{g.title}</span>}
            <ul>
              {g.items.map((item) =>
                item.children ? (
                  <Group key={item.label} item={item} />
                ) : (
                  <li key={item.label}>
                    <NavLink to={href(item.to)} end={!item.to} className="sb__item">
                      <item.icon className="sb__icon" />
                      <span className="sb__label">{item.label}</span>
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sb__promo">
        <LogoMark size={36} />
        <div>
          <strong>{site.token.symbol} staking</strong>
          <span>Earn on idle tokens</span>
        </div>
        <NavLink to={`${BASE}/reports/staking`} className="sb__promo-go" aria-label="Open staking"><RiArrowRightUpLine /></NavLink>
      </div>
    </aside>
  );
}
