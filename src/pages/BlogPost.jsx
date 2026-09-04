import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout.jsx'
import { fetchPostBySlug } from '../lib/posts.js'

function formatDate(ts) {
  if (!ts) return ''
  const date = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [state, setState] = useState('loading') // loading | ready | error

  useEffect(() => {
    setState('loading')
    fetchPostBySlug(slug)
      .then((data) => {
        setPost(data)
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [slug])

  return (
    <Layout>
      <article className="section" style={{ borderBottom: 'none', paddingTop: 56 }}>
        <Link to="/blog" className="terminal-line" style={{ display: 'inline-flex', marginBottom: 24 }}>
          <span className="prompt">$</span> cd ../blog
        </Link>

        {state === 'loading' && <p className="sub">Loading…</p>}

        {state === 'error' && (
          <p className="sub">Couldn't find that post, or it's not available right now.</p>
        )}

        {state === 'ready' && post && (
          <>
            <h1 className="section-title">{post.title}</h1>
            {post.publishedAt && (
              <div className="terminal-line" style={{ marginBottom: 28 }}>
                {formatDate(post.publishedAt)}
              </div>
            )}
            {post.coverImageUrl && (
              <img src={post.coverImageUrl} alt="" className="blog-cover-image" />
            )}
            <div className="markdown-body">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </>
        )}
      </article>
    </Layout>
  )
}
