import { ArrowLeft, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleLabel = { student: 'Student', mentor: 'Institute mentor', recruiter: 'Industry recruiter' }

function InterestsCard({ user, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState((user.interests || []).join(', '))

  const startEdit = () => {
    setValue((user.interests || []).join(', '))
    setEditing(true)
  }

  const save = (event) => {
    event.preventDefault()
    onSave({ interests: value.split(',').map((item) => item.trim()).filter(Boolean) })
    setEditing(false)
  }

  const interests = user.interests || []

  return (
    <section className="info-card">
      <div className="info-card-header">
        <h2>Interests</h2>
        {!editing && (
          <button type="button" className="edit-trigger" onClick={startEdit}>
            <Pencil size={13} /> Edit
          </button>
        )}
      </div>

      {editing ? (
        <form className="profile-form" onSubmit={save}>
          <label>
            Interests
            <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Machine learning, Android development, Design" />
          </label>
          <div className="form-actions">
            <button className="primary-button" type="submit">Save changes</button>
            <button className="secondary-button" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : interests.length ? (
        <div className="skill-list">
          {interests.map((item) => <span key={item}>{item}</span>)}
        </div>
      ) : (
        <p className="field-hint">No interests added yet.</p>
      )}
    </section>
  )
}

function GeneralInfoCard({ user, onSave }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ age: user.age || '', degree: user.degree || '', college: user.college || '' })

  const startEdit = () => {
    setForm({ age: user.age || '', degree: user.degree || '', college: user.college || '' })
    setEditing(true)
  }

  const save = (event) => {
    event.preventDefault()
    onSave({ age: form.age.trim(), degree: form.degree.trim(), college: form.college.trim() })
    setEditing(false)
  }

  return (
    <section className="info-card">
      <div className="info-card-header">
        <h2>General information</h2>
        {!editing && (
          <button type="button" className="edit-trigger" onClick={startEdit}>
            <Pencil size={13} /> Edit
          </button>
        )}
      </div>

      {editing ? (
        <form className="profile-form" onSubmit={save}>
          <label>
            Age
            <input value={form.age} onChange={(event) => setForm({ ...form, age: event.target.value })} placeholder="20" />
          </label>
          <label>
            Degree
            <input value={form.degree} onChange={(event) => setForm({ ...form, degree: event.target.value })} placeholder="B.E. Computer Science Engineering" />
          </label>
          <label>
            College
            <input value={form.college} onChange={(event) => setForm({ ...form, college: event.target.value })} placeholder="NMIT" />
          </label>
          <div className="form-actions">
            <button className="primary-button" type="submit">Save changes</button>
            <button className="secondary-button" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="info-grid">
          <div className="info-cell">
            <span className="info-label">Name</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-cell">
            <span className="info-label">Age</span>
            <span className={user.age ? 'info-value' : 'info-value muted'}>{user.age || 'Not added'}</span>
          </div>
          <div className="info-cell">
            <span className="info-label">Degree</span>
            <span className={user.degree ? 'info-value' : 'info-value muted'}>{user.degree || 'Not added'}</span>
          </div>
          <div className="info-cell">
            <span className="info-label">College</span>
            <span className={user.college ? 'info-value' : 'info-value muted'}>{user.college || 'Not added'}</span>
          </div>
        </div>
      )}
    </section>
  )
}

function PortfolioTab() {
  return (
    <div className="empty-state">
      <h3>No projects yet</h3>
      <p>Your portfolio will show up here once you add your first project.</p>
    </div>
  )
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('information')

  if (!user) return null

  const initials = user.name ? user.name.charAt(0).toUpperCase() : '?'

  return (
    <div className="page-frame details-page profile-page">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <section className="details-hero profile-hero">
        <span className="profile-avatar">{initials}</span>
        <div>
          <p className="kicker">{roleLabel[user.role] || user.role}</p>
          <h1>{user.name}</h1>
          <p className="details-company">{user.degree || 'Degree not set'} · {user.college || 'College not set'}</p>
        </div>
      </section>

      <div className="detail-tabs" role="tablist">
        {['information', 'portfolio'].map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'detail-tab active' : 'detail-tab'}
            onClick={() => setTab(key)}
          >
            {key === 'information' ? 'Information' : 'Portfolio'}
          </button>
        ))}
      </div>

      <div className="profile-content">
        {tab === 'information' ? (
          <>
            <InterestsCard user={user} onSave={updateProfile} />
            <GeneralInfoCard user={user} onSave={updateProfile} />
          </>
        ) : (
          <PortfolioTab />
        )}
      </div>
    </div>
  )
}