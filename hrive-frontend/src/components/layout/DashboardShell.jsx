import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function DashboardShell({ portal, onLogout, children }) {
  return (
    <div className="page">
      <Sidebar portal={portal} />
      <main className="page-content">
        <Topbar portal={portal} onLogout={onLogout} />
        {children}
      </main>
    </div>
  )
}

export default DashboardShell
