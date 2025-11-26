import React from 'react'
import { portalMeta } from '../../data/portalData'

function Topbar({ portal, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button">☰</button>
        <div>
          <p className="crumb">Lucid / Index</p>
          <h2 className="heading">{portalMeta[portal]?.label ?? 'Dashboard'}</h2>
        </div>
      </div>
      <div className="topbar-search">
        <input placeholder="Search here..." />
      </div>
      <div className="topbar-actions">
        <div className="stat-group">
          <span className="stat-label">Visitors</span>
          <span className="stat-value">1,784</span>
        </div>
        <div className="stat-group">
          <span className="stat-label">Visits</span>
          <span className="stat-value">325</span>
        </div>
        <div className="stat-group">
          <span className="stat-label">Chats</span>
          <span className="stat-value">13</span>
        </div>
        <div className="avatar badge">{portalMeta[portal]?.label?.[0] ?? '?'}</div>
        {onLogout ? (
          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        ) : null}
      </div>
    </header>
  )
}

export default Topbar
