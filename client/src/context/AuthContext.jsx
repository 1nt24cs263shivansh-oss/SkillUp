import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = async ({ email }) => {
    let role = 'student'
    if (email.includes('mentor')) role = 'mentor'
    if (email.includes('recruiter') || email.includes('hr')) role = 'recruiter'

    const loggedUser = {
      name: email.split('@')[0] || 'User',
      email,
      role,
      skills: ['Python', 'SQL', 'React'],
    }
    setUser(loggedUser)
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
    return newUser
  }

  const updateProfile = async (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, booting: false, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)