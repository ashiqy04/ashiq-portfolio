import { useEffect, useState } from 'react'
import { fetchExperience } from '../lib/experience.js'

export default function Experience() {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    let cancelled = false
    fetchExperience()
      .then((data) => {
        if (!cancelled) setRoles(data)
      })
      .catch(() => {
        // Firestore unreachable or empty — section just won't render (see below)
      })
    return () => { cancelled = true }
  }, [])

  // No hardcoded fallback here on purpose — this section is entirely
  // admin-authored real history, unlike Projects/Stack which have a
  // reasonable static default. Nothing to show until you add a role.
  if (roles.length === 0) return null

  return (
    <section className="section" id="experience">
      <div className="section-label">experience</div>
      <h2 className="section-title">Where I've worked</h2>
      <div className="experience-list">
        {roles.map((role) => (
          <div className="experience-item" key={role.id}>
            <div className="experience-head">
              <div>
                <div className="experience-title">{role.title}</div>
                <div className="experience-company">{role.company}</div>
              </div>
              <div className="experience-dates">
                {role.startDate}{role.endDate ? ` — ${role.endDate}` : ''}
              </div>
            </div>
            {role.bullets && role.bullets.length > 0 && (
              <ul className="experience-bullets">
                {role.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
