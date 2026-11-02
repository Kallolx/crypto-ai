// Decorative QR-style code seeded from the value, so each address/link gets a stable pattern.
// Swap for a real QR encoder (e.g. qrcode) before launch; this one is not scannable.
const N = 25;

function cells(seed) {
  let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 233280, 7);
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const out = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const finder = (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
      if (!finder && r() > 0.52) out.push([x, y]);
    }
  return out;
}

export default function Qr({ value, size = 168 }) {
  const finders = [[0, 0], [N - 7, 0], [0, N - 7]];
  return (
    <svg viewBox={`-2 -2 ${N + 4} ${N + 4}`} width={size} height={size} className="qr" shapeRendering="crispEdges" aria-label="QR code">
      <rect x="-2" y="-2" width={N + 4} height={N + 4} fill="#fff" />
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#06112e" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#06112e" />
        </g>
      ))}
      {cells(value).map(([x, y]) => <rect key={`${x},${y}`} x={x} y={y} width="1" height="1" fill="#06112e" />)}
    </svg>
  );
}
