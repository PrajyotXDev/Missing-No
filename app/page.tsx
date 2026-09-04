'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, X, ExternalLink, Star, GitFork, Sparkles } from 'lucide-react';

type Project = { id: string; title: string; category: string; description: string; tags: string[]; github: string; demo: string };
type GitHubData = { profile: { login: string; avatar_url: string; public_repos: number; followers: number; html_url: string }; repos: { name: string; description: string | null; html_url: string; language: string | null; stars: number; forks: number; updated_at: string }[] };

const fallbackProjects: Project[] = [
  { id: 'realmshift', title: 'RealmShift Odyssey', category: 'Game Development', description: 'Dark-fantasy 2D adventure with exploration, combat, progression and a scythe-driven upgrade loop.', tags: ['Unity', 'C#', 'Game Design'], github: 'https://github.com/PrajyotXDev', demo: '' },
  { id: 'manhwamatch', title: 'ManhwaMatch', category: 'Full Stack', description: 'Recommendation-focused web experience built around modern React/Next.js patterns and external data.', tags: ['Next.js', 'React', 'TypeScript', 'API'], github: 'https://github.com/prajyot33/manhwa-match', demo: 'https://manhwamatch.vercel.app/' },
  { id: 'voiceshield', title: 'VoiceShield', category: 'AI / Hackathon', description: 'AI-focused prototype designed around safer voice interactions and practical user workflows.', tags: ['AI', 'JavaScript', 'Product'], github: 'https://github.com/PrajyotXDev/SIH26104-TeamRocket-VoiceShield', demo: 'https://sih26104-teamrocket-voiceshield.onrender.com/#home' },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/projects').then(r => r.ok ? r.json() : null).then(d => d?.projects && setProjects(d.projects)).catch(() => {});
    fetch('/api/github').then(r => r.ok ? r.json() : null).then(d => d && setGithub(d)).catch(() => {});
  }, []);

  const featuredRepos = useMemo(() => github?.repos ?? [], [github]);

  async function submitContact(e: FormEvent) {
    e.preventDefault(); setStatus('Sending…');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contact) });
    const data = await res.json(); setStatus(res.ok ? 'Message accepted — connect this route to your mail provider before production.' : (data.error ?? 'Something went wrong.'));
    if (res.ok) setContact({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <main>
      <nav className="nav"><a className="brand" href="#top">PS<span>/26</span></a><div className={`nav-links ${mobileOpen ? 'open' : ''}`}><a href="#about" onClick={() => setMobileOpen(false)}>About</a><a href="#experience" onClick={() => setMobileOpen(false)}>Experience</a><a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a><a href="#skills" onClick={() => setMobileOpen(false)}>Skills</a><a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a></div><button className="menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button></nav>

      <section className="hero" id="top"><div className="hero-glow"/><div className="hero-copy"><div className="eyebrow">IIT DHARWAD / MATHEMATICS & COMPUTING</div><h1>Prajyot<span>Satarde</span></h1><p className="hero-desc">Student. Builder. Volunteer. I like turning ideas into real products across <b>AI, full-stack development, games, robotics and astronomy.</b></p><div className="hero-actions"><a className="btn primary" href="#projects">Explore Work <ArrowUpRight size={15}/></a><a className="btn" href="#contact">Let's Talk <Mail size={15}/></a></div><div className="hero-meta"><span><MapPin size={13}/> IIT Dharwad</span><span>Open to internships & research</span></div></div><div className="hero-card"><div className="terminal"><span>root@prajyot</span> <i>~</i> <b>$ whoami</b></div><div className="profile"><div className="avatar">PS</div><div><div className="profile-name">Prajyot Satarde</div><div className="profile-role">MATHEMATICS & COMPUTING / IIT DHARWAD</div></div></div><div className="code-lines"><p><em>focus</em>: AI + software + systems</p><p><em>ships</em>: web apps + games + prototypes</p><p><em>builds</em>: with curiosity and intent</p><p><em>status</em>: <strong>online</strong></p></div><div className="socials"><a href="https://www.linkedin.com/in/prajyot-satarde-41064736b/" target="_blank"><Linkedin size={16}/></a><a href="https://github.com/PrajyotXDev" target="_blank"><Github size={16}/></a><a href="mailto:your.email@example.com"><Mail size={16}/></a></div></div></section>

      <section className="ticker"><span>AVAILABLE FOR</span><b>SOFTWARE DEVELOPMENT</b><b>AI/ML</b><b>GAME DEVELOPMENT</b><b>HACKATHONS</b><b>RESEARCH</b></section>

      <section className="section" id="about"><div className="section-head"><span>01</span><h2>About</h2></div><div className="about-grid"><div className="glass copy-card"><div className="kicker">PERSONAL OPERATING SYSTEM</div><h3>Building at the intersection of mathematical thinking and practical engineering.</h3><p>I am a Mathematics and Computing student at IIT Dharwad who enjoys learning deeply, shipping quickly, and collaborating on projects that are useful to real people.</p><p>My interests move between technical depth and creative building: AI/ML, full-stack systems, game development, robotics and astronomy.</p><div className="about-pills"><span>NSS Secretary General</span><span>Coding Club</span><span>Astral Explorers</span><span>Student Wellness</span></div></div><div className="stats"><div className="stat glass"><strong>{github?.followers ? `${github.followers}+` : '500+'}</strong><small>Professional Network</small></div><div className="stat glass"><strong>IIT</strong><small>Dharwad</small></div><div className="stat glass"><strong>4+</strong><small>Leadership / Club Roles</small></div><div className="stat glass"><strong>∞</strong><small>Things I Want To Build</small></div></div></div></section>

      <section className="section" id="experience"><div className="section-head"><span>02</span><h2>Experience</h2></div><div className="experience-list"><article><span className="date">2026 — NOW</span><div><h3>NSS Secretary General</h3><p>IIT Dharwad / National Service Scheme</p><small>Coordination · Events · Outreach · Volunteer leadership</small></div></article><article><span className="date">2026 — NOW</span><div><h3>Deputy Wellness Representative</h3><p>Student Wellness / IIT Dharwad</p><small>Peer support · Awareness · Student wellbeing initiatives</small></div></article><article><span className="date">2026 — NOW</span><div><h3>Coding Club Member</h3><p>IIT Dharwad</p><small>Unity · C# · GitHub · Software and game development</small></div></article><article><span className="date">2025 — NOW</span><div><h3>Astral Explorers Member</h3><p>Astronomy Club / IIT Dharwad</p><small>Telescope operation · Observation · Scientific exploration</small></div></article></div></section>

      <section className="section" id="projects"><div className="section-head"><span>03</span><h2>Selected Work</h2></div><div className="project-grid">{projects.map((p, i) => <article className="project-card glass" key={p.id}><div className="project-top"><span>0{i + 1}</span><span>{p.category}</span></div><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><a href={p.github} target="_blank">GitHub <Github size={14}/></a>{p.demo ? <a href={p.demo} target="_blank">Live <ExternalLink size={14}/></a> : null}</div></article>)}</div></section>

      <section className="section" id="skills"><div className="section-head"><span>04</span><h2>Skills</h2></div><div className="skills-grid"><div className="glass skill-card"><h3>Programming</h3><div className="skill"><span>C++</span><b>90</b></div><div className="skill"><span>Python</span><b>90</b></div><div className="skill"><span>JavaScript / TypeScript</span><b>75</b></div><div className="skill"><span>C#</span><b>68</b></div></div><div className="glass skill-card"><h3>Development</h3><div className="skill"><span>React / Next.js</span><b>80</b></div><div className="skill"><span>HTML / CSS</span><b>90</b></div><div className="skill"><span>Unity</span><b>74</b></div><div className="skill"><span>Git / GitHub</span><b>90</b></div></div><div className="glass skill-card"><h3>Domains</h3><div className="skill"><span>AI / ML</span><b>70</b></div><div className="skill"><span>Game Development</span><b>90</b></div><div className="skill"><span>Robotics</span><b>66</b></div><div className="skill"><span>Astronomy</span><b>73</b></div></div></div></section>

      <section className="section" id="github"><div className="section-head"><span>05</span><h2>GitHub Signal</h2></div><div className="github-grid"><div className="glass github-stat"><Github size={20}/><strong>{github?.profile.public_repos ?? '—'}</strong><span>Public Repositories</span></div><div className="glass github-stat"><Star size={20}/><strong>{featuredRepos.reduce((a, r) => a + r.stars, 0)}</strong><span>Stars in Recent Repos</span></div><div className="glass github-stat"><GitFork size={20}/><strong>{featuredRepos.reduce((a, r) => a + r.forks, 0)}</strong><span>Forks in Recent Repos</span></div></div><div className="repo-list">{featuredRepos.slice(0, 5).map(r => <a className="repo-row" href={r.html_url} target="_blank" key={r.name}><div><b>{r.name}</b><span>{r.description || 'No description'}</span></div><aside>{r.language || 'Code'} · ★ {r.stars}</aside></a>)}</div></section>

      <section className="section" id="contact"><div className="section-head"><span>06</span><h2>Let's Connect</h2></div><div className="contact-grid"><div className="glass contact-copy"><div className="kicker">BUILD / COLLABORATE / RESEARCH</div><h3>Have an idea worth building?</h3><p>I’m open to internships, research, software projects, AI/ML work, game development, hackathons and ambitious student teams.</p><div className="contact-links"><a href="https://www.linkedin.com/in/prajyot-satarde-41064736b/" target="_blank"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={14}/></a><a href="https://github.com/PrajyotXDev" target="_blank"><Github size={16}/> GitHub <ArrowUpRight size={14}/></a></div></div><form className="glass contact-form" onSubmit={submitContact}><input placeholder="Your name" value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} required/><input type="email" placeholder="Your email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} required/><input placeholder="Subject" value={contact.subject} onChange={e => setContact({...contact, subject: e.target.value})}/><textarea placeholder="Tell me what you're building…" value={contact.message} onChange={e => setContact({...contact, message: e.target.value})} required/><button className="btn primary" type="submit">Send Message <Sparkles size={15}/></button>{status && <small className="form-status">{status}</small>}</form></div></section>

      <footer><span>© 2026 PRAJYOT SATARDE</span><span>IIT DHARWAD / MATH & COMPUTING</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
