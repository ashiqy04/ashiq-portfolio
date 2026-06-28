import { STATUS_BAR } from '../data/content.js'

export default function StatusBar() {
  return (
    <div className="statusbar">
      <div className="statusbar-inner">
        <div>
          <span className="dot" />
          {STATUS_BAR.availability}
        </div>
        <div className="statusbar-right">
          {STATUS_BAR.navLinks.map((link) => (
            <a href={link.href} key={link.label}>{link.label}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
