import { CONTACT } from '../data/content.js'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="section-label">get in touch</div>
      <h2 className="section-title">{CONTACT.heading}</h2>
      <p className="sub" style={{ marginBottom: 0 }}>{CONTACT.subtitle}</p>
      <div className="contact-row">
        {CONTACT.cards.map((card) => (
          <div className="contact-card" key={card.label}>
            <div className="label">{card.label}</div>
            <div className="value">
              <a href={card.href} target="_blank" rel="noopener noreferrer">
                {card.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
