import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { navByPortal, navSectionsByPortal, portalMeta } from '../../data/portalData'
import { useAuth } from '../../context/AuthContext'

function Topbar({ portal, onLogout }) {
  const [open, setOpen] = useState(false)
  const { displayName } = useAuth()
  const navigate = useNavigate()
  const items = navByPortal[portal] ?? []
  const sections = navSectionsByPortal[portal] ?? []
  const drawerSections = sections.length ? sections : [{ title: 'Menu', items }]
  const headingText = null // remove heading in top bar; only search stays
  const greetingText = displayName ? `Welcome, ${displayName}` : portalMeta[portal]?.greeting ?? 'Welcome'
  const defaultOpenTitle = useMemo(() => {
    if (!drawerSections.length) return null
    return drawerSections.find((section) => section.title === 'Overview')?.title ?? drawerSections[0].title
  }, [drawerSections])
  const [openSection, setOpenSection] = useState(defaultOpenTitle)

  const toggle = () => setOpen((o) => !o)
  const goTo = (path) => {
    setOpen(false)
    if (!path) {
      navigate(`/portal/${portal}`)
    } else {
      navigate(`/portal/${portal}/${path}`)
    }
  }

  useEffect(() => {
    setOpenSection(defaultOpenTitle)
  }, [defaultOpenTitle, portal])

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger-btn mobile-only" onClick={toggle} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
        <div className="topbar-greeting">{greetingText}</div>
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
        <div className="drawer-sections">
          {drawerSections.map((section) => (
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
                <div className="dropdown-nav">
                  {section.items.map((item) => (
                    <button key={item.label} onClick={() => goTo(item.path)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
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
