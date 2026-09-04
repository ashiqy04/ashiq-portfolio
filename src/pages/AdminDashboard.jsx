import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchProjects, createProject, updateProject, deleteProject } from '../lib/projects.js'
import { fetchAllPostsAdmin, createPost, updatePost, deletePost } from '../lib/posts.js'
import { fetchStack, createStackItem, updateStackItem, deleteStackItem } from '../lib/stack.js'
import { fetchExperience, createExperience, updateExperience, deleteExperience } from '../lib/experience.js'
import { getTechIcon } from '../lib/techIcons.js'

const emptyProject = { title: '', desc: '', status: 'local', statusLabel: '', linkLabel: '', link: '', chips: '', sortOrder: 0 }
const emptyPost = { title: '', slug: '', excerpt: '', content: '', coverImageUrl: '', published: false }
const emptyStackItem = { category: '', title: '', desc: '', tags: '', sortOrder: 0 }
const emptyExperience = { company: '', title: '', startDate: '', endDate: '', bullets: '', sortOrder: 0 }

export default function AdminDashboard() {
  const { logout } = useAuth()
  const [tab, setTab] = useState('projects') // projects | posts | stack | experience

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
        <button className={tab === 'stack' ? 'admin-tab active' : 'admin-tab'} onClick={() => setTab('stack')}>Stack</button>
        <button className={tab === 'experience' ? 'admin-tab active' : 'admin-tab'} onClick={() => setTab('experience')}>Experience</button>
      </div>

      {tab === 'projects' && <ProjectsPanel />}
      {tab === 'posts' && <PostsPanel />}
      {tab === 'stack' && <StackPanel />}
      {tab === 'experience' && <ExperiencePanel />}
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

// ---------------- Stack (Capabilities) ----------------

function StackPanel() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyStackItem)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function load() {
    fetchStack().then(setItems).catch((e) => setError(e.message))
  }

  useEffect(load, [])

  function startEdit(item) {
    setEditingId(item.id)
    setForm({
      category: item.category || '',
      title: item.title || '',
      desc: item.desc || '',
      tags: (item.tags || []).join(', '),
      sortOrder: item.sortOrder ?? 0,
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyStackItem)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    }
    try {
      if (editingId) {
        await updateStackItem(editingId, payload)
      } else {
        await createStackItem(payload)
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
    if (!confirm('Delete this capability card?')) return
    await deleteStackItem(id)
    load()
  }

  return (
    <div className="admin-grid">
      <form onSubmit={handleSubmit} className="admin-form admin-card">
        <h3>{editingId ? 'Edit capability' : 'New capability'}</h3>

        <label className="admin-label">Category label (e.g. "Backend")</label>
        <input className="admin-input" required value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} />

        <label className="admin-label">Title (e.g. "APIs & Services")</label>
        <input className="admin-input" required value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label className="admin-label">Description</label>
        <textarea className="admin-input" rows={3} value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })} />

        <label className="admin-label">Technologies (comma separated — icons resolve automatically)</label>
        <input className="admin-input" value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="Java, Spring Boot, PostgreSQL" />

        <label className="admin-label">Sort order</label>
        <input className="admin-input" type="number" value={form.sortOrder}
          onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {editingId ? 'Save changes' : 'Add capability'}
          </button>
          {editingId && <button className="btn btn-ghost" type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div>
        {items.map((item) => (
          <div className="project" key={item.id}>
            <div className="project-head">
              <div className="project-title">{item.category} — {item.title}</div>
            </div>
            <p className="desc">{item.desc}</p>
            <div className="project-footer">
              <div className="chiplist">
                {(item.tags || []).map((t) => {
                  const Icon = getTechIcon(t)
                  return <span className="chip" key={t}><Icon size={13} style={{ marginRight: 4, verticalAlign: -2 }} />{t}</span>
                })}
              </div>
              <div className="project-links">
                <a onClick={() => startEdit(item)} role="button">Edit</a>
                <a onClick={() => handleDelete(item.id)} role="button">Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------- Experience ----------------

function ExperiencePanel() {
  const [roles, setRoles] = useState([])
  const [form, setForm] = useState(emptyExperience)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function load() {
    fetchExperience().then(setRoles).catch((e) => setError(e.message))
  }

  useEffect(load, [])

  function startEdit(role) {
    setEditingId(role.id)
    setForm({
      company: role.company || '',
      title: role.title || '',
      startDate: role.startDate || '',
      endDate: role.endDate || '',
      bullets: (role.bullets || []).join('\n'),
      sortOrder: role.sortOrder ?? 0,
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyExperience)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      bullets: form.bullets.split('\n').map((b) => b.trim()).filter(Boolean),
    }
    try {
      if (editingId) {
        await updateExperience(editingId, payload)
      } else {
        await createExperience(payload)
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
    if (!confirm('Delete this role?')) return
    await deleteExperience(id)
    load()
  }

  return (
    <div className="admin-grid">
      <form onSubmit={handleSubmit} className="admin-form admin-card">
        <h3>{editingId ? 'Edit role' : 'New role'}</h3>

        <label className="admin-label">Company</label>
        <input className="admin-input" required value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })} />

        <label className="admin-label">Title</label>
        <input className="admin-input" required value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label className="admin-label">Start date (e.g. "Jan 2023")</label>
        <input className="admin-input" value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })} />

        <label className="admin-label">End date (blank or "Present" if current)</label>
        <input className="admin-input" value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })} />

        <label className="admin-label">Bullets (one per line)</label>
        <textarea className="admin-input" rows={5} value={form.bullets}
          onChange={(e) => setForm({ ...form, bullets: e.target.value })}
          placeholder={'Built X that did Y\nOwned Z end to end'} />

        <label className="admin-label">Sort order</label>
        <input className="admin-input" type="number" value={form.sortOrder}
          onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {editingId ? 'Save changes' : 'Add role'}
          </button>
          {editingId && <button className="btn btn-ghost" type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div>
        {roles.map((role) => (
          <div className="project" key={role.id}>
            <div className="project-head">
              <div className="project-title">{role.title} — {role.company}</div>
            </div>
            <p className="desc">{role.startDate}{role.endDate ? ` — ${role.endDate}` : ''}</p>
            {role.bullets && role.bullets.length > 0 && (
              <ul style={{ margin: '8px 0 0 18px', color: 'var(--text-dim)', fontSize: 14 }}>
                {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            <div className="project-footer" style={{ marginTop: 10 }}>
              <span />
              <div className="project-links">
                <a onClick={() => startEdit(role)} role="button">Edit</a>
                <a onClick={() => handleDelete(role.id)} role="button">Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
