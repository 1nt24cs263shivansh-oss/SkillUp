import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiErrorMessage } from '../services/api'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '', role: 'student' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(form)

      // Direct, explicit role routing to avoid stale route redirection
      const roleRoutes = {
        student: '/dashboard',
        mentor: '/mentor',
        recruiter: '/recruiter',
      }
      const destination = roleRoutes[user.role] || '/dashboard'

      navigate(destination, { replace: true })
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to sign in right now.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page" style={{ minHeight: '100vh', background: '#fbfaf7' }}>
      {/* -------------------------------------------------------------
          LEFT HALF: Sage Panel with Scaled Logo & Framed Photo
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
            Welcome back
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
            Keep building
            <br />
            your next step.
          </h1>
          <p style={{ color: '#566e64', fontSize: '14px', lineHeight: 1.6, maxWidth: '380px' }}>
            Sign in to benchmark competencies, discover industry roles, and connect with mentors.
          </p>

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
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
              alt="Students collaborating"
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
          RIGHT HALF: Login Card
      -------------------------------------------------------------- */}
      <section className="auth-card" style={{ alignSelf: 'center', justifySelf: 'center' }}>
        <div className="auth-card-header">
          <span className="mobile-brand">SkillUp</span>
          <p className="kicker">Your workspace</p>
          <h2>Sign in to continue</h2>
          <p>Use your registered institutional credentials.</p>
        </div>

        <form onSubmit={submit} className="auth-form">
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <label>
            Sign in as
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
            >
              <option value="student">Student</option>
              <option value="mentor">Institute mentor</option>
              <option value="recruiter">Industry recruiter</option>
            </select>
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
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Enter your password"
              required
            />
          </label>

          <button
            className="primary-button full-width"
            disabled={loading}
            style={{ marginTop: '6px' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          New to SkillUp? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  )
}