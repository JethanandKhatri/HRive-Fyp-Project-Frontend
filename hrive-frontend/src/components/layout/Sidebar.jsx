import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navByPortal, navSectionsByPortal, portalMeta } from '../../data/portalData'

function Sidebar({ portal, onLogout }) {
  const items = navByPortal[portal] ?? []
  const sections = navSectionsByPortal[portal] ?? []
  const portalLabel = portalMeta[portal]?.label ?? 'Portal'
  const navSections = sections.length ? sections : [{ title: 'Menu', items }]
  const defaultOpenTitle = useMemo(() => {
    if (!navSections.length) return null
    return navSections.find((section) => section.title === 'Overview')?.title ?? navSections[0].title
  }, [navSections])
  const [openSection, setOpenSection] = useState(defaultOpenTitle)

  useEffect(() => {
    setOpenSection(defaultOpenTitle)
  }, [defaultOpenTitle, portal])
  
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
              <button
                type="button"
                className="sidenav-group-toggle"
                onClick={() => setOpenSection((prev) => (prev === section.title ? null : section.title))}
                aria-expanded={openSection === section.title}
              >
                <span>{section.title}</span>
                <span className={`chevron ${openSection === section.title ? 'open' : ''}`} aria-hidden="true" />
              </button>
              {openSection === section.title ? (
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
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {/* Desktop logout removed as requested; mobile logout remains in Topbar drawer */}
    </aside>
  )
}

export default Sidebar
