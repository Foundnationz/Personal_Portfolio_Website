import type { ArtKind } from "./_data";

const S = "#729AC1";
const L = "#3a4656";

export function ProjectArt({ kind }: { kind: ArtKind }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Abstract illustration, not real data">
      <rect width="320" height="180" fill="#1b2129" />
      {kind === "ledger" && (
        <g>
          <rect x="40" y="20" width="240" height="140" rx="6" fill="#262e39" stroke={L} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <line x1="40" x2="280" y1={50 + i * 20} y2={50 + i * 20} stroke={L} />
              <rect x="54" y={36 + i * 20} width={50 + ((i * 17) % 40)} height="5" rx="2" fill={i === 2 ? S : "#56657a"} />
              <rect x="224" y={36 + i * 20} width="40" height="5" rx="2" fill="#56657a" />
            </g>
          ))}
          <line x1="200" x2="200" y1="20" y2="160" stroke={L} />
          <rect x="54" y="136" width="70" height="6" rx="3" fill={S} />
        </g>
      )}
      {kind === "grid" && (
        <g>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 8 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={36 + c * 31} y={20 + r * 24} width="27" height="20" rx="2"
                fill={(r * 3 + c * 5) % 7 === 0 ? S : "#262e39"} stroke={L} />
            ))
          )}
        </g>
      )}
      {kind === "document" && (
        <g>
          <rect x="95" y="14" width="130" height="152" rx="5" fill="#262e39" stroke={L} />
          <rect x="111" y="32" width="60" height="8" rx="2" fill={S} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x="111" y={56 + i * 14} width={98 - (i % 3) * 18} height="4" rx="2" fill="#56657a" />
          ))}
          <rect x="60" y="40" width="70" height="100" rx="5" fill="none" stroke={L} strokeDasharray="4 4" />
        </g>
      )}
      {kind === "flow" && (
        <g fill="none" stroke={L} strokeWidth="2">
          <path d="M80 90 H130 M190 90 H240 M160 60 V30 M160 120 V150" />
          <rect x="30" y="68" width="50" height="44" rx="6" fill="#262e39" />
          <rect x="130" y="62" width="60" height="56" rx="6" fill={S} stroke={S} />
          <rect x="240" y="68" width="50" height="44" rx="6" fill="#262e39" />
          <circle cx="160" cy="22" r="10" fill="#262e39" />
          <circle cx="160" cy="158" r="10" fill="#262e39" />
        </g>
      )}
    </svg>
  );
}
