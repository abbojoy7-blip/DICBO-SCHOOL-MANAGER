import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function DashboardConfig() {
  const [config, setConfig] = useState({
    targetEnrollment: 0,
    targetRevenue: 0,
    targetAttendance: 95,
    manualTeacherCount: 0,
    manualStaffCount: 0,
    useManualStats: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.dashboardConfig) {
          setConfig(res.data.dashboardConfig);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setConfig({ ...config, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings/dashboard-config', config);
      setMessage({ text: 'Dashboard configuration updated!', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to update config', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading dashboard configuration..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Presentation Control</p>
          <h2>Dashboard Configuration</h2>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b' }}>Configure targets and statistics shown on the main dashboard. This is useful for school goal tracking and product presentations.</p>
        </div>

        {message.text && (
          <div className={`notice ${message.type === 'success' ? 'badge-success' : 'badge-warning'}`} style={{ marginBottom: 20 }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: 16 }}>School Goals & Targets</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label>Target Enrollment (Students)</label>
              <input type="number" name="targetEnrollment" value={config.targetEnrollment} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label>Target Revenue ({config.currency || 'UGX'})</label>
              <input type="number" name="targetRevenue" value={config.targetRevenue} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            </div>
          </div>

          <h3 style={{ marginBottom: 16 }}>Manual Statistics (Demo Mode)</h3>
          <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <input type="checkbox" name="useManualStats" id="useManual" checked={config.useManualStats} onChange={handleChange} />
              <label htmlFor="useManual" style={{ fontSize: 15, fontWeight: 700 }}>Enable Manual Overrides</label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label>Manual Teacher Count</label>
                <input disabled={!config.useManualStats} type="number" name="manualTeacherCount" value={config.manualTeacherCount} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div>
                <label>Manual Total Staff</label>
                <input disabled={!config.useManualStats} type="number" name="manualStaffCount" value={config.manualStaffCount} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Updating...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
