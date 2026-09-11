import { LogOut } from 'lucide-react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'opportunities'

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/dashboard" className="brand" aria-label="SkillUp home">
          <span>SkillUp</span>
        </NavLink>
        <nav className="main-nav">
          <NavLink
            to={user?.role === 'student' ? '/dashboard?tab=opportunities' : `/${user?.role}`}
            className={() =>
              currentTab === 'opportunities' ? 'nav-link active' : 'nav-link'
            }
          >
            Opportunities
          </NavLink>
          {user?.role === 'student' && (
            <NavLink
              to="/dashboard?tab=skills"
              className={() =>
                currentTab === 'skills' ? 'nav-link active' : 'nav-link'
              }
            >
              Skill Development
            </NavLink>
          )}
        </nav>
        <div className="header-profile">
          <span className="avatar">{user?.name?.charAt(0)?.toUpperCase()}</span>
          <span className="profile-copy"><strong>{user?.name}</strong><small>{user?.role === 'student' ? 'Student' : user?.role}</small></span>
          <button className="logout-button" type="button" onClick={logout} title="Log out"><LogOut size={16} /><span>Log out</span></button>
        </div>
      </div>
    </header>
  )
}