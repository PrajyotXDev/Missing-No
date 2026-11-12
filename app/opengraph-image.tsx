import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#0a0a0b',
          color: '#f2efe8',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#a09c93', letterSpacing: 3 }}>
          <span>{`${site.programme.toUpperCase()} / ${site.institute.toUpperCase()}`}</span>
          <span>{site.coordinates}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 190, fontWeight: 600, letterSpacing: -10, lineHeight: 0.9 }}>
            {site.firstName}
          </div>
          <div style={{ display: 'flex', fontSize: 190, fontWeight: 600, letterSpacing: -10, lineHeight: 0.9, paddingLeft: 150 }}>
            {site.lastName}
            <span style={{ color: '#ff5b1f' }}>.</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(242,239,232,0.18)',
            paddingTop: 28,
            fontSize: 30,
          }}
        >
          <span>{site.tagline}</span>
          <span style={{ color: '#a09c93', fontSize: 24 }}>Software · Systems · AI</span>
        </div>
      </div>
    ),
    size,
  );
}
