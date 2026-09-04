# Prajyot Satarde — Full-Stack Portfolio

A modern full-stack developer portfolio built with **Next.js 14, React, TypeScript and API routes**.

## What changed
- Converted the static single-file portfolio into a real Next.js app.
- Added responsive navigation and redesigned sections while retaining the original dark neon aesthetic.
- Added `/api/projects` for server-backed portfolio project data.
- Added `/api/github` for live GitHub profile/repository metrics with caching.
- Added `/api/contact` with request validation for the contact form.
- Added responsive mobile layout.
- Added real project links for ManhwaMatch, VoiceShield and this repository.

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables
Create `.env.local` when deploying:
```env
GITHUB_USERNAME=PrajyotXDev
# Optional: raises GitHub API limits
GITHUB_TOKEN=your_github_token
```

## Production contact delivery
The contact endpoint is intentionally provider-neutral. Connect `/api/contact` to Resend, Formspree, Supabase, a database, or another mail service before production so submitted messages are actually delivered/stored.
