import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { seed } from '../data/sampleData';
import { syncDemoData } from '../data/demoData';

const roles = [
  { key: 'administrator', title: 'Administrator', subtitle: 'Governance, admissions, attendance, fees', route: '/dashboard', accent: '#2563eb' },
  { key: 'teacher', title: 'Teacher', subtitle: 'Classes, attendance, marks, homework', route: '/teacher', accent: '#10b981' },
  { key: 'student', title: 'Student', subtitle: 'Timetable, results, attendance, profile', route: '/student', accent: '#8b5cf6' },
  { key: 'parent', title: 'Parent', subtitle: 'Child progress, fees, communications', route: '/parent', accent: '#f59e0b' },
  { key: 'finance', title: 'Finance', subtitle: 'Payments, receipts, balances', route: '/finance', accent: '#ef4444' },
  { key: 'librarian', title: 'Librarian', subtitle: 'Catalogues, issue and returns', route: '/librarian', accent: '#0f766e' },
  { key: 'transport', title: 'Transport', subtitle: 'Routes, vehicles, assignments', route: '/transport', accent: '#7c3aed' }
];

const demoAccounts = [
  { role: 'Administrator', email: 'admin@demo.com' },
  { role: 'Teacher', email: 'teacher@demo.com' },
  { role: 'Student', email: 'student@demo.com' },
  { role: 'Parent', email: 'parent@demo.com' },
  { role: 'Finance', email: 'finance@demo.com' },
  { role: 'Librarian', email: 'librarian@demo.com' },
  { role: 'Transport', email: 'transport@demo.com' }
];

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const enterRole = async (roleKey, route) => {
    seed();
    syncDemoData();
    const demoEmail = `${roleKey === 'administrator' ? 'admin' : roleKey}@demo.com`;
    try {
      await login(demoEmail, 'demo1234');
      navigate(route);
    } catch (e) {
      navigate(route);
    }
  };

  return (
    <div className="login-shell" style={{ padding: 24 }}>
      <div className="login-card" style={{ maxWidth: 1180, width: '100%', display: 'grid', gap: 20 }}>
        <div className="login-hero" style={{ padding: 28 }}>
          <div>
            <div className="demo-pill">● Demo Mode • Sample data only</div>
            <h1 style={{ fontSize: 34, margin: '16px 0 10px' }}>DICBO School Manager</h1>
            <p style={{ color: 'rgba(255,255,255,.88)', maxWidth: 620 }}>A polished School Management System demo for boards, donors, school administrators, and partner presentations.</p>
          </div>
          <div className="notice" style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1px solid rgba(255,255,255,.18)' }}>
            <strong>Explore every portal</strong>
            <div style={{ marginTop: 6 }}>Select a role and step into a complete, presentation-ready workflow.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, padding: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">Role selection</p>
              <h2 style={{ fontSize: 24, margin: 0 }}>Select a Role to Explore</h2>
            </div>
            <div className="notice">All demo accounts use password <strong>demo1234</strong></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {roles.map((role) => (
              <button key={role.key} className="panel-card" onClick={() => enterRole(role.key, role.route)} style={{ textAlign: 'left', cursor: 'pointer', border: `1px solid ${role.accent}20`, boxShadow: '0 10px 24px rgba(15,23,42,.06)' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{role.title}</div>
                <div style={{ color: '#64748b', marginTop: 6 }}>{role.subtitle}</div>
                <div style={{ marginTop: 10, color: role.accent, fontWeight: 700 }}>Open portal →</div>
              </button>
            ))}
          </div>

          <div className="panel-card" style={{ padding: 16 }}>
            <div className="eyebrow">Demo accounts</div>
            <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginTop: 8 }}>
              {demoAccounts.map((account) => (
                <div key={account.email} style={{ padding: '10px 12px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <strong>{account.role}</strong>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{account.email}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
