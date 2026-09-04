import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { fetchPublishedPosts } from '../lib/posts.js'

function formatDate(ts) {
  if (!ts) return ''
  const date = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [state, setState] = useState('loading') // loading | ready | error

  useEffect(() => {
    fetchPublishedPosts()
      .then((data) => {
        setPosts(data)
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [])

  return (
    <Layout>
      <section className="section" style={{ borderBottom: 'none', paddingTop: 56 }}>
        <div className="section-label">writing</div>
        <h1 className="section-title">Blog</h1>

        {state === 'loading' && <p className="sub">Loading posts…</p>}

        {state === 'error' && (
          <p className="sub">
            Couldn't reach the backend right now. Check back soon, or make sure the API is running.
          </p>
        )}

        {state === 'ready' && posts.length === 0 && (
          <p className="sub">No posts published yet — first one's coming soon.</p>
        )}

        {state === 'ready' && posts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id} className="project" style={{ display: 'block' }}>
            <div className="project-head">
              <div className="project-title">{post.title}</div>
            </div>
            {post.excerpt && <p className="desc">{post.excerpt}</p>}
            <div className="project-footer">
              <span className="chip">{formatDate(post.publishedAt)}</span>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  )
}
