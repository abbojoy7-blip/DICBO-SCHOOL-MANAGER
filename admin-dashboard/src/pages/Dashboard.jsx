import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';
import { useSettings } from '../context/SettingsContext';

export default function Dashboard() {
  const { settings } = useSettings();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCollected: 0,
    attendanceToday: 0,
    totalClasses: 0,
    teacherCount: 0,
    staffCount: 0,
    targetEnrollment: 0,
    targetRevenue: 0
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/reports/dashboard');
      setStats(response.data.stats);
      setRecent(response.data.recentPayments || []);
    } catch (err) {
      setError("Failed to load dashboard analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enrollmentTrend = useMemo(() => [
    {name:'Year 1', v: 85}, {name:'Year 2', v: 92}, {name:'Year 3', v: 78}, {name:'Year 4', v: 110}, {name:'Year 5', v: 95}, {name:'Year 6', v: 120}, {name:'Year 7', v: 88}, {name:'Year 8', v: 105}
  ], []);

  if (loading) return <LoadingState />;

  const enrollmentProgress = stats.targetEnrollment > 0 ? (stats.totalStudents / stats.targetEnrollment) * 100 : 0;
  const revenueProgress = stats.targetRevenue > 0 ? (stats.totalCollected / stats.targetRevenue) * 100 : 0;

  return (
    <div className="page-shell animate-fade">
      <div className="hero-card" style={{ background: 'var(--primary-navy)', border: 'none', borderRadius: '12px' }}>
        <div>
          <p className="eyebrow" style={{ color: 'var(--academic-gold)' }}>Institutional Dashboard</p>
          <h2 style={{ color: '#fff', fontSize: '32px' }}>{settings?.name || 'DIT INTERNATIONALSCHOOL'}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px', fontSize: '16px' }}>
            {settings?.motto || 'Academic Excellence • Trust • Discipline'}
          </p>
        </div>
        <div className="hero-badge" style={{ background: 'var(--academic-gold)', color: 'var(--primary-navy)', border: 'none' }}>
          ● SESSION ACTIVE: 2026/27
        </div>
      </div>

      <div className="stat-grid" style={{ marginTop: '20px' }}>
        <div className="panel-card stat-card">
          <div className="label">Student Enrollment</div>
          <div className="value">{stats.totalStudents}</div>
          <div style={{ marginTop: '12px', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(enrollmentProgress, 100)}%`, height: '100%', background: 'var(--academic-gold)' }} />
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>{Math.round(enrollmentProgress)}% of annual target</div>
        </div>

        <div className="panel-card stat-card">
          <div className="label">Financial Revenue</div>
          <div className="value" style={{ fontSize: '22px' }}>{settings?.currency} {stats.totalCollected.toLocaleString()}</div>
          <div style={{ marginTop: '12px', height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(revenueProgress, 100)}%`, height: '100%', background: 'var(--academic-gold)' }} />
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>{Math.round(revenueProgress)}% of collection target</div>
        </div>

        <div className="panel-card stat-card">
          <div className="label">Attendance Today</div>
          <div className="value">{stats.attendanceToday}%</div>
          <div style={{ fontSize: '11px', color: 'var(--success-green)', marginTop: '15px', fontWeight: 700 }}>HIGH PARTICIPATION</div>
        </div>

        <div className="panel-card stat-card">
          <div className="label">Human Capital</div>
          <div className="value">{stats.staffCount}</div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '15px' }}>{stats.teacherCount} Academic Staff</div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '20px' }}>
        <div className="panel-card">
          <div className="page-header" style={{ marginBottom: '24px' }}>
            <div><p className="eyebrow">Academic Growth</p><h3>Level Distribution</h3></div>
          </div>
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '0 10px' }}>
            {enrollmentTrend.map((item) => (
              <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '100%', height: '180px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: '30px', height: `${(item.v/150)*100}%`, backgroundColor: 'var(--primary-navy)', borderRadius: '4px 4px 0 0', opacity: 0.9 }} />
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p className="eyebrow">Quick Access</p>
            <h3 style={{ marginBottom: '20px' }}>Management Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={() => navigate('/dashboard/students/new')} className="btn btn-secondary" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎓</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>ADMISSION</span>
              </button>
              <button onClick={() => navigate('/dashboard/attendance')} className="btn btn-secondary" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🗓️</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>REGISTER</span>
              </button>
              <button onClick={() => navigate('/dashboard/fees/new')} className="btn btn-secondary" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>💰</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>PAYMENT</span>
              </button>
              <button onClick={() => navigate('/dashboard/reports')} className="btn btn-secondary" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>📊</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>REPORTS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
