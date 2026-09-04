import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchProjects, createProject, updateProject, deleteProject } from '../lib/projects.js'
import { fetchAllPostsAdmin, createPost, updatePost, deletePost } from '../lib/posts.js'

const emptyProject = { title: '', desc: '', status: 'local', statusLabel: '', linkLabel: '', link: '', chips: '', sortOrder: 0 }
const emptyPost = { title: '', slug: '', excerpt: '', content: '', coverImageUrl: '', published: false }

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [tab, setTab] = useState('projects') // projects | posts

  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div className="admin-header">
        <div>
          <div className="terminal-line"><span className="prompt">$</span> whoami --admin</div>
          <h1 className="section-title" style={{ marginBottom: 0 }}>Dashboard</h1>
        </div>
        <button className="btn btn-ghost" onClick={logout}>Log out</button>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'projects' ? 'admin-tab active' : 'admin-tab'} onClick={() => setTab('projects')}>Projects</button>
        <button className={tab === 'posts' ? 'admin-tab active' : 'admin-tab'} onClick={() => setTab('posts')}>Blog posts</button>
      </div>

      {tab === 'projects' ? <ProjectsPanel /> : <PostsPanel />}
    </div>
  )
}

// ---------------- Projects ----------------

function ProjectsPanel() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyProject)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function load() {
    fetchProjects().then(setProjects).catch((e) => setError(e.message))
  }

  useEffect(load, [])

  function startEdit(p) {
    setEditingId(p.id)
    setForm({
      title: p.title || '',
      desc: p.desc || '',
      status: p.status || 'local',
      statusLabel: p.statusLabel || '',
      linkLabel: p.linkLabel || '',
      link: p.link || '',
      chips: (p.chips || []).join(', '),
      sortOrder: p.sortOrder ?? 0,
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyProject)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      chips: form.chips.split(',').map((t) => t.trim()).filter(Boolean),
    }
    try {
      if (editingId) {
        await updateProject(editingId, payload)
      } else {
        await createProject(payload)
      }
      resetForm()
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    await deleteProject(id)
    load()
  }

  return (
    <div className="admin-grid">
      <form onSubmit={handleSubmit} className="admin-form admin-card">
        <h3>{editingId ? 'Edit project' : 'New project'}</h3>

        <label className="admin-label">Title</label>
        <input className="admin-input" required value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label className="admin-label">Description</label>
        <textarea className="admin-input" rows={3} value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })} />

        <label className="admin-label">Status style</label>
        <select className="admin-input" value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="live">live (green pill)</option>
          <option value="local">local (grey pill)</option>
        </select>

        <label className="admin-label">Status label (e.g. "live on play store", "repo")</label>
        <input className="admin-input" value={form.statusLabel}
          onChange={(e) => setForm({ ...form, statusLabel: e.target.value })} />

        <label className="admin-label">Link label (e.g. "GitHub →")</label>
        <input className="admin-input" value={form.linkLabel}
          onChange={(e) => setForm({ ...form, linkLabel: e.target.value })} />

        <label className="admin-label">Link URL</label>
        <input className="admin-input" value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })} />

        <label className="admin-label">Tags (comma separated)</label>
        <input className="admin-input" value={form.chips}
          onChange={(e) => setForm({ ...form, chips: e.target.value })} />

        <label className="admin-label">Sort order</label>
        <input className="admin-input" type="number" value={form.sortOrder}
          onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {editingId ? 'Save changes' : 'Add project'}
          </button>
          {editingId && <button className="btn btn-ghost" type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div>
        {projects.map((p) => (
          <div className="project" key={p.id}>
            <div className="project-head">
              <div className="project-title">{p.title}</div>
              <span className={`status-pill status-${p.status}`}>{p.statusLabel}</span>
            </div>
            <p className="desc">{p.desc}</p>
            <div className="project-footer">
              <div className="chiplist">{(p.chips || []).map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              <div className="project-links">
                <a onClick={() => startEdit(p)} role="button">Edit</a>
                <a onClick={() => handleDelete(p.id)} role="button">Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------- Blog posts ----------------

function PostsPanel() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyPost)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function load() {
    fetchAllPostsAdmin().then(setPosts).catch((e) => setError(e.message))
  }

  useEffect(load, [])

  function startEdit(p) {
    setEditingId(p.id)
    setForm({
      title: p.title || '', slug: p.slug || '', excerpt: p.excerpt || '',
      content: p.content || '', coverImageUrl: p.coverImageUrl || '', published: !!p.published,
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyPost)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (editingId) {
        await updatePost(editingId, form)
      } else {
        await createPost(form)
      }
      resetForm()
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return
    await deletePost(id)
    load()
  }

  return (
    <div className="admin-grid">
      <form onSubmit={handleSubmit} className="admin-form admin-card">
        <h3>{editingId ? 'Edit post' : 'New post'}</h3>

        <label className="admin-label">Title</label>
        <input className="admin-input" required value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label className="admin-label">Slug (leave blank to auto-generate)</label>
        <input className="admin-input" value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })} />

        <label className="admin-label">Excerpt</label>
        <textarea className="admin-input" rows={2} value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />

        <label className="admin-label">Content (Markdown)</label>
        <textarea className="admin-input admin-textarea-lg" rows={12} value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })} />

        <label className="admin-label">Cover image URL (relative path, e.g. /blog-covers/example.svg)</label>
        <input className="admin-input" value={form.coverImageUrl}
          onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} />
        {form.coverImageUrl && (
          <img src={form.coverImageUrl} alt="Cover preview" className="admin-cover-preview" />
        )}

        <label className="admin-checkbox-row">
          <input type="checkbox" checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          Published
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {editingId ? 'Save changes' : 'Add post'}
          </button>
          {editingId && <button className="btn btn-ghost" type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div>
        {posts.map((p) => (
          <div className="project" key={p.id}>
            <div className="project-head">
              <div className="project-title">{p.title}</div>
              <span className={`status-pill ${p.published ? 'status-live' : 'status-local'}`}>
                {p.published ? 'published' : 'draft'}
              </span>
            </div>
            {p.excerpt && <p className="desc">{p.excerpt}</p>}
            <div className="project-footer">
              <span className="chip">/{p.slug}</span>
              <div className="project-links">
                <a onClick={() => startEdit(p)} role="button">Edit</a>
                <a onClick={() => handleDelete(p.id)} role="button">Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
