import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import { fetchPostBySlug } from '../lib/posts.js'
import { useDocumentMeta } from '../lib/useDocumentMeta.js'
import { readingTime } from '../lib/readingTime.js'

function formatDate(ts) {
  if (!ts) return ''
  const date = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const markdownComponents = {
  // react-markdown wraps block code in its own <pre> by default — since
  // SyntaxHighlighter already renders its own <pre> internally, pass block
  // code through untouched here to avoid a <pre> nested inside a <pre>.
  pre({ children }) {
    return <>{children}</>
  },
  code({ className, children, ...props }) {
    return <CodeBlock className={className} {...props}>{children}</CodeBlock>
  },
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

  useDocumentMeta({
    title: post ? `${post.title} — Ashiq` : undefined,
    description: post?.excerpt,
    image: post?.coverImageUrl ? new URL(post.coverImageUrl, window.location.origin).href : undefined,
    url: `https://ashiq.vercel.app/blog/${slug}`,
  })

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
            <div className="terminal-line" style={{ marginBottom: 28, gap: 10 }}>
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              {post.publishedAt && post.content && <span>·</span>}
              {post.content && <span>{readingTime(post.content)}</span>}
            </div>
            {post.coverImageUrl && (
              <img src={post.coverImageUrl} alt="" className="blog-cover-image" />
            )}
            <div className="markdown-body">
              <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
            </div>
          </>
        )}
      </article>
    </Layout>
  )
}
