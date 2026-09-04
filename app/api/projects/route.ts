import { NextResponse } from 'next/server';

const projects = [
  { id: 'realmshift', title: 'RealmShift Odyssey', category: 'Game Development', description: 'Dark-fantasy 2D adventure with exploration, combat, progression, enemies and a scythe-driven upgrade loop.', tags: ['Unity','C#','Game Design'], github: 'https://github.com/PrajyotXDev', demo: '' },
  { id: 'manhwamatch', title: 'ManhwaMatch', category: 'Full Stack', description: 'Recommendation-focused web experience using modern React/Next.js patterns and external anime/manhwa data.', tags: ['Next.js','React','TypeScript','API'], github: 'https://github.com/prajyot33/manhwa-match', demo: 'https://manhwamatch.vercel.app/' },
  { id: 'voiceshield', title: 'VoiceShield', category: 'AI / Hackathon', description: 'AI-focused prototype designed around safer voice interactions and practical user workflows.', tags: ['AI','JavaScript','Product'], github: 'https://github.com/PrajyotXDev/SIH26104-TeamRocket-VoiceShield', demo: 'https://sih26104-teamrocket-voiceshield.onrender.com/#home' },
  { id: 'portfolio', title: 'This Portfolio', category: 'Full Stack', description: 'Personal developer portfolio rebuilt as a full-stack Next.js app with live GitHub data and a backend contact API.', tags: ['Next.js','API Routes','GitHub'], github: 'https://github.com/PrajyotXDev/Missing-No', demo: '' },
];

export async function GET() { return NextResponse.json({ projects }); }
