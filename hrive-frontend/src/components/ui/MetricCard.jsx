import React from 'react'

function MetricCard({ label, value, caption }) {
  return (
    <div className="metric-card">
      <p className="metric-label">{label}</p>
      <h3 className="metric-value">{value}</h3>
      {caption ? <p className="metric-caption">{caption}</p> : null}
    </div>
  )
}

export default MetricCard
