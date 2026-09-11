import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiErrorMessage } from '../services/api'

export default function LoginPage() {
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { const user = await login(form); navigate(location.state?.from || (user.role === 'student' ? '/dashboard' : `/${user.role}`), { replace: true }) } catch (err) { setError(apiErrorMessage(err, 'Unable to sign in right now.')) } finally { setLoading(false) } }
  return <main className="auth-page"><div className="auth-aside"><Link className="brand light" to="/">SkillUp</Link><div><p className="kicker light-kicker">Welcome back</p><h1>Keep building<br />your next step.</h1><p>Sign in to find roles, learning paths and people invested in your growth.</p></div><span className="aside-foot">SkillUp · 2025</span></div><section className="auth-card"><div className="auth-card-header"><span className="mobile-brand">SkillUp</span><p className="kicker">Your workspace</p><h2>Sign in to continue</h2><p>Use your SkillUp account details.</p></div><form onSubmit={submit} className="auth-form">{error && <div className="form-error" role="alert">{error}</div>}<label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required /></label><label>Password<input type="password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Enter your password" required /></label><button className="primary-button full-width" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button></form><p className="auth-switch">New to SkillUp? <Link to="/register">Create an account</Link></p></section></main>
}
