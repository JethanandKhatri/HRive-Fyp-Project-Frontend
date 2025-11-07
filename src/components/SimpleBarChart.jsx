export default function SimpleBarChart({ data, width = 320, height = 120 }) {
  // data: array of numbers 0..1
  const max = Math.max(...data, 1);
  const w = width;
  const h = height;
  const barW = Math.floor(w / (data.length * 1.5));
  const gap = Math.floor(barW / 2);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
      <rect x="0" y="0" width={w} height={h} fill="#ffffff" />
      {data.map((v, i) => {
        const bh = Math.round((v / max) * (h - 20));
        const x = i * (barW + gap) + gap;
        const y = h - bh - 10;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="6" ry="6" fill="#0ea5e9" opacity={0.85} />
          </g>
        );
      })}
      <line x1="0" y1={h - 10} x2={w} y2={h - 10} stroke="#e2e8f0" />
    </svg>
  );
}

