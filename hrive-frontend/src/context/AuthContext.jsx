import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SUPABASE_FUNCTIONS_BASE, supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null)
  const [email, setEmail] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  const [loading, setLoading] = useState(true)

  // App load par localStorage se state restore karo
  useEffect(() => {
    // Initial load from local storage
    const token = localStorage.getItem('hrive_access_token')
    const savedEmail = localStorage.getItem('hrive_email')
    const savedRole = localStorage.getItem('hrive_role')
    const savedName = localStorage.getItem('hrive_name')

    if (token && savedEmail && savedRole) {
      setEmail(savedEmail)
      setRole(savedRole)
      if (savedName) setDisplayName(savedName)
    }
    setLoading(false)

    // Listen for auth changes (auto-refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
        console.log('Token refreshed/updated automatically by Supabase')
        if (session) {
           localStorage.setItem('hrive_access_token', session.access_token)
           if(session.refresh_token) localStorage.setItem('hrive_refresh_token', session.refresh_token)
        }
      } 
      if (event === 'SIGNED_OUT') {
        clearLocalAuth()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
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
      const backendRole = rawRole ? rawRole.toUpperCase() : null
      const fullName = data.employee?.full_name || data.user?.email || emailInput

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
      if (fullName) {
        localStorage.setItem('hrive_name', fullName)
        setDisplayName(fullName)
      } else {
        localStorage.removeItem('hrive_name')
        setDisplayName(null)
      }

      // IMPORTANT: Hydrate Supabase Client so it handles auto-refresh
      if (refreshToken) {
         await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
         })
         console.log('Supabase session set for auto-refresh')
      }

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

  const clearLocalAuth = () => {
    localStorage.removeItem('hrive_access_token')
    localStorage.removeItem('hrive_refresh_token')
    localStorage.removeItem('hrive_email')
    localStorage.removeItem('hrive_role')
    localStorage.removeItem('hrive_name')
    setRole(null)
    setEmail(null)
    setDisplayName(null)
  }

  const logout = async () => {
    clearLocalAuth() // Optimistic update: Clear state immediately for responsiveness
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = useMemo(
    () => ({
      role,
      email,
      loading,
      displayName,
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
