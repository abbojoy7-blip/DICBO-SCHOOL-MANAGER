import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', motto: '', address: '', phone: '', email: '',
    academicYear: '2026', currentTerm: 'Term 1',
    currency: 'UGX'
  });

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    try {
      await api.put('/settings', { ...formData, isOnboarded: true });
      navigate('/dashboard');
    } catch (err) {
      alert("Failed to complete onboarding");
    }
  };

  return (
    <div className="login-shell">
      <div className="panel-card" style={{ width: 600, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <p className="eyebrow">School Setup</p>
          <h2>{step === 1 ? 'School Identity' : step === 2 ? 'Academic Structure' : 'Finalizing'}</h2>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15 }}>
             <div style={{ width: 40, height: 6, borderRadius: 3, background: step >= 1 ? '#2563eb' : '#e2e8f0' }} />
             <div style={{ width: 40, height: 6, borderRadius: 3, background: step >= 2 ? '#2563eb' : '#e2e8f0' }} />
             <div style={{ width: 40, height: 6, borderRadius: 3, background: step >= 3 ? '#2563eb' : '#e2e8f0' }} />
          </div>
        </div>

        {step === 1 && (
          <div style={{ display: 'grid', gap: 15 }}>
            <div>
              <label>School Full Name</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label>Motto</label>
              <input value={formData.motto} onChange={e => setFormData({...formData, motto: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label>Office Phone</label>
              <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gap: 15 }}>
             <div>
              <label>Current Academic Year</label>
              <input value={formData.academicYear} onChange={e => setFormData({...formData, academicYear: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            </div>
            <div>
              <label>Term</label>
              <select value={formData.currentTerm} onChange={e => setFormData({...formData, currentTerm: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p>Your school profile is ready! Clicking "Launch" will initialize your management portal.</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          {step > 1 ? <button className="btn btn-secondary" onClick={prev}>Back</button> : <div />}
          {step < 3 ? <button className="btn btn-primary" onClick={next}>Continue</button> : <button className="btn btn-primary" onClick={handleSubmit}>Launch Portal</button>}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
          <p style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Powered By Dot Inspiration Technologies
          </p>
        </div>
      </div>
    </div>
  );
}
