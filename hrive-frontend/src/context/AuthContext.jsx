import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState(null)

  const deriveRole = (emailInput) => {
    const lower = (emailInput || '').toLowerCase()
    if (lower.startsWith('admin')) return 'admin'
    if (lower.includes('hr')) return 'hr'
    if (lower.includes('manager')) return 'manager'
    return 'employee'
  }

  useEffect(() => {
    const savedRole = localStorage.getItem('hrive_role')
    const savedEmail = localStorage.getItem('hrive_email')
    if (savedRole) setRole(savedRole)
    if (savedEmail) setEmail(savedEmail)
    setLoading(false)
  }, [])

  const login = async (emailInput, password) => {
    if (!emailInput || !password) return { ok: false, error: 'Email and password required' }
    let data
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password }),
      })
      data = await res.json().catch(() => ({}))
      if (!res.ok) return { ok: false, error: data?.error || 'Login failed' }
      setRole(data.role)
      setEmail(data.email)
      localStorage.setItem('hrive_role', data.role)
      localStorage.setItem('hrive_email', data.email)
      return { ok: true, role: data.role }
    } catch (err) {
      const fallbackRole = deriveRole(emailInput)
      setRole(fallbackRole)
      setEmail(emailInput)
      localStorage.setItem('hrive_role', fallbackRole)
      localStorage.setItem('hrive_email', emailInput)
      return { ok: true, role: fallbackRole, fallback: true }
    }
  }

  const signup = async (name, emailInput, password, nextRole) => {
    if (!emailInput || !password) return { ok: false, error: 'Email and password required' }
    let data
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: emailInput, password, role: nextRole }),
      })
      data = await res.json().catch(() => ({}))
      if (!res.ok) return { ok: false, error: data?.error || 'Signup failed' }
      setRole(data.role)
      setEmail(data.email)
      localStorage.setItem('hrive_role', data.role)
      localStorage.setItem('hrive_email', data.email)
      return { ok: true, role: data.role }
    } catch (err) {
      const fallbackRole = nextRole || deriveRole(emailInput)
      setRole(fallbackRole)
      setEmail(emailInput)
      localStorage.setItem('hrive_role', fallbackRole)
      localStorage.setItem('hrive_email', emailInput)
      return { ok: true, role: fallbackRole, fallback: true }
    }
  }

  const logout = () => {
    setRole(null)
    setEmail(null)
    localStorage.removeItem('hrive_role')
    localStorage.removeItem('hrive_email')
  }

  const value = useMemo(
    () => ({
      role,
      email,
      loading,
      login,
      signup,
      logout,
      isAuthed: Boolean(role || email),
      apiUrl: API_URL,
    }),
    [role, email, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
