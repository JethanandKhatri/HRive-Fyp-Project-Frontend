import React from 'react'
import { NavLink } from 'react-router-dom'
import { navByPortal, navSectionsByPortal, portalMeta } from '../../data/portalData'

function Sidebar({ portal, onLogout }) {
  const items = navByPortal[portal] ?? []
  const sections = navSectionsByPortal[portal] ?? []
  const portalLabel = portalMeta[portal]?.label ?? 'Portal'
  const navSections = sections.length ? sections : [{ title: 'Menu', items }]
  
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/logo-2.jpeg" alt="Logo" className="brand-logo" />
        <div className="brand-name">HRive</div>
      </div>
      {/* User card removed as requested */}
      <div className="sidenav desktop-only">
        <p className="sidenav-title">{portalLabel}</p>
        <div className="sidenav-groups">
          {navSections.map((section) => (
            <div className="sidenav-group" key={section.title}>
              <p className="sidenav-group-title">{section.title}</p>
              <div className="sidenav-group-items">
                {section.items.map((item) => {
                  const to = item.path ? `/portal/${portal}/${item.path}` : `/portal/${portal}`
                  return (
                    <NavLink key={item.label} to={to} className="sidenav-item">
                      {item.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Desktop logout removed as requested; mobile logout remains in Topbar drawer */}
    </aside>
  )
}

export default Sidebar
