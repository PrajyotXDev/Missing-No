# Prajyot Satarde — Portfolio

Personal site for Prajyot Satarde, Mathematics & Computing student at IIT Dharwad.

Built with **Next.js 15 (App Router), React, TypeScript and Tailwind CSS v4**, with Motion for
scroll-linked animation, Lenis for smooth scrolling, and a hand-written WebGL point field in the hero
(no 3D library).

## Editing content

Everything the site says lives in one typed file: [`content/site.ts`](content/site.ts).

- Any field set to `null` (a project year, a timeline date, a repository link) renders a visible
  **"— to add"** marker on the page. Fill the value in and the marker disappears.
- `arsenal[].items[].usedIn` drives the cross-highlighting in the Technical Arsenal section. List only
  technologies you have actually used.
- Project figures are SVG diagrams in `components/sections/ProjectPlate.tsx`. To use real screenshots,
  replace `<ProjectPlate />` in `components/sections/Work.tsx` with a `next/image`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Before deploying:

```bash
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, Open Graph and the sitemap. |
| `RESEND_API_KEY`, `CONTACT_TO` | Enable server-side delivery of the contact form through Resend. |
| `CONTACT_FROM` | Sender shown on delivered messages. |

Without `RESEND_API_KEY` and `CONTACT_TO`, the contact form does not pretend to send: it validates the
input and opens the visitor's mail app with the message filled in. With them set, it posts to
`/api/contact`, which validates, rate-limits, and filters bots with a honeypot and a minimum fill time.

## Structure

```text
app/
├── api/contact/route.ts     Contact delivery (Resend)
├── globals.css              Design tokens, type, motion, reduced-motion rules
├── layout.tsx               Fonts, metadata, JSON-LD, loader, skip link
├── opengraph-image.tsx      Generated social card
├── page.tsx                 Section composition
├── robots.ts / sitemap.ts
components/
├── hero/                    Hero + WebGL field
├── layout/                  Nav, footer
├── providers/               Smooth scroll + scroll-reveal observer
├── sections/                About, Work, Arsenal, Journey, Beyond, Contact
└── ui/                      Cursor, magnetic wrapper, section header, small primitives
content/site.ts              All copy and data
```

## Accessibility and motion

Semantic landmarks, a skip link, labelled form fields with inline errors, visible focus states and
keyboard-operable interactions throughout. With `prefers-reduced-motion`, smooth scrolling, the loader,
the cursor follower and scroll animations are disabled and the hero field renders a single still frame.
