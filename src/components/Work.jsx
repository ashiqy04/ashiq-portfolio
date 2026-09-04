import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import { PROJECTS as FALLBACK_PROJECTS } from '../data/content.js'
import { fetchProjects } from '../lib/projects.js'

export default function Work() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)

  useEffect(() => {
    let cancelled = false

    fetchProjects()
      .then((data) => {
        if (!cancelled && data.length > 0) setProjects(data)
      })
      .catch(() => {
        // Firestore unreachable or not configured yet — keep the static fallback
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section" id="work">
      <div className="section-label">shipped</div>
      <h2 className="section-title">Selected work</h2>
      {projects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </section>
  )
}
