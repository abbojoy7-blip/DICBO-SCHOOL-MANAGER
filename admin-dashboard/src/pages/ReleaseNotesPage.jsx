import React from 'react';

export default function ReleaseNotesPage() {
  const releases = [
    {
      version: "1.0.0",
      type: "Production Release",
      date: "August 2026",
      features: [
        "Full Multi-tenant school isolation",
        "Guided School Onboarding Wizard",
        "Professional Financial Budgeting module",
        "Large-scale student enrollment performance optimization",
        "Executive Dashboard with target tracking",
        "Super Admin platform oversight panel"
      ],
      security: [
        "Infrastructure protection with Helmet.js",
        "API Rate Limiting for brute-force prevention",
        "Strict school-scoped JWT token validation",
        "Comprehensive Audit Logging for all admin actions"
      ],
      performance: [
        "Gzip compression enabled for all API responses",
        "Compound database indexes for instant large-data search",
        "Optimized frontend build with asset minification"
      ]
    }
  ];

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Product History</p>
          <h2>Release Notes</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {releases.map(rel => (
          <div key={rel.version} className="panel-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #f1f5f9', paddingBottom: 15 }}>
              <div>
                <h3 style={{ fontSize: 24 }}>Version {rel.version}</h3>
                <span className="badge badge-success" style={{ marginTop: 5 }}>{rel.type}</span>
              </div>
              <div style={{ color: '#64748b', fontWeight: 600 }}>{rel.date}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 30 }}>
              <div>
                <h4 style={{ color: '#2563eb', marginBottom: 12 }}>New Features</h4>
                <ul style={{ paddingLeft: 18, color: '#475569', fontSize: 14, display: 'grid', gap: 8 }}>
                  {rel.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#10b981', marginBottom: 12 }}>Security</h4>
                <ul style={{ paddingLeft: 18, color: '#475569', fontSize: 14, display: 'grid', gap: 8 }}>
                  {rel.security.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#f59e0b', marginBottom: 12 }}>Performance</h4>
                <ul style={{ paddingLeft: 18, color: '#475569', fontSize: 14, display: 'grid', gap: 8 }}>
                  {rel.performance.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
