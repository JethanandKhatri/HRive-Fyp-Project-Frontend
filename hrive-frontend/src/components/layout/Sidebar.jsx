import React from 'react'
import { NavLink } from 'react-router-dom'
import { navByPortal, portalMeta } from '../../data/portalData'

function Sidebar({ portal }) {
  const items = navByPortal[portal] ?? []
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">A</div>
        <div className="brand-name">HRive</div>
      </div>
      <div className="user-card">
        <div className="avatar">{portalMeta[portal]?.label?.[0] ?? '?'}</div>
        <div>
          <p className="user-name">{portalMeta[portal]?.greeting ?? 'Welcome'}</p>
          <p className="user-role">{portalMeta[portal]?.description ?? ''}</p>
        </div>
      </div>
      <div className="sidenav">
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
    </aside>
  )
}

export default Sidebar
