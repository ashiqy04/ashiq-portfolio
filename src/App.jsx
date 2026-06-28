import { useState, useEffect, useRef } from 'react'

const NAME = 'Ashiq'
const TAGLINE = ' — I build backends,\ninterfaces, and Android apps.'
const HEADING_TEXT = NAME + TAGLINE

function Hero() {
  const [typed, setTyped] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const charIndex = useRef(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setTyped(HEADING_TEXT)
      setTypingDone(true)
      return
    }

    const timer = setInterval(() => {
      charIndex.current++
      setTyped(HEADING_TEXT.slice(0, charIndex.current))
      if (charIndex.current >= HEADING_TEXT.length) {
        clearInterval(timer)
        setTypingDone(true)
      }
    }, 28)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero">
      <div className="terminal-line">
        <span className="prompt">$</span> whoami
      </div>
      <h1 className={typingDone ? 'no-caret' : ''}>
        {typingDone ? (
          <>
            <span className="accent">{NAME}</span>
            {TAGLINE}
          </>
        ) : (
          typed
        )}
      </h1>
      <p className="sub">
        Full-stack engineer covering backend, frontend, and mobile — Spring Boot APIs,
        web interfaces, and native Android apps, built and shipped end to end.
      </p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#contact">Get in touch</a>
        <a className="btn btn-ghost" href="#work">See what I've shipped</a>
      </div>
    </section>
  )
}

function StatusBar() {
  return (
    <div className="statusbar">
      <div className="statusbar-inner">
        <div className="statusbar-availability"><span className="dot" />available for freelance work</div>
        <div className="statusbar-right">
          <a href="#stack">stack</a>
          <a href="#work">work</a>
          <a href="#contact">contact</a>
        </div>
      </div>
    </div>
  )
}

const pillars = [
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

function Pillars() {
  return (
    <section className="section" id="stack">
      <div className="section-label">capabilities</div>
      <h2 className="section-title">What I work across</h2>
      <div className="pillars">
        {pillars.map((p) => (
          <div className="pillar" key={p.title}>
            <div className="pillar-tag">{p.tag}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="chiplist">
              {p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const projects = [
  {
    title: 'Tracksy',
    status: 'live',
    statusLabel: 'live on play store',
    desc: 'An expense tracker Android app — biometric lock, CSV export, and usage analytics. Built, published, and maintained independently under my own dev account.',
    chips: ['Kotlin', 'Android'],
    link: 'https://play.google.com/store/apps/details?id=com.tracksy.app',
    linkLabel: 'Play Store →',
  },
  {
    title: 'User Management System',
    status: 'local',
    statusLabel: 'repo',
    desc: 'Full-stack CRUD application — Spring Boot REST API on the backend, React on the frontend, MySQL for storage. Endpoints tested with Postman.',
    chips: ['Spring Boot', 'React', 'MySQL'],
    link: 'https://github.com/ashiqy04',
    linkLabel: 'GitHub →',
  },
]

function Work() {
  return (
    <section className="section" id="work">
      <div className="section-label">shipped</div>
      <h2 className="section-title">Selected work</h2>
      {projects.map((p) => (
        <div className="project" key={p.title}>
          <div className="project-head">
            <div className="project-title">{p.title}</div>
            <span className={`status-pill status-${p.status}`}>{p.statusLabel}</span>
          </div>
          <p className="desc">{p.desc}</p>
          <div className="project-footer">
            <div className="chiplist">
              {p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
            </div>
            <div className="project-links">
              <a href={p.link} target="_blank" rel="noopener noreferrer">{p.linkLabel}</a>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="section-label">get in touch</div>
      <h2 className="section-title">Let's build something</h2>
      <p className="sub" style={{ marginBottom: 0 }}>
        Open to freelance and contract work across backend, frontend, and mobile.
      </p>
      <div className="contact-row">
        <div className="contact-card">
          <div className="label">GitHub</div>
          <div className="value"><a href="https://github.com/ashiqy04" target="_blank" rel="noopener noreferrer">@ashiqy04</a></div>
        </div>
        <div className="contact-card">
          <div className="label">Email</div>
          <div className="value"><a href="mailto:ashiq.dev.apps@gmail.com">ashiq.dev.apps@gmail.com</a></div>
        </div>
        <div className="contact-card">
          <div className="label">LinkedIn</div>
          <div className="value"><a href="https://linkedin.com/in/ashiqy04" target="_blank" rel="noopener noreferrer">/in/ashiqy04</a></div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <StatusBar />
      <div className="wrap">
        <Hero />
        <Pillars />
        <Work />
        <Contact />
      </div>
      <footer>built end to end — backend, frontend, mobile — and a fair amount of coffee</footer>
    </>
  )
}
