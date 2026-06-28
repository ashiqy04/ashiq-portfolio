import ProjectCard from './ProjectCard.jsx'
import { PROJECTS } from '../data/content.js'

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="section-label">shipped</div>
      <h2 className="section-title">Selected work</h2>
      {PROJECTS.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </section>
  )
}
