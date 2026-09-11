import { useAuth } from '../context/AuthContext'

export default function PlaceholderDashboard() {
  const { user } = useAuth()
  return <div className="page-frame placeholder-dashboard"><p className="kicker">{user.role === 'mentor' ? 'Institute workspace' : 'Industry workspace'}</p><h1>Welcome, {user.name.split(' ')[0]}.</h1><div className="placeholder-panel"><h3>Your {user.role} dashboard is next.</h3><p>This account and authentication flow are ready. The {user.role} workspace will be introduced in the next MVP phase.</p></div></div>
}
