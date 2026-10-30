'use client';

import { useState } from 'react';
import { ArrowUpRight, Code2, Cpu, Gamepad2, Layers, Sparkles } from 'lucide-react';

const showcases = [
  { id: 'systems', number: '01', label: 'SYSTEMS THINKING', title: 'Make complexity\nfeel simple.', copy: 'I like finding the structure underneath a messy problem, then turning it into something people can actually use.', stack: ['Logic', 'Architecture', 'Iteration'], icon: Layers, color: 'violet' },
  { id: 'products', number: '02', label: 'PRODUCT ENGINEERING', title: 'From blank page\nto shipped product.', copy: 'Interfaces, APIs, data and the details between them. I care about the whole experience, not just the screenshot.', stack: ['Next.js', 'TypeScript', 'UX'], icon: Code2, color: 'lime' },
  { id: 'experiments', number: '03', label: 'TECH EXPERIMENTS', title: 'Curiosity is the\nwhole point.', copy: 'AI prototypes, game mechanics, robotics and weird little experiments that teach me something new.', stack: ['AI / ML', 'Unity', 'Prototyping'], icon: Cpu, color: 'cyan' },
];

export default function BuildLab() {
  const [active, setActive] = useState(0);
  const item = showcases[active];
  const Icon = item.icon;
  return (
    <section className="buildlab" aria-label="Interactive build philosophy">
      <div className="buildlab-top"><span>INTERACTIVE FIELD NOTES / 001</span><span><i /> LIVE SYSTEM</span></div>
      <div className="buildlab-grid">
        <div className="buildlab-copy">
          <div className="buildlab-kicker"><Sparkles size={14} /> THE WAY I BUILD</div>
          <h2>NOT JUST<br /><em>ANOTHER</em><br />DEVELOPER.</h2>
          <p className="buildlab-lead">A little logic. A lot of curiosity. An unreasonable urge to make things work beautifully.</p>
          <div className="buildlab-tabs" role="tablist" aria-label="Build philosophy">
            {showcases.map((s, i) => <button key={s.id} role="tab" aria-selected={active === i} className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span>{s.number}</span>{s.label}</button>)}
          </div>
        </div>
        <div className={'buildlab-stage tone-' + item.color}>
          <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" /><div className="stage-orbit orbit-three" />
          <div className="stage-crosshair">X / Y / Z</div>
          <div className="stage-index">{item.number} <span>— PRAJYOT.SYS</span></div>
          <div className="stage-core"><div className="core-inner"><Icon size={48} strokeWidth={1.2} /></div><div className="core-ring" /></div>
          <div className="stage-caption"><span>{item.label}</span><b>0{active + 1} / 03</b></div>
          <div className="stage-bottom"><strong>{item.title.split('\n').join(' ')}</strong><p>{item.copy}</p><div className="stage-tags">{item.stack.map(t => <span key={t}>{t}</span>)}</div></div>
          <div className="stage-glow" />
        </div>
      </div>
      <div className="buildlab-foot"><span>DESIGN IS HOW IT FEELS.</span><span>ENGINEERING IS HOW IT WORKS.</span><span>01—03</span></div>
    </section>
  );
}
