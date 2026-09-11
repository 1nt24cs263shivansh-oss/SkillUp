import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute() {
  const { user, booting } = useAuth()
  const location = useLocation()
  if (booting) return <div className="screen-state">Checking your session...</div>
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}

export function PublicOnlyRoute() {
  const { user, booting } = useAuth()
  if (booting) return <div className="screen-state">Loading SkillUp...</div>
  if (!user) return <Outlet />
  return <Navigate to={user.role === 'student' ? '/dashboard' : `/${user.role}`} replace />
}
