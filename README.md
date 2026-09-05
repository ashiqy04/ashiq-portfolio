# Ashiq — Portfolio

React + Vite portfolio and blog, backed by Firebase (Firestore + Auth). Projects,
work experience, capabilities, and blog posts are all editable through a private
admin dashboard — no code changes needed to update content, no server to host or
maintain.

**Live:** [ashiq.vercel.app](https://ashiq.vercel.app)

## Tech stack

- **React 18 + Vite** — frontend
- **React Router** — client-side routing, lazy-loaded per page
- **Firestore** — projects, blog posts, capabilities, work experience
- **Firebase Auth (Google Sign-In)** — single admin login, no passwords
- **Firestore Security Rules** — enforce "only I can edit this" server-side
- **react-markdown + react-syntax-highlighter** — blog post rendering with
  syntax-highlighted code blocks
- **Vercel** — hosting, auto-deploys on push to `main`

## Features

- Public site: hero, capabilities ("Stack"), work experience, projects, blog,
  contact — all responsive, dark terminal-style theme
- `/admin` dashboard (Google Sign-In protected): full CRUD for projects, blog
  posts, capabilities, and work experience
- Blog: Markdown posts with syntax-highlighted code blocks, copy-to-clipboard,
  reading time, cover images, draft/published state
- Per-page SEO: dynamic `<title>`, description, and Open Graph tags per route
- 404 page, `robots.txt`, `sitemap.xml`
- Everything falls back gracefully to static defaults if Firestore is
  unreachable — the site never fully breaks

## Project structure

```
ashiq-portfolio-main/
├── public/
│   ├── blog-covers/         ← static cover images referenced by relative path
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/          ← presentational components
│   │   ├── Layout.jsx       ← shared StatusBar + Footer wrapper
│   │   ├── Hero.jsx
│   │   ├── Pillars.jsx      ← "Stack" section, fetches from Firestore
│   │   ├── Experience.jsx   ← work history, fetches from Firestore
│   │   ├── Work.jsx         ← projects, fetches from Firestore
│   │   ├── ProjectCard.jsx
│   │   ├── VultraTeaser.jsx
│   │   ├── Contact.jsx
│   │   ├── CodeBlock.jsx    ← syntax highlighting + copy button for blog code
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx   ← Projects / Posts / Stack / Experience tabs
│   │   └── NotFound.jsx
│   ├── lib/
│   │   ├── firebase.js      ← Firebase app init
│   │   ├── projects.js      ← Firestore CRUD for projects
│   │   ├── posts.js         ← Firestore CRUD for blog posts
│   │   ├── stack.js         ← Firestore CRUD for capabilities
│   │   ├── experience.js    ← Firestore CRUD for work history
│   │   ├── techIcons.js     ← maps tech tag text → brand icon
│   │   ├── readingTime.js
│   │   └── useDocumentMeta.js   ← per-page title/OG tag hook
│   ├── context/
│   │   └── AuthContext.jsx  ← Firebase Auth state
│   ├── data/
│   │   └── content.js       ← static fallback content + Hero/Contact copy
│   ├── App.jsx               ← routes (lazy-loaded)
│   └── main.jsx
├── firestore.rules           ← deploy this in Firebase Console → Firestore → Rules
├── FIREBASE_SETUP.md          ← full Firebase setup walkthrough
├── .env.example
└── vercel.json                ← SPA rewrite for client-side routing
```

## Getting started

```bash
npm install
cp .env.example .env    # fill in your Firebase config — see FIREBASE_SETUP.md
npm run dev
```

Open http://localhost:5173.

First-time Firebase setup (Firestore, Auth, security rules) is documented step
by step in [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md) — do that before running
locally, or the site will just show empty/fallback content everywhere.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

## Managing content

Once Firebase is set up and you're signed in at `/admin`:

- **Projects, Blog posts, Stack, Experience** — all managed from the admin
  dashboard tabs. No code changes, no redeploy needed — Firestore updates are
  live immediately.
- **Hero headline, Contact links, footer text** — these rarely change, so
  they're still plain static content in `src/data/content.js`. Edit that file
  and redeploy if you need to change them.
- **Resume** — linked from the Hero section directly via GitHub's raw content
  URL (`public/resume/...` in this repo), not bundled into the build. Replace
  that file and push to update it — no app rebuild required.

## Deploying

Hosted on Vercel, auto-deploys on push to `main`.

Environment variables (`VITE_FIREBASE_*`, see `.env.example`) must be set in
**Vercel → Project Settings → Environments → Production** — they're baked in
at build time, so adding/changing them requires a redeploy to take effect.

`vercel.json` handles the SPA rewrite so client-side routes like `/blog` and
`/admin` don't 404 on a hard refresh.
