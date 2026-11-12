import type { PlateKind } from '@/content/site';

/**
 * Art-directed figures for each case study, drawn in SVG from the idea behind the project.
 * They are diagrams, not screenshots — swap in real captures by replacing <ProjectPlate />
 * with an <Image /> in Work.tsx once you have them.
 */

const PAPER = '#f2efe8';
const ACCENT = '#ff5b1f';

/** Small deterministic PRNG so server and client always draw the same figure. */
function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Ledger() {
  const rand = mulberry(26);
  const size = 21;
  const cell = 12;
  const ox = 96;
  const oy = 174;
  const cells: Array<[number, number]> = [];
  const inFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!inFinder(x, y) && rand() > 0.52) cells.push([x, y]);
    }
  }
  const finders: Array<[number, number]> = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  const states = ['Placed', 'Paid', 'Verified', 'Collected'];

  return (
    <>
      <g fill={PAPER}>
        {cells.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={ox + x * cell} y={oy + y * cell} width={cell - 1.5} height={cell - 1.5} opacity={0.82} />
        ))}
        {finders.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect
              x={ox + x * cell + 3}
              y={oy + y * cell + 3}
              width={cell * 7 - 7.5}
              height={cell * 7 - 7.5}
              fill="none"
              stroke={PAPER}
              strokeWidth={6}
            />
            <rect x={ox + (x + 2) * cell} y={oy + (y + 2) * cell} width={cell * 3 - 1.5} height={cell * 3 - 1.5} />
          </g>
        ))}
      </g>
      <rect className="scan anim" x={ox - 14} y={oy - 1} width={size * cell + 26} height={2} fill={ACCENT} />

      <g fontFamily="var(--font-mono)" fontSize={13} letterSpacing="0.14em">
        <line x1={476} y1={198} x2={476} y2={402} stroke={PAPER} strokeOpacity={0.22} />
        <line x1={476} y1={198} x2={476} y2={334} stroke={PAPER} />
        {states.map((state, i) => {
          const y = 198 + i * 68;
          const done = i < 2;
          const current = i === 2;
          return (
            <g key={state}>
              <circle
                cx={476}
                cy={y}
                r={current ? 9 : 6}
                fill={current ? ACCENT : done ? PAPER : '#111113'}
                stroke={current ? ACCENT : PAPER}
                strokeOpacity={done || current ? 1 : 0.4}
                strokeWidth={1.5}
                className={current ? 'blink anim' : undefined}
              />
              <text x={506} y={y + 4.5} fill={PAPER} fillOpacity={done || current ? 1 : 0.4}>
                {state.toUpperCase()}
              </text>
              <text x={704} y={y + 4.5} textAnchor="end" fill={PAPER} fillOpacity={0.35}>
                0{i + 1}
              </text>
            </g>
          );
        })}
      </g>
    </>
  );
}

function Waveform() {
  const rand = mulberry(104);
  const count = 92;
  const step = 7.4;
  const x0 = 60;
  const suspect = (i: number) => i >= 50 && i <= 66;
  const bars = Array.from({ length: count }, (_, i) => {
    const envelope = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.11) * Math.cos(i * 0.043 + 1.1));
    const jitter = 0.45 + rand() * 0.55;
    const height = Math.max(8, envelope * jitter * (suspect(i) ? 250 : 200));
    return { i, height };
  });
  const windows = Array.from({ length: 8 }, (_, w) => {
    const from = 3 + w * 10;
    const to = from + 17;
    return { w, x: x0 + from * step, width: (to - from) * step, hot: from <= 66 && to >= 50 };
  });

  return (
    <>
      <line x1={x0} y1={270} x2={x0 + count * step} y2={270} stroke={PAPER} strokeOpacity={0.14} />
      {bars.map(({ i, height }) => (
        <rect
          key={i}
          className="bar anim"
          style={{ animationDelay: `${-(i % 9) * 0.17}s` }}
          x={x0 + i * step}
          y={270 - height / 2}
          width={3.2}
          height={height}
          rx={1.6}
          fill={suspect(i) ? ACCENT : PAPER}
          opacity={suspect(i) ? 1 : 0.78}
        />
      ))}
      <g fontFamily="var(--font-mono)" fontSize={11} letterSpacing="0.12em">
        {windows.map(({ w, x, width, hot }) => {
          const y = 448 + (w % 2) * 30;
          return (
            <g key={w} stroke={hot ? ACCENT : PAPER} strokeOpacity={hot ? 1 : 0.32} fill="none">
              <path d={`M${x} ${y - 7} V${y} H${x + width} V${y - 7}`} strokeWidth={1.5} />
              <text x={x + width / 2} y={y + 16} textAnchor="middle" stroke="none" fill={hot ? ACCENT : PAPER} fillOpacity={hot ? 1 : 0.4}>
                W{w + 1}
              </text>
            </g>
          );
        })}
      </g>
    </>
  );
}

function Volume() {
  const cx = 400;
  const cy = 300;
  const contour = (scale: number, phase: number) => {
    const pts: string[] = [];
    for (let k = 0; k <= 96; k++) {
      const a = (k / 96) * Math.PI * 2;
      const r = (176 + 13 * Math.sin(2 * a + phase) + 7 * Math.sin(5 * a + 1.3 + phase * 2) + 4 * Math.sin(9 * a)) * scale;
      pts.push(`${(cx + Math.cos(a) * r * 0.88).toFixed(1)},${(cy + Math.sin(a) * r * 1.06).toFixed(1)}`);
    }
    return `M${pts.join('L')}Z`;
  };
  const blob = (bx: number, by: number, radius: number, wobble: number) => {
    const pts: string[] = [];
    for (let k = 0; k <= 48; k++) {
      const a = (k / 48) * Math.PI * 2;
      const r = radius + wobble * Math.sin(3 * a + 0.6) + wobble * 0.6 * Math.sin(5 * a);
      pts.push(`${(bx + Math.cos(a) * r).toFixed(1)},${(by + Math.sin(a) * r).toFixed(1)}`);
    }
    return `M${pts.join('L')}Z`;
  };
  const tx = 462;
  const ty = 262;

  return (
    <>
      <g fill="none" stroke={PAPER}>
        {[1, 0.86, 0.72, 0.58, 0.44, 0.3, 0.17].map((scale, i) => (
          <path key={scale} d={contour(scale, i * 0.35)} strokeOpacity={0.9 - i * 0.11} strokeWidth={i === 0 ? 1.6 : 1} />
        ))}
        <path d={`M${cx} ${cy - 180} Q${cx - 8} ${cy} ${cx} ${cy + 182}`} strokeOpacity={0.3} />
      </g>

      <path d={blob(tx, ty, 62, 7)} fill="none" stroke={ACCENT} strokeDasharray="3 6" strokeWidth={1.4} />
      <path d={blob(tx, ty, 40, 5)} fill={ACCENT} fillOpacity={0.22} stroke={ACCENT} strokeWidth={1.4} />
      <path d={blob(tx + 4, ty - 2, 19, 3)} fill={ACCENT} />

      <g stroke={PAPER} strokeOpacity={0.45}>
        <line x1={70} y1={ty} x2={730} y2={ty} strokeDasharray="2 7" />
        <line x1={tx} y1={56} x2={tx} y2={544} strokeDasharray="2 7" />
      </g>

      <g className="orbit anim">
        <circle cx={cx} cy={cy} r={236} fill="none" stroke={PAPER} strokeOpacity={0.12} />
        <circle cx={cx + 236} cy={cy} r={5} fill={PAPER} />
        <circle cx={cx - 236} cy={cy} r={2.5} fill={PAPER} fillOpacity={0.5} />
      </g>
    </>
  );
}

function Tilemap() {
  const rand = mulberry(7);
  const tile = 20;
  const cols = 40;
  const ground = Array.from({ length: cols }, (_, c) => {
    if (c >= 9 && c <= 16) return 20;
    const base = 21 + Math.round(Math.sin(c * 0.42) * 2.2 + Math.sin(c * 0.13 + 2) * 1.6);
    return Math.max(16, Math.min(25, base));
  });
  const platforms = [
    { c: 19, r: 15, w: 4 },
    { c: 25, r: 12, w: 3 },
    { c: 31, r: 16, w: 5 },
  ];
  const stars = Array.from({ length: 26 }, () => ({
    x: Math.floor(rand() * cols) * tile + 8,
    y: Math.floor(rand() * 10) * tile + 8,
    o: 0.2 + rand() * 0.5,
  }));
  const px = 240;
  const py = ground[12] * tile;
  const ec = 33;
  const ey = 16 * tile;

  return (
    <>
      {stars.map((star, i) => (
        <rect key={i} x={star.x} y={star.y} width={3} height={3} fill={PAPER} opacity={star.o} />
      ))}
      <circle cx={628} cy={112} r={46} fill="none" stroke={PAPER} strokeOpacity={0.5} />
      <circle cx={644} cy={100} r={46} fill="#111113" />

      {ground.map((row, c) => (
        <g key={c}>
          <rect x={c * tile} y={row * tile} width={tile - 1} height={tile - 1} fill={PAPER} opacity={0.9} />
          <rect x={c * tile} y={(row + 1) * tile} width={tile - 1} height={600 - (row + 1) * tile} fill={PAPER} opacity={0.1 + ((c * 7) % 3) * 0.035} />
        </g>
      ))}
      {platforms.map((p) =>
        Array.from({ length: p.w }, (_, k) => (
          <rect key={`${p.c}-${k}`} x={(p.c + k) * tile} y={p.r * tile} width={tile - 1} height={tile - 1} fill={PAPER} opacity={0.55} />
        )),
      )}

      {/* Player */}
      <g fill={PAPER}>
        <rect x={px - 8} y={py - 56} width={16} height={16} />
        <rect x={px - 12} y={py - 38} width={24} height={22} />
        <rect x={px - 12} y={py - 14} width={9} height={14} />
        <rect x={px + 3} y={py - 14} width={9} height={14} />
      </g>
      {/* Scythe */}
      <g className="sweep anim" fill="none" stroke={ACCENT} strokeLinecap="round">
        <line x1={px + 10} y1={py - 8} x2={px + 66} y2={py - 104} strokeWidth={4} />
        <path d={`M${px + 66} ${py - 104} q44 -6 62 34 q-30 -22 -62 -14`} fill={ACCENT} strokeWidth={2} />
      </g>

      {/* Enemy */}
      <g fill={PAPER} opacity={0.75}>
        <rect x={ec * tile - 4} y={ey - 36} width={28} height={36} />
        <rect x={ec * tile - 12} y={ey - 22} width={8} height={12} />
        <rect x={ec * tile + 24} y={ey - 22} width={8} height={12} />
      </g>
      <rect className="blink anim" x={ec * tile + 2} y={ey - 28} width={6} height={6} fill={ACCENT} />
      <rect className="blink anim" x={ec * tile + 13} y={ey - 28} width={6} height={6} fill={ACCENT} />
    </>
  );
}

const FIGURES: Record<PlateKind, () => React.JSX.Element> = {
  ledger: Ledger,
  waveform: Waveform,
  volume: Volume,
  tilemap: Tilemap,
};

type Props = { kind: PlateKind; index: string; caption: string; label: string };

export function ProjectPlate({ kind, index, caption, label }: Props) {
  const Figure = FIGURES[kind];
  return (
    <figure className="plate aspect-[4/3]">
      <div className="plate-drift h-full w-full">
        <svg viewBox="0 0 800 600" role="img" aria-label={`${label}: ${caption}`} className="plate-art">
          <Figure />
        </svg>
      </div>
      <figcaption className="label pointer-events-none absolute inset-0 flex flex-col justify-between bg-[linear-gradient(to_top,rgb(17_17_19/0.9),transparent_24%)] p-4 text-mute md:p-5">
        <span className="flex justify-between">
          <span>
            Fig. {index}
          </span>
          <span className="text-dim">{kind}</span>
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
