import React from 'react'
import { NavLink } from 'react-router-dom'
import { navByPortal, portalMeta } from '../../data/portalData'

function Sidebar({ portal, onLogout }) {
  const items = navByPortal[portal] ?? []
  
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo.jpg" alt="Logo" className="brand-logo" />
        <div className="brand-name">Logo</div>
      </div>
      <div className="user-card">
        <div className="avatar">{portalMeta[portal]?.label?.[0] ?? '?'}</div>
        <div>
          <p className="user-name">{portalMeta[portal]?.greeting ?? 'Welcome'}</p>
          <p className="user-role">{portalMeta[portal]?.description ?? ''}</p>
        </div>
      </div>
      <div className="sidenav desktop-only">
        <div className="sidenav-section">
          <p className="sidenav-title">{portalMeta[portal]?.label ?? 'Portal'}</p>
          {items.map((item, idx) =>
            idx === 0 ? (
              <NavLink key={item.label} to={`/portal/${portal}`} className="sidenav-item">
                {item.label}
              </NavLink>
            ) : (
              <NavLink key={item.label} to={`/portal/${portal}/${item.path}`} className="sidenav-item">
                {item.label}
              </NavLink>
            ),
          )}
        </div>
      </div>
      {onLogout ? (
        <div style={{ marginTop: 'auto' }}>
           <button onClick={onLogout} className="logout desktop-only" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
              Logout
           </button>
        </div>
      ) : null}
    </aside>
  )
}

export default Sidebar
