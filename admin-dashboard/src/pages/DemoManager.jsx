import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function DemoManager() {
  const [loading, setLoading] = useState(false);
  const [isPresentation, setIsPresentation] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.settings) {
          setIsPresentation(res.data.settings.isPresentationMode);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleAction = async (action) => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await api.post(`/demo/${action}`);
      setMessage({ text: res.data.message, type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Action failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = async () => {
    setLoading(true);
    try {
      await api.put('/settings', { isPresentationMode: !isPresentation });
      setIsPresentation(!isPresentation);
      setMessage({ text: `System switched to ${!isPresentation ? 'Presentation' : 'Production'} Mode`, type: 'success' });
    } catch (err) {
      alert("Failed to toggle mode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Development Tools</p>
          <h2>System Mode & Data Management</h2>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: 800, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>Current Mode: <span style={{ color: isPresentation ? '#f59e0b' : '#10b981' }}>{isPresentation ? 'Presentation' : 'Production'}</span></h3>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 5 }}>
              {isPresentation ? 'System is currently showing demonstration data.' : 'System is running in clean production mode.'}
            </p>
          </div>
          <button disabled={loading} className={`btn ${isPresentation ? 'btn-success' : 'btn-warning'}`} onClick={toggleMode}>
            Switch to {isPresentation ? 'Production' : 'Presentation'} Mode
          </button>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#64748b' }}>Use these tools to populate your school manager with realistic sample data for presentations. Note: Resetting data will clear all transactions.</p>
        </div>

        {message.text && (
          <div className={`notice ${message.type === 'success' ? 'badge-success' : 'badge-warning'}`} style={{ marginBottom: 20 }}>
            {message.text}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="panel-card" style={{ padding: 20 }}>
            <h3>Populate Data</h3>
            <p style={{ fontSize: 13, color: '#64748b', margin: '10px 0 20px' }}>Generate random student profiles and payment history for demonstration.</p>
            <button disabled={loading || !isPresentation} className="btn btn-primary" onClick={() => handleAction('generate')}>
              {loading ? 'Processing...' : 'Generate Demo Data'}
            </button>
            {!isPresentation && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 10 }}>Enable Presentation Mode to use this feature.</p>}
          </div>

          <div className="panel-card" style={{ padding: 20, borderColor: '#fca5a5' }}>
            <h3 style={{ color: '#ef4444' }}>Factory Reset</h3>
            <p style={{ fontSize: 13, color: '#64748b', margin: '10px 0 20px' }}>Clear all demonstration records. Use with caution in production environments.</p>
            <button disabled={loading} className="btn btn-warning" onClick={() => handleAction('reset')}>
              {loading ? 'Resetting...' : 'Clear Records'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
