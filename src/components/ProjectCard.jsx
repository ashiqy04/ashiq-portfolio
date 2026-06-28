export default function ProjectCard({ project }) {
  return (
    <div className="project">
      <div className="project-head">
        <div className="project-title">{project.title}</div>
        <span className={`status-pill status-${project.status}`}>
          {project.statusLabel}
        </span>
      </div>
      <p className="desc">{project.desc}</p>
      <div className="project-footer">
        <div className="chiplist">
          {project.chips.map((chip) => (
            <span className="chip" key={chip}>{chip}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.linkLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
