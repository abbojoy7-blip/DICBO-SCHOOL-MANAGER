import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const u = await login(email, password);
      const roleMap = {
        administrator: '/dashboard',
        teacher: '/teacher',
        accountant: '/finance',
        receptionist: '/dashboard',
        parent: '/parent',
        student: '/student'
      };
      navigate(roleMap[u.role] || '/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-shell" style={{ backgroundColor: 'var(--primary-navy)', background: 'linear-gradient(135deg, #0B1F3A 0%, #163D6B 100%)' }}>
      <div className="login-card" style={{ maxWidth: '450px', gridTemplateColumns: '1fr', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '70px', height: '70px', background: 'var(--academic-gold)', color: 'var(--primary-navy)', borderRadius: '12px', margin: '0 auto 20px', display: 'grid', placeItems: 'center', fontSize: '36px', fontWeight: 900 }}>D</div>
          <h2 style={{ color: 'var(--primary-navy)', fontSize: '24px', fontWeight: 800 }}>DIT INTERNATIONALSCHOOL</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Global Education Management System</p>
        </div>

        <form className="login-form" onSubmit={submit} style={{ padding: 0 }}>
          {error && (
            <div style={{ color: 'var(--error-burgundy)', backgroundColor: '#fdf2f2', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', textAlign: 'center', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', color: '#64748b' }}>Account Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@dit.edu"
              required
              style={{ marginTop: '6px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', color: '#64748b' }}>Security Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
              style={{ marginTop: '6px' }}
            />
          </div>

          <button disabled={authLoading} className="btn btn-primary" style={{ width: '100%', padding: '14px', background: 'var(--primary-navy)' }}>
            {authLoading ? 'Verifying Access...' : 'Sign In to Portal'}
          </button>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              DIT ERP v1.0.0 • Production Stable
            </p>
            <p style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', fontWeight: 600 }}>
              Powered By Dot Inspiration Technologies
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
