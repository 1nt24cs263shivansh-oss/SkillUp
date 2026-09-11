import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/dashboard" className="brand" aria-label="SkillUp home">
          <span>SkillUp</span>
        </NavLink>
        <nav className="main-nav">
          <NavLink to={user?.role === 'student' ? '/dashboard' : `/${user?.role}`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Opportunities</NavLink>
        </nav>
        <div className="header-profile">
          <NavLink to="/profile" className="header-profile-link" aria-label="View your profile">
            <span className="avatar">{user?.name?.charAt(0)?.toUpperCase()}</span>
            <span className="profile-copy"><strong>{user?.name}</strong><small>{user?.role === 'student' ? 'Student' : user?.role}</small></span>
          </NavLink>
          <button className="logout-button" type="button" onClick={logout} title="Log out"><LogOut size={16} /><span>Log out</span></button>
        </div>
      </div>
    </header>
  )
}