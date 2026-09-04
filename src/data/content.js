// All editable text, links, and static fallback data live here.
// Projects and blog posts are normally fetched live from Firestore (see src/lib/projects.js and src/lib/posts.js) —
// PROJECTS below is only used as an offline fallback if the API is unreachable.

export const STATUS_BAR = {
  availability: 'available for freelance work',
  navLinks: [
    { label: 'stack', href: '/#stack' },
    { label: 'experience', href: '/#experience' },
    { label: 'work', href: '/#work' },
    { label: 'blog', href: '/blog' },
    { label: 'contact', href: '/#contact' },
  ],
}

export const HERO = {
  terminalPrompt: 'whoami',
  nameAccent: 'Ashiq',
  headingRest: ' — I build backends,\ninterfaces, and Android apps.',
  subtitle:
    'Full-stack engineer covering backend, frontend, and mobile — Spring Boot APIs, ' +
    'web interfaces, and native Android apps, built and shipped end to end.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  secondaryCta: { label: "See what I've shipped", href: '#work' },
  // Served straight from the GitHub repo's public/ folder (raw.githubusercontent.com),
  // not bundled into the build. Update the resume by replacing the file in the repo
  // and pushing — no app redeploy needed for the new version to go live.
  resumeCta: {
    label: 'Download Resume',
    href: 'https://raw.githubusercontent.com/ashiqy04/ashiq-portfolio/main/public/resume/Ashiq-Y-Resume.pdf',
  },
}

export const PILLARS = [
  {
    category: 'Backend',
    title: 'APIs & Services',
    desc: 'REST APIs, auth, database design, and integrations built with Spring Boot.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL', 'REST'],
  },
  {
    category: 'Frontend',
    title: 'Web Interfaces',
    desc: 'Functional, clean UIs that connect cleanly to a real backend.',
    tags: ['React', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Mobile',
    title: 'Mobile App Development',
    desc: 'Android apps built and published end to end, store-ready.',
    tags: ['Kotlin', 'Java', 'Android SDK', 'Play Store'],
  },
]

// Fallback only — the live list comes from GET /api/projects.
export const PROJECTS = [
  {
    id: 'tracksy',
    title: 'Tracksy',
    status: 'live',
    statusLabel: 'live on play store',
    desc: 'An expense tracker Android app — biometric lock, CSV export, and usage analytics. Built, published, and maintained independently under my own dev account.',
    chips: ['Kotlin', 'Android'],
    link: 'https://play.google.com/store/apps/details?id=com.tracksy.app',
    linkLabel: 'Play Store →',
  },
  {
    id: 'user-management-system',
    title: 'User Management System',
    status: 'local',
    statusLabel: 'repo',
    desc: 'Full-stack CRUD application — Spring Boot REST API on the backend, React on the frontend, MySQL for storage. Endpoints tested with Postman.',
    chips: ['Spring Boot', 'React', 'MySQL'],
    link: 'https://github.com/ashiqy04',
    linkLabel: 'GitHub →',
  },
]

export const VULTRA = {
  label: 'currently building',
  title: 'Vultra',
  desc: 'An early-stage company I\'m building — more soon. Following along? Check the blog for build-in-public updates.',
  cta: { label: 'Follow the build →', href: '/blog' },
}

export const CONTACT = {
  heading: "Let's build something",
  subtitle: 'Open to freelance and contract work across backend, frontend, and mobile.',
  cards: [
    { label: 'GitHub', value: '@ashiqy04', href: 'https://github.com/ashiqy04' },
    { label: 'Email', value: 'ashiq.dev.apps@gmail.com', href: 'mailto:ashiq.dev.apps@gmail.com' },
    { label: 'LinkedIn', value: '/in/ashiqy04', href: 'https://linkedin.com/in/ashiqy04' },
  ],
}

export const FOOTER_TEXT = 'built end to end — backend, frontend, mobile — and a fair amount of coffee'
