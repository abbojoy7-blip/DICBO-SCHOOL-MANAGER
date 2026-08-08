import React from 'react';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { settings } = useSettings();

  const versionInfo = {
    productName: "DIT ERP",
    version: "1.0.0",
    release: "Production",
    releaseDate: new Date().toLocaleDateString(),
    developer: "Dot Inspiration Technologies"
  };

  return (
    <div className="page-shell animate-fade">
      <div className="page-header">
        <div>
          <p className="eyebrow">Institutional Software</p>
          <h2>About DIT INTERNATIONALSCHOOL ERP</h2>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: 'center', padding: '50px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 90, height: 90, borderRadius: 12, background: 'var(--primary-navy)', display: 'grid', placeItems: 'center', color: 'var(--academic-gold)', fontSize: 44, fontWeight: 900, margin: '0 auto 24px', border: '2px solid var(--academic-gold)' }}>DIT</div>
          <h1 style={{ fontSize: 36, marginBottom: 12, color: 'var(--primary-navy)' }}>{settings?.name || 'DIT INTERNATIONALSCHOOL'}</h1>
          <p style={{ color: '#64748b', fontSize: 18, maxWidth: '600px', margin: '0 auto' }}>The premier Enterprise Resource Planning (ERP) solution for modern international educational institutions.</p>
        </div>

        <div style={{ padding: '40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            <div>
              <h3 style={{ marginBottom: 20, color: 'var(--primary-navy)' }}>Global Capabilities</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14, color: '#475569', fontSize: 15 }}>
                <li><span style={{ color: 'var(--academic-gold)', fontWeight: 800 }}>✓</span> Multi-tenant school isolation architecture</li>
                <li><span style={{ color: 'var(--academic-gold)', fontWeight: 800 }}>✓</span> Advanced institutional financial management</li>
                <li><span style={{ color: 'var(--academic-gold)', fontWeight: 800 }}>✓</span> Holistic learner profiling & admissions</li>
                <li><span style={{ color: 'var(--academic-gold)', fontWeight: 800 }}>✓</span> Real-time attendance participation tracking</li>
                <li><span style={{ color: 'var(--academic-gold)', fontWeight: 800 }}>✓</span> Enterprise-grade security & audit logs</li>
              </ul>
            </div>

            <div style={{ background: 'var(--light-bg)', padding: 30, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ marginBottom: 20, color: 'var(--primary-navy)' }}>Release Intelligence</h3>
              <div style={{ display: 'grid', gap: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>VERSION</span>
                  <strong style={{ color: 'var(--primary-navy)' }}>{versionInfo.version}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>STATUS</span>
                  <span className="badge badge-success">Production Stable</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>CORE BUILD</span>
                  <strong style={{ color: 'var(--primary-navy)' }}>MERN-E</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>ENCRYPTION</span>
                  <strong style={{ color: 'var(--primary-navy)' }}>AES-256 / BCRYPT</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 50, color: '#94a3b8', fontSize: 14 }}>
          <p>This institutional software is powered by <strong>{versionInfo.developer}</strong></p>
          <p style={{ marginTop: 8, fontSize: 12 }}>© 2026 DIT INTERNATIONALSCHOOL • ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
}
