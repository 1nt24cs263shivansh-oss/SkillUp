import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [booting, setBooting] = useState(true)

  // Restore session from localStorage on application mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('skillup_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error('Failed to restore user session:', err)
      localStorage.removeItem('skillup_user')
    } finally {
      setBooting(false)
    }
  }, [])

  const login = async ({ email, role: selectedRole }) => {
    // Determine priority role: explicit dropdown value takes precedence
    let role = selectedRole || 'student'
    if (!selectedRole) {
      if (email.includes('mentor')) role = 'mentor'
      if (email.includes('recruiter') || email.includes('hr')) role = 'recruiter'
    }

    const loggedUser = {
      name: email.split('@')[0] || 'User',
      email,
      role,
      skills: ['Python', 'SQL', 'React'],
    }

    setUser(loggedUser)
    localStorage.setItem('skillup_user', JSON.stringify(loggedUser))
    return loggedUser
  }

  const register = async (form) => {
    const newUser = {
      name: form.name,
      email: form.email,
      role: form.role,
      college: form.college || '',
      skills: form.skills ? form.skills.split(',').map((s) => s.trim()) : [],
    }

    setUser(newUser)
    localStorage.setItem('skillup_user', JSON.stringify(newUser))
    return newUser
  }

  const updateProfile = async (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('skillup_user', JSON.stringify(updated))
      return updated
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('skillup_user')
    // Clear any token or leftover auth keys
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, booting, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)