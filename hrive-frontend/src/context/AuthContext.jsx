import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const AuthContext = createContext(null)

const SUPABASE_FUNCTIONS_BASE = '/functions/v1'

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null)
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)

  // App load par localStorage se state restore karo
  useEffect(() => {
    const token = localStorage.getItem('hrive_access_token')
    const savedEmail = localStorage.getItem('hrive_email')
    const savedRole = localStorage.getItem('hrive_role')

    if (token && savedEmail && savedRole) {
      setEmail(savedEmail)
      setRole(savedRole)
    }
    setLoading(false)
  }, [])

  const login = async (emailInput, password) => {
    if (!emailInput || !password) {
      return { ok: false, error: 'Email and password required' }
    }

    try {
      const response = await fetch(`${SUPABASE_FUNCTIONS_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Edge Functions require the Anon Key for authorization
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: emailInput, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { ok: false, error: data.error || 'Login failed' }
      }

      // yahan se tumhara edge func ka structure use karo
      const accessToken = data.session?.access_token
      const refreshToken = data.session?.refresh_token
      const rawRole = data.user?.role // "ADMIN" | "HR" | ...
      const backendRole = rawRole ? rawRole.toLowerCase() : null

      if (!accessToken || !backendRole) {
        return { ok: false, error: 'Invalid login response from server' }
      }

      // tokens + user info localStorage me save karo
      localStorage.setItem('hrive_access_token', accessToken)
      if (refreshToken) {
        localStorage.setItem('hrive_refresh_token', refreshToken)
      }
      localStorage.setItem('hrive_email', emailInput)
      localStorage.setItem('hrive_role', backendRole)

      setEmail(emailInput)
      setRole(backendRole)

      return { ok: true, role: backendRole }
    } catch (err) {
      console.error('Login error:', err)
      return { ok: false, error: 'Network error or server unavailable' }
    }
  }

  const forgotPassword = async (emailInput) => {
    if (!emailInput) return { ok: false, error: 'Email required' }
    
    try {
      const response = await fetch(`${SUPABASE_FUNCTIONS_BASE}/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: emailInput }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { ok: false, error: data.error || data.message || 'Failed to send reset link' }
      }

      return { ok: true }
    } catch (err) {
      console.error('Forgot Password error:', err)
      return { ok: false, error: 'Network error or server unavailable' }
    }
  }

  const logout = () => {
    localStorage.removeItem('hrive_access_token')
    localStorage.removeItem('hrive_refresh_token')
    localStorage.removeItem('hrive_email')
    localStorage.removeItem('hrive_role')
    setRole(null)
    setEmail(null)
  }

  const value = useMemo(
    () => ({
      role,
      email,
      loading,
      login,
      logout,
      forgotPassword,
      isAuthed: Boolean(role),
      isAdmin: role === 'ADMIN',
      isHR: role === 'HR',
      isManager: role === 'MANAGER',
    }),
    [role, email, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
