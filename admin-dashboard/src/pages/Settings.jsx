import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';
import { useSettings } from '../context/SettingsContext';

export default function Settings() {
  const { settings: currentSettings, refreshSettings } = useSettings();
  const [settings, setSettings] = useState({
    name: '', shortName: '', motto: '', vision: '', mission: '',
    address: '', district: '', phone: '', email: '', website: '',
    principalName: '', deputyName: '',
    currency: 'UGX', primaryColor: '#2563eb', secondaryColor: '#1e293b',
    currentTerm: 'Term 1'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (currentSettings) {
      setSettings(currentSettings);
      setLoading(false);
    }
  }, [currentSettings]);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await api.put('/settings', settings);
      setMessage({ text: 'School profile updated successfully!', type: 'success' });
      refreshSettings();
    } catch (err) {
      setMessage({ text: 'Failed to update settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading school settings..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">System Configuration</p>
          <h2>Institutional Profile & Branding</h2>
        </div>
      </div>

      <div className="panel-card" style={{ maxWidth: '100%' }}>
        {message.text && (
          <div className={`notice ${message.type === 'success' ? 'badge-success' : 'badge-warning'}`} style={{ marginBottom: '20px' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {/* Identity */}
            <div className="form-section">
              <h3 className="section-title">Institutional Identity</h3>
              <div className="form-group">
                <label>School Full Name</label>
                <input name="name" value={settings.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Motto</label>
                <input name="motto" value={settings.motto} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Vision</label>
                <textarea name="vision" value={settings.vision} onChange={handleChange} style={{ height: 60 }} />
              </div>
              <div className="form-group">
                <label>Mission</label>
                <textarea name="mission" value={settings.mission} onChange={handleChange} style={{ height: 60 }} />
              </div>
            </div>

            {/* Leadership & Admin */}
            <div className="form-section">
              <h3 className="section-title">Leadership & Governance</h3>
              <div className="form-group">
                <label>Principal / Head Teacher</label>
                <input name="principalName" value={settings.principalName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Deputy Principal</label>
                <input name="deputyName" value={settings.deputyName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>System Currency</label>
                <input name="currency" value={settings.currency} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Active Term</label>
                <select name="currentTerm" value={settings.currentTerm} onChange={handleChange}>
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
              </div>
            </div>

            {/* Contacts */}
            <div className="form-section">
              <h3 className="section-title">Contact & Location</h3>
              <div className="form-group">
                <label>Physical Address</label>
                <input name="address" value={settings.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>District / Region</label>
                <input name="district" value={settings.district} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Office Phone</label>
                <input name="phone" value={settings.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Official Email</label>
                <input type="email" name="email" value={settings.email} onChange={handleChange} />
              </div>
            </div>

            {/* Branding */}
            <div className="form-section">
              <h3 className="section-title">Visual Branding</h3>
              <div className="form-group">
                <label>Primary Brand Color</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="color" name="primaryColor" value={settings.primaryColor} onChange={handleChange} style={{ width: 60, height: 42, padding: 2 }} />
                  <input name="primaryColor" value={settings.primaryColor} onChange={handleChange} style={{ flex: 1 }} />
                </div>
              </div>
              <div className="form-group">
                <label>Secondary Color</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="color" name="secondaryColor" value={settings.secondaryColor} onChange={handleChange} style={{ width: 60, height: 42, padding: 2 }} />
                  <input name="secondaryColor" value={settings.secondaryColor} onChange={handleChange} style={{ flex: 1 }} />
                </div>
              </div>
              <div className="branding-preview" style={{ marginTop: 20, padding: 20, background: '#f8fafc', borderRadius: 12, textAlign: 'center' }}>
                 <div className="logo-placeholder" style={{ background: settings.primaryColor, color: '#fff', width: 60, height: 60, borderRadius: 12, margin: '0 auto 10px', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 900 }}>{settings.name?.charAt(0)}</div>
                 <p style={{ fontSize: 13, color: '#64748b' }}>Logo branding preview</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40, borderTop: '1px solid #f1f5f9', paddingTop: 30, display: 'flex', justifyContent: 'flex-end' }}>
             <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '14px 40px' }}>
                {saving ? 'Saving System Changes...' : 'Save Global Profile'}
             </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-section { display: flex; flex-direction: column; gap: 15px; }
        .section-title { font-size: 16px; font-weight: 700; color: #1e293b; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 5px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-group label { font-size: 12px; text-transform: uppercase; font-weight: 700; color: #64748b; letter-spacing: 0.05em; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: #fff;
          transition: border-color 0.2s;
        }
        .form-group input:focus { border-color: #2563eb; outline: none; }
      `}</style>
    </div>
  );
}
