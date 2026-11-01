/* Shared dark glass tooltip for every Recharts chart on the dashboard */
export default function ChartTooltip({ active, payload, label, format = (v) => v, names = {} }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="ct">
      <b>{label}</b>
      {payload.map((p) => (
        <span key={p.dataKey}>
          <i style={{ background: p.color || p.stroke || p.fill }} />
          {names[p.dataKey] ?? p.name}
          <em className="mono">{format(p.value)}</em>
        </span>
      ))}
    </div>
  );
}
