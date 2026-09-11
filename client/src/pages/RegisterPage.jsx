import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiErrorMessage } from '../services/api'

const SIGNUP_IMAGE_URL =
  'https://plus.unsplash.com/premium_photo-1733342561505-306871f4e706?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    college: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await register(form)
      navigate(user.role === 'student' ? '/dashboard' : `/${user.role}`, { replace: true })
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to complete registration.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page" style={{ minHeight: '100vh', background: '#fbfaf7' }}>
      {/* -------------------------------------------------------------
          LEFT HALF: Sage Green Editorial Panel with Requested Image
      -------------------------------------------------------------- */}
      <div
        className="auth-aside"
        style={{
          background: '#e1ece7',
          padding: '48px 6vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#243a32',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          SkillUp
        </Link>

        <div style={{ margin: '30px 0' }}>
          <p className="kicker" style={{ color: '#8a6275', marginBottom: '8px' }}>
            Get started
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 3.8vw, 48px)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: '#243831',
              marginBottom: '14px',
            }}
          >
            Start your path
            <br />
            with clarity.
          </h1>
          <p style={{ color: '#566e64', fontSize: '14px', lineHeight: 1.6, maxWidth: '380px' }}>
            Join a connected ecosystem of students, academic mentors, and industry partners.
          </p>

          {/* Framed Image Showcase */}
          <div
            style={{
              marginTop: '24px',
              maxWidth: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: '0 8px 24px -4px rgba(36, 56, 49, 0.12)',
            }}
          >
            <img
              src={SIGNUP_IMAGE_URL}
              alt="Industry and student collaboration"
              style={{
                width: '100%',
                height: '210px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 600, color: '#688278' }}>
          SkillUp · Academia & Industry Portal
        </span>
      </div>

      {/* -------------------------------------------------------------
          RIGHT HALF: Sign Up Form Card
      -------------------------------------------------------------- */}
      <section className="auth-card" style={{ alignSelf: 'center', justifySelf: 'center' }}>
        <div className="auth-card-header">
          <span className="mobile-brand">SkillUp</span>
          <p className="kicker">Create profile</p>
          <h2>Create an account</h2>
          <p>Begin tracking your skills, internships, and growth.</p>
        </div>

        <form onSubmit={submit} className="auth-form">
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <label>
            I am a
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
            >
              <option value="student">Student</option>
              <option value="mentor">Institute Mentor</option>
              <option value="recruiter">Industry Recruiter</option>
            </select>
          </label>

          <label>
            Full Name
            <input
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="e.g. Alex Chen"
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Create a strong password"
              required
            />
          </label>

          <label>
            College / Institution Name
            <input
              type="text"
              value={form.college}
              onChange={(event) => setForm({ ...form, college: event.target.value })}
              placeholder="e.g. NMIT Bengaluru"
            />
          </label>

          <button className="primary-button full-width" disabled={loading} style={{ marginTop: '6px' }}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  )
}