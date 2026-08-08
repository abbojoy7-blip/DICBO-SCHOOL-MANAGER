import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';
import { useSettings } from '../context/SettingsContext';

export default function StudentIDCards() {
  const { settings } = useSettings();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <p className="eyebrow">Digital Identity</p>
          <h2>Student ID Cards</h2>
        </div>
        <button className="btn btn-primary" onClick={() => window.print()}>Print All Cards</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {students.map(s => (
          <div key={s._id} className="id-card" style={{ width: 320, height: 480, background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', position: 'relative' }}>
             <div style={{ height: 120, background: settings?.primaryColor || '#2563eb', padding: 20, textAlign: 'center', color: '#fff' }}>
                <strong style={{ fontSize: 14, textTransform: 'uppercase' }}>{settings?.name}</strong>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 5 }}>STUDENT IDENTITY CARD</div>
             </div>

             <div style={{ marginTop: -50, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: 50, border: '4px solid #fff', background: '#f8fafc', overflow: 'hidden' }}>
                   {s.photoUrl ? <img src={s.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ height: '100%', display: 'grid', placeItems: 'center', fontSize: 32 }}>👤</div>}
                </div>
             </div>

             <div style={{ padding: 20, textAlign: 'center' }}>
                <h3 style={{ fontSize: 20, margin: '10px 0 5px' }}>{s.firstName} {s.lastName}</h3>
                <div style={{ color: '#2563eb', fontWeight: 700 }}>{s.admissionNumber}</div>

                <div style={{ marginTop: 25, display: 'grid', gap: 10 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 5 }}>
                      <span style={{ fontSize: 11, color: '#64748b' }}>CLASS</span>
                      <strong style={{ fontSize: 12 }}>{s.studentClass?.name || 'N/A'}</strong>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 5 }}>
                      <span style={{ fontSize: 11, color: '#64748b' }}>GENDER</span>
                      <strong style={{ fontSize: 12 }}>{s.gender}</strong>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 5 }}>
                      <span style={{ fontSize: 11, color: '#64748b' }}>VALID UNTIL</span>
                      <strong style={{ fontSize: 12 }}>DEC 2026</strong>
                   </div>
                </div>

                <div style={{ marginTop: 30, textAlign: 'center' }}>
                   <div style={{ fontSize: 10, color: '#94a3b8' }}>AUTHORIZED SIGNATURE</div>
                   <div style={{ fontStyle: 'italic', marginTop: 5 }}>{settings?.principalName}</div>
                </div>
             </div>

             <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 8, background: settings?.secondaryColor || '#1e293b' }}></div>
          </div>
        ))}
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-shell { padding: 0 !important; background: #fff !important; }
          .id-card { break-inside: avoid; margin-bottom: 20px; box-shadow: none !important; border: 2px solid #e2e8f0 !important; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
}
