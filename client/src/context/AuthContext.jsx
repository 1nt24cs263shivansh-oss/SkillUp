import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [booting, setBooting] = useState(true)

  // Load saved session on initial render
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
  }

  return (
    <AuthContext.Provider value={{ user, booting, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)