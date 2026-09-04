import { useEffect, useState } from 'react'
import { PILLARS as FALLBACK_PILLARS } from '../data/content.js'
import { fetchStack } from '../lib/stack.js'
import { getTechIcon } from '../lib/techIcons.js'

export default function Pillars() {
  const [pillars, setPillars] = useState(FALLBACK_PILLARS)

  useEffect(() => {
    let cancelled = false
    fetchStack()
      .then((data) => {
        if (!cancelled && data.length > 0) setPillars(data)
      })
      .catch(() => {
        // Firestore unreachable or empty — keep the static fallback
      })
    return () => { cancelled = true }
  }, [])

  return (
    <section className="section" id="stack">
      <div className="section-label">capabilities</div>
      <h2 className="section-title">What I work across</h2>
      <div className="pillars">
        {pillars.map((pillar) => (
          <div className="pillar" key={pillar.id || pillar.title}>
            <div className="pillar-tag">{pillar.category}</div>
            <h3>{pillar.title}</h3>
            <p>{pillar.desc}</p>
            <div className="tech-grid">
              {(pillar.tags || []).map((tag) => {
                const Icon = getTechIcon(tag)
                return (
                  <div className="tech-tile" key={tag}>
                    <Icon size={20} />
                    <span>{tag}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
