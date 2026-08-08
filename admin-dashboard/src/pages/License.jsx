import React from 'react';

export default function License() {
  return (
    <div className="page-shell animate-fade">
      <div className="page-header">
        <div>
          <p className="eyebrow">Legal & Compliance</p>
          <h2>Enterprise Software License</h2>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: 900 }}>
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 20, color: 'var(--primary-navy)' }}>Proprietary Rights</h3>
          <div style={{ display: 'grid', gap: 14, background: 'var(--light-bg)', padding: 30, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontWeight: 700, fontSize: 13 }}>PLATFORM</span>
              <strong style={{ color: 'var(--primary-navy)' }}>DIT INTERNATIONALSCHOOL ERP</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontWeight: 700, fontSize: 13 }}>LEGAL OWNER</span>
              <strong style={{ color: 'var(--primary-navy)' }}>Dot Inspiration Technologies</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontWeight: 700, fontSize: 13 }}>LICENSE TYPE</span>
              <strong style={{ color: 'var(--academic-gold)' }}>COMMERCIAL ENTERPRISE</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b', fontWeight: 700, fontSize: 13 }}>RESTRICTIONS</span>
              <strong style={{ color: 'var(--error-burgundy)' }}>PROPRIETARY / NO REDISTRIBUTION</strong>
            </div>
          </div>
        </div>

        <div style={{ color: '#475569', fontSize: 15, lineHeight: 1.8 }}>
          <h4 style={{ color: 'var(--primary-navy)', marginBottom: 12 }}>Usage Agreement</h4>
          <p style={{ marginBottom: 20 }}>
            This Enterprise Resource Planning (ERP) software is the exclusive property of Dot Inspiration Technologies.
            The system is licensed for the internal operations of DIT INTERNATIONALSCHOOL.
            Any attempt to copy, modify, distribute, or reverse-engineer this platform without explicit written
            authorization is a violation of international intellectual property laws.
          </p>
          <p style={{ marginBottom: 20 }}>
            The license covers the core modules, security infrastructure, and institutional data management layers
            provided in version 1.0.0.
          </p>
        </div>

        <div style={{ marginTop: 50, borderTop: '1px solid var(--border-subtle)', paddingTop: 30 }}>
          <h4 style={{ color: 'var(--primary-navy)', marginBottom: 12 }}>Legal & Technical Support</h4>
          <div style={{ display: 'grid', gap: 8, fontSize: 15 }}>
            <span style={{ color: '#475569' }}>📧 Compliance: legal@dotinspiration.tech</span>
            <span style={{ color: '#475569' }}>🌐 Repository: git.dotinspiration.tech/dit-erp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
