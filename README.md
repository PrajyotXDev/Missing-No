# Prajyot Satarde — Developer Portfolio

A production-minded personal portfolio built with **Next.js, React, TypeScript and server-side API routes**.

## Highlights

- Responsive portfolio with sections for About, Experience, Projects, Skills, GitHub and Contact.
- Live GitHub profile/repository data fetched server-side with caching.
- Project data exposed through `/api/projects` so content can evolve without rewriting the page.
- Contact API with validation and optional **Resend** delivery.
- Accessible navigation and external links with safe `rel` attributes.
- Production metadata, Open Graph/Twitter metadata, viewport configuration and robots directives.
- Vercel-friendly Next.js app with environment-variable configuration.

## Stack

- Next.js 15
- React 18
- TypeScript
- Lucide React
- CSS with responsive layouts and a dark editorial/neon visual system

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local`:

```env
GITHUB_USERNAME=PrajyotXDev
GITHUB_TOKEN=
CONTACT_TO=
RESEND_API_KEY=
CONTACT_FROM=Portfolio <onboarding@resend.dev>
```

`GITHUB_TOKEN` is optional. The contact endpoint works safely without Resend configured, but it will not claim a message was delivered. For production delivery, configure `RESEND_API_KEY`, `CONTACT_TO`, and a valid sender domain/address in your Resend account.

## Deploy on Vercel

Import `PrajyotXDev/Missing-No` into Vercel, keep the framework preset as **Next.js**, and add the environment variables from `.env.local` in the Vercel project settings. Then deploy.

## Project structure

```text
app/
├── api/
│   ├── contact/route.ts
│   ├── github/route.ts
│   └── projects/route.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

## Notes

Project and experience claims should be kept aligned with Prajyot's actual work as the portfolio evolves. The GitHub section is intentionally live so repository activity stays current.
