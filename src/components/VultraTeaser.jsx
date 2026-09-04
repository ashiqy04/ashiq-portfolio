import { VULTRA } from '../data/content.js'

export default function VultraTeaser() {
  return (
    <section className="section" id="vultra">
      <div className="section-label">{VULTRA.label}</div>
      <div className="vultra-card">
        <h2 className="section-title" style={{ marginBottom: 10 }}>{VULTRA.title}</h2>
        <p className="desc" style={{ marginBottom: 16 }}>{VULTRA.desc}</p>
        <a className="btn btn-ghost" href={VULTRA.cta.href}>{VULTRA.cta.label}</a>
      </div>
    </section>
  )
}
