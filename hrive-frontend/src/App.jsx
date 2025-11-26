import React, { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import DashboardShell from './components/layout/DashboardShell'
import ChartCard from './components/ui/ChartCard'
import ChatWidget from './components/ui/ChatWidget'
import MetricCard from './components/ui/MetricCard'
import { activityPills, deepBlue, highlight, incomeSlices, metrics, portalKeys, portalMeta, salaryStacked, todoItems } from './data/portalData'
import { useAuth } from './context/AuthContext'
import SectionPage from './pages/SectionPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/portal/:portalId"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/:portalId/:section"
          element={
            <PrivateRoute>
              <SectionPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function PrivateRoute({ children }) {
  const auth = useAuth()
  if (auth.loading) return <div className="centered">Loading...</div>
  return children
}

function LoginPage() {
  const { login, isAuthed, role } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const email = data.get('email')
    const password = data.get('password')
    setError('')
    const result = await login(email, password)
    if (result.ok) {
      navigate(`/portal/${result.role || 'hr'}`)
    } else {
      setError(result.error || 'Invalid email or password')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-hero">
          <p className="tag">HRive Suite</p>
          <h1>Log in to manage your people operations</h1>
          <p className="muted">
            Unified portals for Admin, HR, Managers, and Employees with insights, actions, and chat assistance.
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="••••••••" required />
          </label>
          <button type="submit" className="primary">
            Continue
          </button>
          {error ? <p className="muted small">{error}</p> : null}
          <p className="muted small">
            New here? <NavLink to="/signup">Create an account</NavLink>
          </p>
        </form>
      </div>
    </div>
  )
}

function SignupPage() {
  const { signup, isAuthed, role } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const portal = data.get('portal')
    const result = await signup(name, email, password, portal)
    if (result.ok) navigate(`/portal/${result.role || portal}`)
  }

  if (isAuthed && role) return <Navigate to={`/portal/${role}`} replace />

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-hero">
          <p className="tag">Join HRive</p>
          <h1>Create your workspace access</h1>
          <p className="muted">
            Sign up with your company email and pick the portal you need. You can switch later if you have permissions.
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input name="name" type="text" placeholder="Jessica Doe" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="••••••••" required />
          </label>
          <label>
            Choose portal
            <select name="portal" defaultValue="employee">
              {portalKeys.map((p) => (
                <option key={p} value={p}>
                  {portalMeta[p].label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="primary">
            Create account
          </button>
          <p className="muted small">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  )
}

function DashboardPage() {
  const { portalId } = useParams()
  const { logout, role } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const portal = useMemo(() => {
    if (portalId && portalKeys.includes(portalId)) {
      return portalId
    }
    return role || 'hr'
  }, [portalId, role])

  if (role && portal !== role) {
    return <Navigate to={`/portal/${role}`} replace />
  }

  const canChat = portal === 'hr' || portal === 'employee'

  const stackData = salaryStacked[portal] ?? []
  const barKeys = stackData.length ? Object.keys(stackData[0]).filter((k) => k !== 'month') : []
  const barPalette = [deepBlue, '#f4c542', highlight]

  return (
    <DashboardShell portal={portal} onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">{portalMeta[portal].label} Portal</span>
      </div>

      <div className="hero-banner">
        <div>
          <p className="tag">{portalMeta[portal].label} Portal</p>
          <h2>{portalMeta[portal].greeting}</h2>
          <p className="muted">{portalMeta[portal].description}</p>
        </div>
        <div className="hero-quick">
          <span className="pill strong">Live</span>
          <span className="pill soft">SLA 99.9%</span>
          <span className="pill soft">Chatbot Active</span>
        </div>
      </div>

      <div className="content-grid">
        <div className="cards-grid">
          {metrics[portal].map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="chart-row">
          <ChartCard title="Income Analysis" subtitle="8% higher than last month">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={incomeSlices} dataKey="value" nameKey="name" innerRadius={45} outerRadius={85} paddingAngle={1}>
                  {incomeSlices.map((slice) => (
                    <Cell key={slice.name} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
            <div className="legend-text">
              {incomeSlices.map((slice) => (
                <span key={slice.name}>
                  <span className="dot" style={{ background: slice.color }} />
                  {slice.name} {slice.value}%
                </span>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Workload / Salary" subtitle="Stacks by month">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stackData} barSize={14}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                {barKeys.map((key, idx) => (
                  <Bar key={key} dataKey={key} stackId="salary" fill={barPalette[idx % barPalette.length]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
            <div className="pill-row">
              {activityPills.map((pill) => (
                <button key={pill} className="pill">
                  {pill}
                </button>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="bottom-grid">
          <ChartCard title="Total Salary by Unit" compact>
            <div className="unit-list">
              {incomeSlices.map((slice) => (
                <div key={slice.name} className="unit-row">
                  <span className="unit-name">{slice.name}</span>
                  <div className="unit-bar">
                    <div className="unit-bar-fill" style={{ width: `${slice.value}%`, background: slice.color }} />
                  </div>
                  <span className="unit-value">{slice.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="ToDo List" compact>
            <ul className="todo-list">
              {todoItems.map((item) => (
                <li key={item}>
                  <input type="checkbox" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ChartCard>

          <ChartCard title="Chatbot" subtitle={canChat ? 'HR & Employee assistant' : 'Available for HR/Employee'}>
            <ChatWidget portal={portal} />
          </ChartCard>
        </div>
      </div>
    </DashboardShell>
  )
}

export default App
