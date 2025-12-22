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
import MetricCard from '../components/ui/MetricCard'
import { useAuth } from '../context/AuthContext'
import { SUPABASE_FUNCTIONS_BASE } from '../lib/supabaseClient'
import {
  activityPills,
  deepBlue,
  highlight,
  hrActivities,
  hrApplicants,
  hrAttendanceStats,
  hrBirthdays,
  hrClockRows,
  hrDepartmentStats,
  hrEvents,
  hrHiringPipeline,
  hrStatusBreakdown,
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
  const isHr = portal === 'hr'
  const hrStatusTotal = hrStatusBreakdown.reduce((sum, item) => sum + item.value, 0)
  const stageSteps = ['Screening', 'Review', 'Interview', 'Offer']
  const attendanceValues = hrAttendanceStats.map((stat) => stat.value)
  const onTimePct = attendanceValues[0] ?? 0
  const latePct = attendanceValues[1] ?? 0
  const absentPct = attendanceValues[2] ?? 0
  const attendanceGradient = `conic-gradient(${hrAttendanceStats[0].color} 0 ${onTimePct}%, ${hrAttendanceStats[1].color} ${onTimePct}% ${
    onTimePct + latePct
  }%, ${hrAttendanceStats[2].color} ${onTimePct + latePct}% 100%)`
  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  const stageTone = {
    Interview: 'tone-blue',
    Review: 'tone-slate',
    Offer: 'tone-green',
    Screening: 'tone-amber',
  }
  const pipelineMax = Math.max(...hrHiringPipeline.map((step) => step.count))
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
          {isHr ? (
            <>
              <ChartCard title="Employee by Department" subtitle="Active headcount">
                <div className="hr-bar-list">
                  {hrDepartmentStats.map((dept) => (
                    <div key={dept.label} className="hr-bar-row">
                      <span className="hr-bar-label">{dept.label}</span>
                      <div className="hr-bar-track">
                        <div className="hr-bar-fill" style={{ width: `${dept.value}%`, background: dept.color }} />
                      </div>
                      <span className="hr-bar-value">{dept.value}%</span>
                    </div>
                  ))}
                </div>
              </ChartCard>
              <ChartCard title="Employee Status" subtitle="Current distribution">
                <div className="hr-status-bar">
                  {hrStatusBreakdown.map((item) => (
                    <span
                      key={item.label}
                      className="hr-status-seg"
                      style={{ width: `${(item.value / hrStatusTotal) * 100}%`, background: item.color }}
                    />
                  ))}
                </div>
                <div className="hr-status-list">
                  {hrStatusBreakdown.map((item) => (
                    <div key={item.label} className="hr-status-item">
                      <span className="hr-dot" style={{ background: item.color }} />
                      <span className="hr-status-label">{item.label}</span>
                      <span className="hr-status-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </>
          ) : (
            <>
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
                      <Bar
                        key={key}
                        dataKey={key}
                        stackId="salary"
                        fill={barPalette[idx % barPalette.length]}
                        radius={[4, 4, 0, 0]}
                      />
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
            </>
          )}
        </div>

        {isHr ? (
          <div className="bottom-grid">
            <ChartCard title="Attendance Overview" compact>
              <div className="hr-attendance-visual">
                <div className="hr-ring" style={{ background: attendanceGradient }}>
                  <div className="hr-ring-center">
                    <div className="hr-ring-value">{onTimePct}%</div>
                    <div className="hr-ring-label">On time</div>
                  </div>
                </div>
                <div className="hr-chip-row">
                  {hrAttendanceStats.map((stat) => (
                    <div key={stat.label} className="hr-chip">
                      <span className="hr-chip-dot" style={{ background: stat.color }} />
                      <span className="hr-chip-value">{stat.value}%</span>
                      <span className="hr-chip-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
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

            <ChartCard title="Clock In/Out" compact>
              <div className="hr-clock-header">
                <button className="hr-filter-pill">All Departments</button>
                <button className="hr-filter-pill">Today</button>
              </div>
              <ul className="hr-clock-list">
                {hrClockRows.map((row) => (
                  <li key={row.name}>
                    <div className="hr-clock-main">
                      <span className="hr-avatar">{getInitials(row.name)}</span>
                      <div className="hr-clock-info">
                        <span className="hr-clock-name">{row.name}</span>
                        <span className="hr-clock-role">{row.role}</span>
                      </div>
                    </div>
                    <span className={`hr-clock-time ${row.status === 'In' ? 'in' : 'out'}`}>{row.time}</span>
                  </li>
                ))}
              </ul>
              <div className="hr-clock-foot">
                <span className="hr-legend-dot in" />
                <span>Clock In</span>
                <span className="hr-legend-dot out" />
                <span>Clock Out</span>
              </div>
            </ChartCard>

            <ChartCard title="Job Applicants" compact>
              <ul className="hr-people-list">
                {hrApplicants.map((applicant) => {
                  const stageIndex = stageSteps.indexOf(applicant.stage)
                  return (
                  <li key={applicant.name}>
                    <div className="hr-people-main">
                      <span className="hr-avatar">{getInitials(applicant.name)}</span>
                      <div className="hr-people-info">
                        <span className="hr-people-name">{applicant.name}</span>
                        <span className="hr-people-role">{applicant.role}</span>
                        <div className="hr-stage-track">
                          {stageSteps.map((step, idx) => (
                            <span
                              key={step}
                              className={`hr-stage-dot ${idx <= stageIndex ? 'active' : ''}`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`hr-people-stage ${stageTone[applicant.stage] ?? ''}`}>{applicant.stage}</span>
                  </li>
                )})}
              </ul>
            </ChartCard>

            <ChartCard title="Hiring Pipeline" compact>
              <div className="hr-funnel">
                {hrHiringPipeline.map((step) => (
                  <div key={step.stage} className="hr-funnel-row">
                    <span className="hr-funnel-label">{step.stage}</span>
                    <div className="hr-funnel-track">
                      <div
                        className="hr-funnel-fill"
                        style={{ width: `${(step.count / pipelineMax) * 100}%`, background: step.color }}
                      />
                    </div>
                    <span className="hr-funnel-count">{step.count}</span>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard title="Upcoming Events" compact>
              <ul className="hr-timeline">
                {hrEvents.map((event) => (
                  <li key={event.title}>
                    <span className="hr-timeline-dot" aria-hidden="true" />
                    <div className="hr-timeline-body">
                      <span className="hr-activity-title">{event.title}</span>
                      <span className="hr-activity-time">{event.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </ChartCard>

            <ChartCard title="Recent Activity" compact>
              <ul className="hr-timeline">
                {hrActivities.map((activity) => (
                  <li key={activity.title}>
                    <span className="hr-timeline-dot" aria-hidden="true" />
                    <div className="hr-timeline-body">
                      <span className="hr-activity-title">{activity.title}</span>
                      <span className="hr-activity-time">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </ChartCard>

            <ChartCard title="Birthdays" compact>
              <ul className="hr-birthday-list">
                {hrBirthdays.map((person) => (
                  <li key={person.name}>
                    <div className="hr-birthday-main">
                      <span className="hr-avatar hr-avatar-sun">{getInitials(person.name)}</span>
                      <div className="hr-birthday-info">
                        <span className="hr-birthday-name">{person.name}</span>
                        <span className="hr-birthday-role">{person.role}</span>
                      </div>
                    </div>
                    <span className="hr-birthday-date">{person.date}</span>
                  </li>
                ))}
              </ul>
            </ChartCard>
          </div>
        ) : (
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
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

export default DashboardPage
