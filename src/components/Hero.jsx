import { useTypingEffect } from '../hooks/useTypingEffect.js'
import { HERO } from '../data/content.js'

const FULL_TEXT = HERO.nameAccent + HERO.headingRest

export default function Hero() {
  const { displayed, done } = useTypingEffect(FULL_TEXT)

  const renderHeading = () => {
    if (done) {
      return (
        <>
          <span className="accent">{HERO.nameAccent}</span>
          {HERO.headingRest}
        </>
      )
    }
    return displayed
  }

  return (
    <section className="hero">
      <div className="terminal-line">
        <span className="prompt">$</span> {HERO.terminalPrompt}
      </div>
      <h1 className={done ? 'no-caret' : ''}>{renderHeading()}</h1>
      <p className="sub">{HERO.subtitle}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href={HERO.primaryCta.href}>
          {HERO.primaryCta.label}
        </a>
        <a className="btn btn-ghost" href={HERO.secondaryCta.href}>
          {HERO.secondaryCta.label}
        </a>
      </div>
    </section>
  )
}
