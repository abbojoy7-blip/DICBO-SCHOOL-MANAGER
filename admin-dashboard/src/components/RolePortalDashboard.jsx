
export default function RolePortalDashboard({ title, subtitle, badge, stats = [], chartData = [], recent = [] }) {
  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Portal overview</p>
          <h2 className="hero-card__title">{title}</h2>
          <p className="hero-card__subtitle">{subtitle}</p>
        </div>
        <div className="hero-badge">{badge}</div>
      </div>

      <div className="stat-grid">
        {stats.map((item) => (
          <div key={item.label} className="stat-card">
            <div className="label">{item.label}</div>
            <div className="value counter">{item.value}</div>
            <div className="delta">{item.delta}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="table-card">
          <div className="page-header" style={{ marginBottom: 12 }}>
            <div>
              <p className="eyebrow">Performance</p>
              <h3>Weekly pulse</h3>
            </div>
          </div>
          <div style={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 12, paddingTop: 16 }}>
            {chartData.map((item) => (
              <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: 28, height: `${Math.max(20, item.value * 8)}px`, background: 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)', borderRadius: 8 }} />
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="list-card">
          <div className="page-header" style={{ marginBottom: 12 }}>
            <div>
              <p className="eyebrow">Recent activity</p>
              <h3>Latest updates</h3>
            </div>
          </div>
          <ul>
            {recent.map((item, index) => (
              <li key={index}>
                <div>
                  <strong>{item.title}</strong>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{item.detail}</div>
                </div>
                <span style={{ color: '#2563eb', fontWeight: 700 }}>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
