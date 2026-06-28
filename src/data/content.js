// All editable site content lives here.
// Update this file to change text, links, or projects — no need to touch components.

export const HERO = {
  terminalPrompt: 'whoami',
  nameAccent: 'Ashiq',
  headingRest: ' — I build backends,\ninterfaces, and Android apps.',
  subtitle:
    'Full-stack engineer covering backend, frontend, and mobile — Spring Boot APIs, ' +
    'web interfaces, and native Android apps, built and shipped end to end.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  secondaryCta: { label: "See what I've shipped", href: '#work' },
}

export const STATUS_BAR = {
  availability: 'available for freelance work',
  navLinks: [
    { label: 'stack', href: '#stack' },
    { label: 'work', href: '#work' },
    { label: 'contact', href: '#contact' },
  ],
}

export const PILLARS = [
  {
    tag: 'Backend',
    title: 'APIs & Services',
    desc: 'REST APIs, auth, database design, and integrations built with Spring Boot.',
    chips: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL', 'REST'],
  },
  {
    tag: 'Frontend',
    title: 'Web Interfaces',
    desc: 'Functional, clean UIs that connect cleanly to a real backend.',
    chips: ['React', 'HTML/CSS', 'JavaScript'],
  },
  {
    tag: 'Mobile',
    title: 'Mobile App Development',
    desc: 'Android apps built and published end to end, store-ready.',
    chips: ['Kotlin', 'Java', 'Android SDK', 'Play Store'],
  },
]

export const PROJECTS = [
  {
    id: 'tracksy',
    title: 'Tracksy',
    status: 'live', // 'live' | 'local'
    statusLabel: 'live on play store',
    desc:
      'An expense tracker Android app — biometric lock, CSV export, and usage analytics. ' +
      'Built, published, and maintained independently under my own dev account.',
    chips: ['Kotlin', 'Android'],
    link: 'https://play.google.com/store/apps/details?id=com.tracksy.app',
    linkLabel: 'Play Store →',
  },
  {
    id: 'user-management-system',
    title: 'User Management System',
    status: 'local',
    statusLabel: 'repo',
    desc:
      'Full-stack CRUD application — Spring Boot REST API on the backend, React on the ' +
      'frontend, MySQL for storage. Endpoints tested with Postman.',
    chips: ['Spring Boot', 'React', 'MySQL'],
    link: 'https://github.com/ashiqy04',
    linkLabel: 'GitHub →',
  },
]

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
