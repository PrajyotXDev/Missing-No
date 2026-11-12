/**
 * Single source of truth for everything the site says.
 *
 * Editing guide
 * - Anything set to `null` renders as a visible "to add" marker on the page,
 *   so missing facts are never silently invented. Fill it in and the marker goes away.
 * - Project copy was written from each repository's README and source tree.
 *   Read it once and correct anything that is not accurate.
 */

export type Link = { label: string; href: string };

export type PlateKind = 'ledger' | 'waveform' | 'volume' | 'tilemap';

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  year: string | null;
  context: string | null;
  summary: string;
  problem: string;
  stack: string[];
  challenges: string[];
  features: string[];
  repo: string | null;
  live: string | null;
  plate: PlateKind;
  plateCaption: string;
};

export type ArchiveEntry = {
  name: string;
  description: string;
  stack: string[];
  year: string | null;
  href: string | null;
};

export type TechGroup = {
  id: string;
  label: string;
  items: { name: string; usedIn: string[] }[];
};

export type Milestone = {
  /** `null` shows a "date to add" marker. */
  date: string | null;
  title: string;
  org: string;
  body: string;
  link?: Link;
};

export type Curiosity = {
  title: string;
  body: string;
  link?: Link;
};

export const site = {
  name: 'Prajyot Satarde',
  firstName: 'Prajyot',
  lastName: 'Satarde',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-website-lemon-tau-80.vercel.app',
  tagline: 'Theory, compiled.',
  role: 'Mathematics & Computing student · Full-stack developer',
  description:
    'Prajyot Satarde is a Mathematics and Computing student at IIT Dharwad building full-stack products, machine-learning prototypes, simulations and games.',
  location: 'Dharwad, Karnataka, India',
  coordinates: '15.46° N, 75.01° E',
  timeZone: 'Asia/Kolkata',
  institute: 'IIT Dharwad',
  programme: 'Mathematics & Computing',
  email: 'prajyotsatarde2@gmail.com',
  status: 'Open to internships, research and ambitious builds',
  socials: [
    { label: 'GitHub', href: 'https://github.com/PrajyotXDev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prajyot-satarde-41064736b/' },
  ] satisfies Link[],
} as const;

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'journey', label: 'Journey' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
] as const;

export const hero = {
  intro:
    'I study the mathematics underneath software, then build the software — full-stack products, ML prototypes, simulations and games.',
};

export const about = {
  /** Read word by word as the visitor scrolls. */
  statement:
    'I am a Mathematics and Computing student at IIT Dharwad who moves between theory and implementation. I like taking an idea, understanding the system underneath it, and shipping something people can actually interact with.',
  columns: [
    {
      label: 'What I build',
      body: 'Whatever the idea needs. So far that has meant a store with real payments, a voice-deepfake detector, an MRI segmentation viewer, a black-hole ray tracer and a dark-fantasy 2D game.',
    },
    {
      label: 'How I work',
      body: 'Build something. Break something. Understand why. I would rather know what sits under an abstraction than only know how to call it.',
    },
    {
      label: 'What I am learning',
      body: 'Software engineering, systems and AI — with the mathematics alongside, because it keeps turning out to be the part that explains everything else.',
    },
    {
      label: 'Where I am headed',
      body: 'Toward software engineering work where correctness and craft both matter. Open to internships, research and teams building something ambitious.',
    },
  ],
  facts: [
    { label: 'Studying', value: 'Mathematics & Computing' },
    { label: 'At', value: 'IIT Dharwad' },
    { label: 'Based in', value: 'Dharwad, Karnataka' },
    { label: 'Focus', value: 'Software · Systems · AI' },
  ],
};

export const projects: Project[] = [
  {
    id: 'merch-store',
    index: '01',
    name: 'IIT Dharwad Merch Store',
    kind: 'Full-stack commerce',
    year: '2026',
    context: null,
    summary:
      'A complete store for campus merchandise — ordering, payment, staff verification and pickup in one flow.',
    problem:
      'Campus merch drives usually run on forms, payment screenshots and a spreadsheet someone has to reconcile by hand. This replaces that with one system where an order has a single, trustworthy state from checkout to collection.',
    stack: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Razorpay', 'Google Sheets API', 'Vercel'],
    challenges: [
      'Keeping payment state trustworthy: an order only becomes collectable once it is verified, either through the gateway or by a staff member reviewing a UPI payment proof.',
      'Locking down vendor orders and payment proofs at the database layer with SQL migrations rather than trusting the client.',
      'Testing the order workflow and the Razorpay integration against fakes, so the payment path can be exercised without real money.',
    ],
    features: [
      'Razorpay gateway checkout',
      'Staff-verified manual UPI flow',
      'Collection QR codes scanned at pickup',
      'Orders mirrored to Google Sheets',
      'Email confirmations',
      'Staff review and collection screens',
    ],
    repo: 'https://github.com/PrajyotXDev/IITDH-MERCH-STORE-DEPLOY',
    live: null,
    plate: 'ledger',
    plateCaption: 'Order state — placed, paid, verified, collected',
  },
  {
    id: 'voiceshield',
    index: '02',
    name: 'VoiceShield',
    kind: 'Machine learning · Security',
    year: '2026',
    context: 'Team Rocket · Smart India Hackathon 2026',
    summary:
      'Voice-deepfake detection that shows its evidence: which seconds of a recording look synthetic, and why.',
    problem:
      'Most spoof detectors return a single opaque verdict — real or fake. That is not enough for a security workflow. VoiceShield answers three questions instead: is it suspicious, where is the evidence, and why did the system decide that.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'JavaScript'],
    challenges: [
      'Scoring overlapping four-second windows with an AASIST anti-spoofing model, so the result is a timeline rather than one number.',
      'Separating raw model evidence from the application-level risk score — and not presenting that score as a calibrated probability.',
      'Assessing recording quality independently, so users can see when poor audio is affecting confidence.',
    ],
    features: [
      'WAV, FLAC, OGG and MP3 upload',
      'Window-level suspicion timeline',
      'Audio-quality assessment',
      'Explainability indicators',
      'Interactive forensic-style dashboard',
    ],
    repo: 'https://github.com/PrajyotXDev/SIH26104-TeamRocket-VoiceShield',
    live: 'https://sih26104-teamrocket-voiceshield.onrender.com/',
    plate: 'waveform',
    plateCaption: 'Overlapping windows, scored independently',
  },
  {
    id: 'neuroscope',
    index: '03',
    name: 'NeuroScope 3D',
    kind: 'Medical imaging · Research tool',
    year: '2026',
    context: 'Research and teaching use only — not a medical device',
    summary:
      'Brain-tumour segmentation from four MRI sequences, explored in linked axial, coronal, sagittal and 3D views.',
    problem:
      'Segmentation models produce volumes that are hard to inspect and easy to over-trust. NeuroScope pairs a 3D U-Net with a viewer that keeps every slice, surface and measurement linked — and states its limitations up front.',
    stack: ['TypeScript', 'Python', 'PyTorch', '3D U-Net', 'NIfTI'],
    challenges: [
      'Refusing bad input early: every file is validated for format, dimensions and finite, non-constant values before inference runs.',
      'Writing the segmentation back on the original input grid and affine, so results stay aligned with the source scans.',
      'Keeping three orthogonal slice views and a 3D scene in sync while layers are toggled.',
    ],
    features: [
      'Whole-tumour, core and enhancing volumes in mL',
      'Linked slice and 3D viewer',
      'Expert comparison with Dice, sensitivity and precision',
      'Graph analysis with shortest paths',
      'PDF report with provenance and limitations',
    ],
    repo: 'https://github.com/PrajyotXDev/NeuroScope3D',
    live: 'https://neuro-scope3-d.vercel.app',
    plate: 'volume',
    plateCaption: 'Linked views over a segmented volume',
  },
  {
    id: 'realmshift',
    index: '04',
    name: 'RealmShift Odyssey',
    kind: 'Game development',
    year: null,
    context: null,
    summary:
      'A dark-fantasy 2D adventure built in Unity — exploration, combat, enemies and a scythe-driven upgrade loop.',
    problem:
      'A game is a system you can feel. The goal was to design one end to end: movement that reads well, combat with weight, and progression that gives the player a reason to keep going.',
    stack: ['Unity', 'C#'],
    challenges: [
      'Designing gameplay systems — combat, enemies, progression — that stay independent enough to tune on their own.',
      'Building an upgrade loop around a single weapon so that progression changes how the game is played.',
    ],
    features: ['Exploration', 'Combat', 'Enemy encounters', 'Progression', 'Scythe upgrade loop'],
    repo: null,
    live: null,
    plate: 'tilemap',
    plateCaption: 'World, combat and progression as one loop',
  },
];

export const archive: ArchiveEntry[] = [
  {
    name: 'Campus Event Management Platform',
    description: 'Full-stack event management with an integrated frontend and backend.',
    stack: ['Full-stack'],
    year: null,
    href: null,
  },
  {
    name: 'Bithunt',
    description: 'Landing site for Team Parsec’s competitive-programming event at IIT Dharwad.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2026',
    href: 'https://bithunt-delta.vercel.app',
  },
  {
    name: 'Black Hole Simulation',
    description: 'Ray-traced gravitational lensing, an accretion disk and a curved spacetime grid.',
    stack: ['C++17', 'CMake'],
    year: '2026',
    href: 'https://github.com/PrajyotXDev/BLACK-HOLE-SIMULATION',
  },
  {
    name: 'ManhwaMatch',
    description: 'Quiz-based manhwa recommendations with trending titles from AniList.',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    year: '2026',
    href: 'https://github.com/PrajyotXDev/THE-MANHWA-MATCH',
  },
  {
    name: 'Data Speaks',
    description: 'Student-performance analysis comparing three regression models, leakage excluded.',
    stack: ['Python', 'Jupyter'],
    year: '2026',
    href: 'https://data-speaks-student-performance.vercel.app',
  },
  {
    name: 'Medi-Guide',
    description: 'Symptom triage that routes patients to the right specialty and schedules the visit.',
    stack: ['JavaScript', 'Node.js', 'Express'],
    year: '2026',
    href: 'https://github.com/PrajyotXDev/Medi-Guide',
  },
  {
    name: 'Planet Simulation',
    description: 'Real-time gravitational orbits of the inner solar system, with trails.',
    stack: ['Python', 'Pygame'],
    year: '2026',
    href: 'https://github.com/PrajyotXDev/PLANET-SIMULATION',
  },
  {
    name: 'The Arcadia',
    description: 'Where game development started — my first game project.',
    stack: ['Game'],
    year: '2026',
    href: 'https://github.com/PrajyotXDev/THE-ARCADIA',
  },
];

/**
 * Only list technologies you have actually used.
 * `usedIn` drives the cross-highlighting in the Arsenal section; leave it empty
 * for tools that are part of the daily workflow rather than a single project.
 */
export const arsenal: TechGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'C', usedIn: [] },
      { name: 'C++', usedIn: ['Black Hole Simulation'] },
      { name: 'Python', usedIn: ['VoiceShield', 'NeuroScope 3D', 'Data Speaks', 'Planet Simulation'] },
      { name: 'JavaScript', usedIn: ['IIT Dharwad Merch Store', 'VoiceShield', 'Medi-Guide'] },
      { name: 'TypeScript', usedIn: ['NeuroScope 3D', 'Bithunt', 'This site'] },
      { name: 'C#', usedIn: ['RealmShift Odyssey'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'HTML', usedIn: ['IIT Dharwad Merch Store', 'Medi-Guide'] },
      { name: 'CSS', usedIn: ['IIT Dharwad Merch Store', 'Medi-Guide', 'This site'] },
      { name: 'React', usedIn: ['ManhwaMatch', 'Bithunt', 'This site'] },
      { name: 'Next.js', usedIn: ['ManhwaMatch', 'Bithunt', 'This site'] },
      { name: 'Tailwind CSS', usedIn: ['ManhwaMatch', 'Bithunt', 'This site'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', usedIn: ['IIT Dharwad Merch Store', 'Medi-Guide'] },
      { name: 'Express', usedIn: ['IIT Dharwad Merch Store', 'Medi-Guide'] },
      { name: 'REST APIs', usedIn: ['IIT Dharwad Merch Store', 'VoiceShield'] },
      { name: 'FastAPI', usedIn: ['VoiceShield'] },
    ],
  },
  {
    id: 'data',
    label: 'Data & ML',
    items: [
      { name: 'PostgreSQL', usedIn: ['IIT Dharwad Merch Store'] },
      { name: 'Supabase', usedIn: ['IIT Dharwad Merch Store'] },
      { name: 'PyTorch', usedIn: ['VoiceShield', 'NeuroScope 3D'] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git', usedIn: [] },
      { name: 'GitHub', usedIn: [] },
      { name: 'VS Code', usedIn: [] },
      { name: 'Linux', usedIn: [] },
      { name: 'Vercel', usedIn: ['IIT Dharwad Merch Store', 'NeuroScope 3D', 'Bithunt', 'Data Speaks', 'This site'] },
    ],
  },
  {
    id: 'games',
    label: 'Game development',
    items: [{ name: 'Unity', usedIn: ['RealmShift Odyssey'] }],
  },
];

/** Every project name referenced by `arsenal[].items[].usedIn`, in display order. */
export const arsenalProjects = [
  'IIT Dharwad Merch Store',
  'VoiceShield',
  'NeuroScope 3D',
  'RealmShift Odyssey',
  'Bithunt',
  'ManhwaMatch',
  'Black Hole Simulation',
  'Data Speaks',
  'Medi-Guide',
  'Planet Simulation',
  'This site',
] as const;

export const journey: Milestone[] = [
  {
    date: 'Present',
    title: 'Mathematics & Computing',
    org: 'Indian Institute of Technology Dharwad',
    body: 'Studying the mathematics underneath computing, and building alongside it rather than after it.',
  },
  {
    date: '2026',
    title: 'Smart India Hackathon 2026',
    org: 'Team Rocket · Problem statement SIH26104',
    body: 'Built VoiceShield with the team — window-level voice-deepfake detection with an evidence-first dashboard.',
    link: { label: 'VoiceShield', href: 'https://github.com/PrajyotXDev/SIH26104-TeamRocket-VoiceShield' },
  },
  {
    date: '2026',
    title: 'Bithunt frontend',
    org: 'Team Parsec · IIT Dharwad',
    body: 'Built the landing site for Team Parsec’s competitive-programming event.',
    link: { label: 'Live site', href: 'https://bithunt-delta.vercel.app' },
  },
  {
    date: null,
    title: 'Secretary General',
    org: 'National Service Scheme · IIT Dharwad',
    body: 'Coordination, events, outreach and volunteer leadership.',
  },
  {
    date: null,
    title: 'Coding Club',
    org: 'IIT Dharwad',
    body: 'Software, Unity and C#, and building collaboratively on GitHub.',
  },
  {
    date: null,
    title: 'Astral Explorers',
    org: 'IIT Dharwad',
    body: 'Telescope operation, observation sessions and scientific exploration.',
  },
];

export const beyond: Curiosity[] = [
  {
    title: 'The night sky',
    body: 'Operating telescopes with Astral Explorers — and ray tracing a black hole in C++ to see gravitational lensing for myself.',
    link: { label: 'Black Hole Simulation', href: 'https://github.com/PrajyotXDev/BLACK-HOLE-SIMULATION' },
  },
  {
    title: 'Games as systems',
    body: 'Game development is where design, mathematics and engineering meet. It started with The Arcadia and continued into RealmShift Odyssey.',
    link: { label: 'The Arcadia', href: 'https://github.com/PrajyotXDev/THE-ARCADIA' },
  },
  {
    title: 'Simulating things',
    body: 'Orbits, gravity, light. If a system can be written as an equation, I want to watch it run.',
    link: { label: 'Planet Simulation', href: 'https://github.com/PrajyotXDev/PLANET-SIMULATION' },
  },
  {
    title: 'Stories, serialised',
    body: 'A recommender for manhwa: answer a short quiz, get a reading list. Finding the next good one is its own problem.',
    link: { label: 'ManhwaMatch', href: 'https://github.com/PrajyotXDev/THE-MANHWA-MATCH' },
  },
  {
    title: 'Showing up',
    body: 'Volunteering and organising through the National Service Scheme — the part of college that has nothing to do with a compiler.',
  },
];

export const contact = {
  headline: ['Have an interesting idea?', 'Let’s build something remarkable.'],
  note: 'Internships, research, hackathon teams or a project that needs one more pair of hands — I read everything.',
};
