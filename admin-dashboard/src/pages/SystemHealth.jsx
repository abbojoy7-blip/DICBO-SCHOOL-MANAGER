import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function SystemHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await api.get('/system/health');
      setHealth(res.data.health);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading) return <LoadingState message="Connecting to system core..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Platform Monitor</p>
          <h2>System Health & Status</h2>
        </div>
        <button className="btn btn-primary" onClick={fetchHealth}>Refresh Status</button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">API Status</div>
          <div className="value" style={{ color: '#10b981' }}>{health?.api}</div>
        </div>
        <div className="stat-card">
          <div className="label">Database</div>
          <div className="value" style={{ color: '#10b981' }}>{health?.database}</div>
        </div>
        <div className="stat-card">
          <div className="label">Storage</div>
          <div className="value" style={{ color: '#10b981' }}>{health?.storage}</div>
        </div>
        <div className="stat-card">
          <div className="label">Server Load</div>
          <div className="value">Normal</div>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: 800 }}>
        <h3>Platform Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 20 }}>
          <div style={{ display: 'grid', gap: 15 }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>Application Version</span>
              <strong>{health?.version} (Production)</strong>
            </div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>Registered Schools</span>
              <strong>{health?.registeredSchools} Schools</strong>
            </div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>Total System Users</span>
              <strong>{health?.activeUsers} Active</strong>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 15 }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>Server Time</span>
              <strong>{new Date(health?.serverTime).toLocaleTimeString()}</strong>
            </div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>Last Backup</span>
              <strong>{health?.lastBackup}</strong>
            </div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>Node Environment</span>
              <strong>Production</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
