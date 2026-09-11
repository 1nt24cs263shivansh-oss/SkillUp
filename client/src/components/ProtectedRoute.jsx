import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ allowedRoles }) {
  const { user, booting } = useAuth()
  const location = useLocation()

  if (booting) {
    return <div className="screen-state">Checking your session...</div>
  }

  // Not signed in -> send to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  // Role check: if the user's role isn't in allowedRoles, redirect them to their own dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleRoutes = {
      student: '/dashboard',
      mentor: '/mentor',
      recruiter: '/recruiter',
    }
    const defaultPath = roleRoutes[user.role] || '/dashboard'
    return <Navigate to={defaultPath} replace />
  }

  return <Outlet />
}

export function PublicOnlyRoute() {
  const { user, booting } = useAuth()

  if (booting) {
    return <div className="screen-state">Loading SkillUp...</div>
  }

  if (!user) {
    return <Outlet />
  }

  // Explicit role-based destination for already logged-in users visiting /login or /register
  const roleRoutes = {
    student: '/dashboard',
    mentor: '/mentor',
    recruiter: '/recruiter',
  }
  const destination = roleRoutes[user.role] || '/dashboard'

  return <Navigate to={destination} replace />
}