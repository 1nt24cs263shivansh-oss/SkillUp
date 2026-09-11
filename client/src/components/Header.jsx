import { LogOut } from 'lucide-react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'opportunities'

  const isRecruiter = user?.role === 'recruiter'
  const isMentor = user?.role === 'mentor'
  const homePath = isRecruiter ? '/recruiter' : isMentor ? '/mentor' : '/dashboard'

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to={homePath} className="brand" aria-label="SkillUp home">
          <span>SkillUp</span>
        </NavLink>

        <nav className="main-nav">
          {isRecruiter || isMentor ? (
            <NavLink
              to={isRecruiter ? '/recruiter' : '/mentor'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Dashboard
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/dashboard?tab=opportunities"
                className={() =>
                  currentTab === 'opportunities' ? 'nav-link active' : 'nav-link'
                }
              >
                Opportunities
              </NavLink>
              <NavLink
                to="/dashboard?tab=skills"
                className={() =>
                  currentTab === 'skills' ? 'nav-link active' : 'nav-link'
                }
              >
                Skill Development
              </NavLink>
            </>
          )}
        </nav>

        <div className="header-profile">
          <NavLink to="/profile" className="header-profile-link" aria-label="View your profile">
            <span className="avatar">{user?.name?.charAt(0)?.toUpperCase()}</span>
            <span className="profile-copy">
              <strong>{user?.name}</strong>
              <small>{user?.role === 'student' ? 'Student' : user?.role}</small>
            </span>
          </NavLink>
          <button className="logout-button" type="button" onClick={logout} title="Log out">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  )
}