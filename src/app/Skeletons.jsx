/* Loading placeholders that mirror the real page layouts (hero panel + cards), so nothing jumps when data arrives */
const Sk = ({ w = "100%", h = 12, r, style }) => <span className="sk" style={{ width: w, height: h, borderRadius: r, ...style }} />;

function PanelSk({ tiles = 4 }) {
  return (
    <div className="xp xp--sk">
      <div className="xp__main">
        <div style={{ display: "flex", gap: 6 }}><Sk w={120} h={24} r={999} /><Sk w={100} h={24} r={999} /></div>
        <Sk w={140} h={10} style={{ marginTop: 10 }} />
        <Sk w={260} h={40} />
        <Sk w="50%" h={12} />
        <div className="xp__tiles">{Array.from({ length: tiles }, (_, i) => <Sk key={i} h={58} r={8} />)}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}><Sk w={110} h={38} r={8} /><Sk w={110} h={38} r={8} /></div>
      </div>
      <div className="xp__aside"><Sk w={140} h={140} r="50%" style={{ margin: "0 auto" }} /><Sk h={10} style={{ marginTop: 16 }} /><Sk h={10} style={{ marginTop: 8 }} /></div>
    </div>
  );
}

function CardSk({ rows = 4, chart }) {
  return (
    <div className="card">
      <div className="card__head">
        <div className="card__title"><Sk w={30} h={30} r={8} /><div style={{ display: "grid", gap: 6 }}><Sk w={140} h={12} /><Sk w={200} h={9} /></div></div>
        <Sk w={70} h={12} />
      </div>
      {chart ? (
        <div className="card__body"><Sk h={chart} r={8} /></div>
      ) : (
        Array.from({ length: rows }, (_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, height: 52, padding: "0 18px", borderBottom: "1px solid var(--d-border)" }}>
            <Sk w="22%" h={10} /><Sk w="28%" h={10} /><Sk w="14%" h={10} style={{ marginLeft: "auto" }} /><Sk w={70} h={20} r={999} />
          </div>
        ))
      )}
    </div>
  );
}

function StatsSk() {
  return (
    <div className="grid-4">
      {[0, 1, 2, 3].map((i) => (
        <div className="card stat" key={i}>
          <div className="stat__body">
            <div className="stat__top"><Sk w="45%" h={10} /><Sk w={30} h={30} r={8} /></div>
            <Sk w="65%" h={24} /><Sk w="40%" h={10} />
          </div>
          <Sk h={46} r={0} />
        </div>
      ))}
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="pg">
      <PanelSk tiles={6} />
      <div className="card" style={{ padding: 18 }}>
        <Sk w={180} h={14} />
        <div className="setup__steps" style={{ marginTop: 14 }}>{[0, 1, 2, 3, 4].map((i) => <Sk key={i} h={120} r={8} />)}</div>
      </div>
      <StatsSk />
      <div className="grid-main"><CardSk chart={290} /><CardSk rows={6} /></div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="pg">
      <PanelSk />
      <div className="grid-main"><CardSk rows={6} /><CardSk chart={220} /></div>
    </div>
  );
}
