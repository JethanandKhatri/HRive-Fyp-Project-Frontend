import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import DashboardShell from '../components/layout/DashboardShell'
import ChartCard from '../components/ui/ChartCard'
import { navByPortal, portalKeys, portalMeta } from '../data/portalData'
import { useAuth } from '../context/AuthContext'

function SectionPage() {
  const { portalId, section } = useParams()
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  if (!portalId || !portalKeys.includes(portalId)) {
    return <Navigate to={`/portal/${role || 'hr'}`} replace />
  }
  if (role && portalId !== role) {
    return <Navigate to={`/portal/${role}`} replace />
  }

  useEffect(() => {
    setLoading(true)
    setError('')
    const mockItems = ['Item A', 'Item B', 'Item C']
    setItems(mockItems)
    setLoading(false)
  }, [portalId, section])

  const title = (navByPortal[portalId] || []).find((n) => n.path === section)?.label || section

  return (
    <DashboardShell portal={portalId} onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">{portalMeta[portalId]?.label} Portal</span>
      </div>
      <div className="hero-banner">
        <div>
          <p className="tag">{portalMeta[portalId]?.label} / {title}</p>
          <h2>{title}</h2>
          <p className="muted">This page currently shows local mock data (no backend connected).</p>
        </div>
      </div>
      <div className="content-grid">
        <ChartCard title={title} subtitle="Loaded locally (mock data)">
          {loading ? (
            <p className="muted">Loading...</p>
          ) : error ? (
            <p className="muted">Error: {error}</p>
          ) : items.length === 0 ? (
            <p className="muted">No items.</p>
          ) : (
            <ul className="list">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </ChartCard>
      </div>
    </DashboardShell>
  )
}

export default SectionPage
