import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';
import { useSettings } from '../context/SettingsContext';

export default function CertificateGenerator() {
  const { settings } = useSettings();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('selection');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/students');
        setStudents(res.data.students || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <LoadingState />;

  return (
    <div className="page-shell">
      <div className="page-header no-print">
        <div>
          <p className="eyebrow">Academic Records</p>
          <h2>Certificate Generator</h2>
        </div>
        {view === 'preview' && (
          <div className="page-actions">
            <button className="btn btn-secondary" onClick={() => setView('selection')}>Back</button>
            <button className="btn btn-primary" onClick={() => window.print()}>Print Certificate</button>
          </div>
        )}
      </div>

      {view === 'selection' ? (
        <div className="panel-card" style={{ maxWidth: 500 }}>
           <h3>Select Student</h3>
           <p style={{ fontSize: 13, color: '#64748b', margin: '10px 0 20px' }}>Choose a student to generate a formal completion certificate.</p>
           <div style={{ display: 'grid', gap: 15 }}>
              <select value={selectedStudent?._id || ''} onChange={e => setSelectedStudent(students.find(s => s._id === e.target.value))} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                 <option value="">-- Choose Student --</option>
                 {students.map(s => <option key={s._id} value={s._id}>{s.firstName} {s.lastName}</option>)}
              </select>
              <button className="btn btn-primary" disabled={!selectedStudent} onClick={() => setView('preview')}>Generate Certificate</button>
           </div>
        </div>
      ) : (
        <div className="certificate-container" style={{ padding: 40, background: '#fff', border: '20px solid #f1f5f9', borderRadius: 4, textAlign: 'center', position: 'relative' }}>
           <div style={{ border: '2px solid #2563eb', padding: 60, borderRadius: 4 }}>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748b' }}>Certificate of Completion</div>
              <h1 style={{ fontSize: 48, margin: '20px 0', color: '#1e3a8a' }}>{settings?.name}</h1>
              <p style={{ fontSize: 18, fontStyle: 'italic', margin: '40px 0' }}>This is to certify that</p>
              <h2 style={{ fontSize: 32, borderBottom: '2px solid #0f172a', display: 'inline-block', padding: '0 40px 10px' }}>{selectedStudent?.firstName} {selectedStudent?.lastName}</h2>
              <p style={{ fontSize: 18, margin: '40px 0', lineHeight: 1.6 }}>has successfully completed the academic requirements for the term and is hereby awarded this certificate for outstanding performance and conduct.</p>

              <div style={{ marginTop: 80, display: 'flex', justifyContent: 'space-between' }}>
                 <div style={{ width: 200, borderTop: '1px solid #0f172a', paddingTop: 10 }}>
                    <strong>{settings?.principalName}</strong>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Principal</div>
                 </div>
                 <div style={{ width: 120, height: 120, border: '2px solid #e2e8f0', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 10, color: '#94a3b8' }}>SCHOOL STAMP</div>
                 <div style={{ width: 200, borderTop: '1px solid #0f172a', paddingTop: 10 }}>
                    <strong>{new Date().toLocaleDateString()}</strong>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Date of Issue</div>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-shell { padding: 0 !important; background: #fff !important; }
          .certificate-container { border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
