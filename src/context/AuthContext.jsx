import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
      }
    }
  }, [])

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('token', authToken)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('rememberedEmail')
  }

  const value = {
    user,
    token,
    setUser,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

