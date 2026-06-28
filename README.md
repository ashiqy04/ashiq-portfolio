# Portfolio

React + Vite portfolio site.

## Architecture

```
portfolio-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        ← one component per file, presentational only
│   │   ├── StatusBar.jsx
│   │   ├── Hero.jsx
│   │   ├── Pillars.jsx
│   │   ├── Work.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── content.js     ← ALL editable text/links live here
│   ├── hooks/
│   │   └── useTypingEffect.js   ← hero typing animation logic
│   ├── App.jsx             ← composes components, no content/logic
│   ├── main.jsx            ← React entry point (mounts App into #root)
│   └── index.css           ← global styles, design tokens as CSS vars
├── index.html              ← Vite entry HTML, loads /src/main.jsx
├── package.json
├── vite.config.js
└── .gitignore
```

**Data flow:** `content.js` → imported by components → rendered by `App.jsx`.
To change any text, link, project, or contact info, edit `src/data/content.js` only —
you should not need to touch component files for content changes.

**Component responsibility:**
- `StatusBar` — sticky top nav with availability indicator
- `Hero` — animated intro headline (uses `useTypingEffect` hook)
- `Pillars` — three capability cards (Backend / Frontend / Mobile)
- `Work` — renders list of `ProjectCard`s from `PROJECTS` data
- `ProjectCard` — single reusable project entry (status pill, links, tags)
- `Contact` — contact cards (GitHub / Email / LinkedIn)
- `Footer` — closing tagline

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Vercel auto-detects Vite. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

No environment variables or config needed — it's a fully static build.

## Editing content

Open `src/data/content.js`. Everything is plain JS objects/arrays:

- `HERO` — headline, subtitle, button labels/links
- `STATUS_BAR` — top nav text and links
- `PILLARS` — the three capability cards
- `PROJECTS` — project cards (add a new object to the array to add a project)
- `CONTACT` — contact cards at the bottom
- `FOOTER_TEXT` — closing line

Update your real email and LinkedIn handle in `CONTACT.cards` before deploying.

