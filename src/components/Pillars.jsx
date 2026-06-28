import { PILLARS } from '../data/content.js'

export default function Pillars() {
  return (
    <section className="section" id="stack">
      <div className="section-label">capabilities</div>
      <h2 className="section-title">What I work across</h2>
      <div className="pillars">
        {PILLARS.map((pillar) => (
          <div className="pillar" key={pillar.title}>
            <div className="pillar-tag">{pillar.tag}</div>
            <h3>{pillar.title}</h3>
            <p>{pillar.desc}</p>
            <div className="chiplist">
              {pillar.chips.map((chip) => (
                <span className="chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
