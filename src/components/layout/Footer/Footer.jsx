import { Link } from "react-router-dom";
import { RiTwitterXLine, RiTelegram2Line, RiDiscordLine, RiYoutubeLine } from "react-icons/ri";
import Logo from "@/components/ui/Logo/Logo";
import { site } from "@/config/site";
import "./Footer.css";

const columns = [
  { title: "Platform", links: [["Products", "/#products"], ["Pricing", "/pricing"], [`${site.token.symbol} Token`, "/token"], ["Dashboard", "/#dashboard"], ["Log in", "/login"], ["Create account", "/signup"]] },
  { title: "Resources", links: [["White paper", "#"], ["FAQ", "/#faq"], ["Blog", "#"], ["Support", `mailto:${site.email}`]] },
  { title: "Legal", links: [["Terms & Conditions", "/terms"], ["Privacy Policy", "/privacy"], ["Risk Disclosure", "/risk"]] },
];

const socials = [
  { Icon: RiTwitterXLine, label: "X" },
  { Icon: RiTelegram2Line, label: "Telegram" },
  { Icon: RiDiscordLine, label: "Discord" },
  { Icon: RiYoutubeLine, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>AI-driven crypto and forex trading pools, a native utility token and a complete investor dashboard.</p>
            <div className="footer__socials">
              {socials.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}><Icon /></a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(([label, to]) => (
                  <li key={label}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__wordmark" aria-hidden="true">{site.name}</div>

        <div className="footer__legal">
          <p>
            <strong>Risk warning:</strong> Trading cryptocurrencies and foreign exchange carries a high level of risk and may not be suitable
            for all investors. Advertised rates are targets, not guarantees, and past performance does not indicate future results. You may
            lose some or all of your invested capital. {site.token.symbol} is a utility token and does not represent equity or a claim on
            platform profits. Not available to residents of the {site.restricted}.
          </p>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} {site.company} · {site.domain}</span>
            <span>{site.email}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
