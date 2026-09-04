import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'

export default function NotFound() {
  return (
    <Layout>
      <section className="section" style={{ borderBottom: 'none', paddingTop: 100, textAlign: 'left' }}>
        <div className="terminal-line">
          <span className="prompt">$</span> cat ./this-page.txt
        </div>
        <h1 className="section-title" style={{ fontSize: 40 }}>404: Not Found</h1>
        <p className="sub" style={{ marginBottom: 24 }}>
          That path doesn't exist — might be a typo, or a page that moved.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block' }}>
          cd ~
        </Link>
      </section>
    </Layout>
  )
}
