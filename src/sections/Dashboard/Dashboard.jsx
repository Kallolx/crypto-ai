import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiDashboardLine, RiStackLine, RiDownload2Line, RiUpload2Line, RiTeamLine, RiExchangeLine, RiFileChartLine,
  RiCoinsLine, RiAddLine, RiArrowRightUpLine, RiNotification3Line, RiArrowUpSFill, RiSearchLine,
} from "react-icons/ri";
import Button from "@/components/ui/Button/Button";
import GlassCard from "@/components/ui/GlassCard/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Logo from "@/components/ui/Logo/Logo";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import PortfolioChart from "./charts/PortfolioChart";
import AllocationDonut from "./charts/AllocationDonut";
import Sparkline from "./charts/Sparkline";
import InsightPanels from "./charts/InsightPanels";
import { wallets, transactions, dashNav, sparks } from "@/data/dashboard";
import "./Dashboard.css";

const navIcons = [RiDashboardLine, RiStackLine, RiDownload2Line, RiUpload2Line, RiTeamLine, RiExchangeLine, RiFileChartLine, RiCoinsLine];

const statusClass = { Credited: "ok", Completed: "ok", Confirmed: "ok", Processing: "wait" };

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <section className="section" id="dashboard">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Your control room"
          title={<>Every wallet, <span className="text-gradient">one view</span></>}
          lead="Deposits, profits, affiliate bonuses, withdrawals and token staking, tracked side by side in real time."
        />

        <Reveal y={50}>
          <GlassCard strong className="dash">
            <aside className="dash__side">
              <div className="dash__brand"><Logo size={28} /></div>
              <nav className="dash__nav">
                {dashNav.map((label, i) => {
                  const Icon = navIcons[i];
                  return (
                    <button key={label} className={`dash__nav-item ${active === label ? "is-active" : ""}`} onClick={() => setActive(label)}>
                      <Icon />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="dash__main">
              <div className="dash__top">
                <div>
                  <span className="dash__crumb">{active}</span>
                  <h3>Welcome back, Alex</h3>
                </div>
                <div className="dash__tools">
                  <span className="dash__actions">
                    <Button to="/signup" size="sm" icon={RiAddLine}>Deposit</Button>
                    <Button to="/signup" size="sm" variant="glass" icon={RiArrowRightUpLine}>Withdraw</Button>
                  </span>
                  <span className="dash__search"><RiSearchLine />Search</span>
                  <span className="dash__bell"><RiNotification3Line /><i /></span>
                  <span className="dash__avatar">AM</span>
                </div>
              </div>

              <div className="dash__wallets">
                {wallets.map((w, i) => (
                  <motion.div
                    key={w.label}
                    className="wallet"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    <span className="wallet__label">{w.label}</span>
                    <CountUp
                      className="wallet__value"
                      to={w.value}
                      prefix={w.unit ? "" : "$"}
                      suffix={w.unit ? ` ${w.unit}` : ""}
                      decimals={w.unit ? 0 : 2}
                    />
                    {w.change > 0 ? (
                      <span className="wallet__change positive"><RiArrowUpSFill />{w.change}% this month</span>
                    ) : (
                      <span className="wallet__change">Available to invest</span>
                    )}
                    <Sparkline data={sparks[w.label]} color={i === 2 ? "#a5b4fc" : "#22d3ee"} />
                  </motion.div>
                ))}
              </div>

              <div className="dash__panels">
                <div className="panel panel--chart">
                  <PortfolioChart />
                </div>
                <div className="panel">
                  <div className="panel__head">
                    <h4>Allocation</h4>
                  </div>
                  <AllocationDonut />
                </div>
              </div>

              <InsightPanels />

              <div className="panel">
                <div className="panel__head">
                  <h4>Recent activity</h4>
                  <span className="panel__chip">Last 5</span>
                </div>
                <div className="tx">
                  {transactions.map((t) => (
                    <div className="tx__row" key={t.type + t.date}>
                      <span className="tx__type">
                        <CoinIcon symbol={t.asset} size={28} />
                        <span>
                          {t.type}
                          <small>{t.date}</small>
                        </span>
                      </span>
                      <span className={`tx__amount mono ${t.amount > 0 ? "positive" : ""}`}>
                        {t.amount > 0 ? "+" : "−"}
                        {Math.abs(t.amount).toLocaleString("en-US", { minimumFractionDigits: t.asset === "USDT" ? 2 : 0 })} {t.asset}
                      </span>
                      <span className={`tx__status tx__status--${statusClass[t.status]}`}>{t.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
        <p className="dash__note">Design preview with sample data.</p>
      </div>
    </section>
  );
}
