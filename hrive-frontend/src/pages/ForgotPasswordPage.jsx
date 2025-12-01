import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    const result = await forgotPassword(email)
    
    if (result.ok) {
      setStatus({ type: 'success', message: 'Password reset link sent to your email.' })
    } else {
      setStatus({ type: 'error', message: result.error || 'Failed to send reset link.' })
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-hero">
          <p className="tag">HRive Suite</p>
          <h1>Reset your password</h1>
          <p className="muted">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input 
              name="email" 
              type="email" 
              placeholder="you@company.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          
          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {status.message && (
            <p className={`muted small ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </p>
          )}

          <div className="auth-links" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/login" className="text-sm">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
