import React from 'react'

function ChartCard({ title, subtitle, children, compact }) {
  return (
    <section className={compact ? 'chart-card compact' : 'chart-card'}>
      <div className="chart-card-head">
        <div>
          <p className="chart-title">{title}</p>
          {subtitle ? <p className="chart-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      <div className="chart-body">{children}</div>
    </section>
  )
}

export default ChartCard
