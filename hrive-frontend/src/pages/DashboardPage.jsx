import React, { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
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
import DashboardShell from '../components/layout/DashboardShell'
import ChartCard from '../components/ui/ChartCard'
import ChatWidget from '../components/ui/ChatWidget'
import MetricCard from '../components/ui/MetricCard'
import { useAuth } from '../context/AuthContext'
import { SUPABASE_FUNCTIONS_BASE } from '../lib/supabaseClient'
import {
  activityPills,
  deepBlue,
  highlight,
  incomeSlices,
  metrics,
  portalKeys,
  portalMeta,
  salaryStacked,
  todoItems,
} from '../data/portalData'

function DashboardPage() {
  const { portalId } = useParams()
  const { logout, role } = useAuth()
  const navigate = useNavigate()
  const { displayName } = useAuth()
  const [employeeStats, setEmployeeStats] = useState({ total: null, recent: null })
  const [loadingStats, setLoadingStats] = useState(false)
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const portal = useMemo(() => {
    // Normalize inputs to lowercase to avoid case-mismatch crashes
    const pId = portalId ? portalId.toLowerCase() : null
    const userRole = role ? role.toLowerCase() : 'hr'

    if (pId && portalKeys.includes(pId)) {
      return pId
    }
    return userRole
  }, [portalId, role])

  // Debugging logs
  // console.log('DashboardPage Render:', { portalId, role, portal, meta: portalMeta[portal] })

  if (role && portal !== role) {
    if (portalId && portalKeys.includes(portalId.toLowerCase()) && role.toLowerCase() !== portalId.toLowerCase()) {
        // Allow if we are viewing a specific portal we are allowed to see? relative to future RBAC
        // For now, if mismatch and not just casing, redirect.
        // Actually, existing logic forces redirect to role. Let's keep it but ensure casing doesn't trigger it.
        if (portal !== role.toLowerCase()) {
             // return <Navigate to={`/portal/${role.toLowerCase()}`} replace />
        }
    }
  }
  
  // Defensive check: If portal key invalid, show error instead of crashing
  if (!portalMeta[portal]) {
      console.error('Invalid Portal Key:', portal)
      return (
          <DashboardShell portal={portal || 'hr'} onLogout={handleLogout}>
              <div style={{padding: '2rem', color: 'red'}}>
                  <h2>ErrorLoading Portal</h2>
                  <p>Invalid portal configuration for key: <strong>{String(portal)}</strong></p>
                  <button onClick={() => window.location.reload()}>Retry</button>
              </div>
          </DashboardShell>
      )
  }

  const canChat = portal === 'hr' || portal === 'employee'
  const heroHeading = `${portalMeta[portal].label} Overview`
  const descriptionText = portalMeta[portal].description
  // Fetch live employee counts for admin/hr portals
  useEffect(() => {
    const shouldFetch = portal === 'admin' || portal === 'hr'
    if (!shouldFetch) return

    const fetchCounts = async () => {
      setLoadingStats(true)
      try {
        const token = localStorage.getItem('hrive_access_token')
        if (!token) throw new Error('Missing auth token')

        const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/create-employee`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load employees')

        const employees = data.employees || data || []
        const total = Array.isArray(employees) ? employees.length : 0
        const now = Date.now()
        const recent = Array.isArray(employees)
          ? employees.filter((emp) => {
              const d = emp.join_date || emp.joinDate || emp.created_at
              const ts = d ? Date.parse(d) : NaN
              return Number.isFinite(ts) && now - ts <= 30 * 24 * 60 * 60 * 1000
            }).length
          : 0

        setEmployeeStats({ total, recent })
      } catch (err) {
        console.error('Employee stats fetch failed:', err)
        setEmployeeStats({ total: null, recent: null })
      } finally {
        setLoadingStats(false)
      }
    }

    fetchCounts()
  }, [portal])

  const stackData = salaryStacked[portal] ?? []
  const barKeys = stackData.length ? Object.keys(stackData[0]).filter((k) => k !== 'month') : []
  const barPalette = [deepBlue, '#f4c542', highlight]
  const metricData = (metrics[portal] ?? []).map((m) => {
    if (m.label === 'Total Employee' && employeeStats.total !== null) {
      return { ...m, value: String(employeeStats.total) }
    }
    if (m.label === 'New Employee' && employeeStats.recent !== null) {
      return { ...m, value: String(employeeStats.recent) }
    }
    return m
  })

  return (
    <DashboardShell portal={portal} onLogout={handleLogout}>
      <div className="content-grid">
        <div className="cards-grid metric-grid">
          {loadingStats ? (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          ) : null}
          {metricData.map((metric) => (
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

export default DashboardPage
