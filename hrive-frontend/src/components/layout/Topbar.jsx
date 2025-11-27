import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { navByPortal, portalMeta } from '../../data/portalData'

function Topbar({ portal, onLogout }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const items = navByPortal[portal] ?? []

  const toggle = () => setOpen((o) => !o)
  const goTo = (path) => {
    setOpen(false)
    if (!path) {
      navigate(`/portal/${portal}`)
    } else {
      navigate(`/portal/${portal}/${path}`)
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger-btn mobile-only" onClick={toggle} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
        <div>
          <p className="crumb">Lucid / Index</p>
          <h2 className="heading">{portalMeta[portal]?.label ?? 'Dashboard'}</h2>
        </div>
      </div>
      <div className="topbar-search">
        <input placeholder="Search here..." />
      </div>
      <div className="topbar-actions simple">
        {onLogout ? (
          <button className="logout topbar-logout desktop-only" onClick={onLogout}>
            Logout
          </button>
        ) : null}
      </div>
      <div className={`mobile-drawer-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="drawer-title">{portalMeta[portal]?.label ?? 'Portal'}</div>
          <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </button>
        </div>
        <div className="dropdown-nav">
          {items.map((item) => (
            <button key={item.label} onClick={() => goTo(item.path)}>
              {item.label}
            </button>
          ))}
        </div>
        {onLogout ? (
          <button
            className="logout mobile-logout"
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  )
}

export default Topbar
