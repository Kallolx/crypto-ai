import GlassCard from "@/components/ui/GlassCard/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import CoinIcon from "@/components/ui/CoinIcon/CoinIcon";
import AllocationDonut from "./charts/AllocationDonut";
import { transactions } from "@/data/dashboard";
import "./Dashboard.css";

const statusClass = { Credited: "ok", Completed: "ok", Confirmed: "ok", Processing: "wait" };

const activityRows = transactions.map((t) => (
  <div className={`tx__row ${t.isNew ? "tx__row--new" : ""}`} key={t.type + t.date}>
    <span className="tx__type">
      <CoinIcon symbol={t.asset} size={28} />
      <span>
        {t.type}
        <small>{t.date}</small>
      </span>
    </span>
    <span className="tx__meta">
      {t.isNew && <i className="tx__new">New</i>}
      <span className="tx__amount mono">*** {t.asset}</span>
      <span className={`tx__status tx__status--${statusClass[t.status]}`}>{t.status}</span>
    </span>
  </div>
));

export default function Dashboard() {
  return (
    <section className="section" id="dashboard">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Your control room"
          title={<>Every wallet, <span className="text-gradient">one view</span></>}
          lead="See how your portfolio is allocated and review your latest account activity in one place."
        />

        <GlassCard strong className="dash">
          <div className="dash__main">
            <div className="dash__panels">
              <div className="panel">
                <div className="panel__head">
                  <h4>Allocation</h4>
                </div>
                <AllocationDonut />
              </div>

              <div className="panel">
                <div className="panel__head">
                  <h4>Recent activity</h4>
                <span className="panel__chip">Live feed</span>
                </div>
                <div className="tx__viewport" aria-label="Recent activity">
                  <div className="tx__track">
                  <div className="tx">{activityRows}</div>
                  <div className="tx" aria-hidden="true">{activityRows}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        <p className="dash__note">Design preview with sample data.</p>
      </div>
    </section>
  );
}
