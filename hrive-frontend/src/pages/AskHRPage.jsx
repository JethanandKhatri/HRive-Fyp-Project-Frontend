import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import DashboardShell from '../components/layout/DashboardShell'
import { portalKeys, portalMeta } from '../data/portalData'
import { useAuth } from '../context/AuthContext'

function AskHRPage() {
  const { portalId } = useParams()
  const { role, logout, email } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { from: 'HR Bot', text: 'Hi! Ask me about salary, leave balance, payroll dates, benefits, or your manager.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!portalId || !portalKeys.includes(portalId)) {
    return <Navigate to={`/portal/${role || 'hr'}`} replace />
  }
  if (portalId === 'hr' || portalId === 'admin') {
    return <Navigate to={`/portal/${role || 'hr'}`} replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const sendQuestion = () => {
    if (!input.trim()) return
    const question = input.trim()
    setMessages((prev) => [...prev, { from: 'You', text: question }])
    setInput('')
    setLoading(true)
    setError('')
    // Simple local mock answers while backend is disconnected
    const lowerQ = question.toLowerCase()
    let answer = 'Got it, I will log this for HR.'
    if (lowerQ.includes('salary') || lowerQ.includes('pay')) answer = 'Salaries are processed on the 28th each month.'
    else if (lowerQ.includes('leave')) answer = 'You have 14 annual leaves and 6 sick leaves remaining.'
    else if (lowerQ.includes('benefit') || lowerQ.includes('insurance')) answer = 'Health insurance is covered via HMO Plus. Dental is included.'
    else if (lowerQ.includes('manager')) answer = 'Your manager is listed as: manager@hrive.com.'
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'HR Bot', text: answer }])
      setLoading(false)
    }, 400)
  }

  useEffect(() => {
    setError('')
  }, [portalId])

  return (
    <DashboardShell portal={portalId} onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">{portalMeta[portalId]?.label} Portal</span>
      </div>
      <div className="hero-banner">
        <div>
          <p className="tag">{portalMeta[portalId]?.label} / Ask HR</p>
          <h2>Ask HR Bot</h2>
          <p className="muted">Instant answers about salary, leave, payroll, benefits, policies, and more.</p>
        </div>
        <div className="hero-quick">
          <span className="pill strong">AI Assist</span>
          <span className="pill soft">Employee & Manager</span>
          <span className="pill soft">Knowledge base</span>
        </div>
      </div>

      <div className="content-grid">
        <div className="chat-card">
          <div className="chat-card-header">
            <div>
              <p className="tag">Ask anything</p>
              <h3>HR Knowledge</h3>
              <p className="muted small">Salary, leave, payroll dates, benefits, manager info, policies.</p>
            </div>
          </div>
          <div className="chat-widget">
            <div className="chat-thread">
              {messages.map((msg, idx) => (
                <div
                  key={`${msg.from}-${idx}`}
                  className={msg.from === 'You' ? 'chat-bubble user' : 'chat-bubble bot'}
                >
                  <strong className="chat-from">{msg.from}:</strong> {msg.text}
                </div>
              ))}
              {loading ? <div className="muted">Thinking...</div> : null}
              {error ? <div className="muted">{error}</div> : null}
            </div>
            <div className="chat-input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about salary, leave, payroll, benefits, manager..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendQuestion()
                }}
              />
              <button onClick={sendQuestion}>Ask</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default AskHRPage
