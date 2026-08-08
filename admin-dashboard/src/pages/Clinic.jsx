import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Clinic() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ student: '', symptoms: '', diagnosis: '', treatment: '' });

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await api.get('/clinic');
      setRecords(res.data.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data.students || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clinic', formData);
      setShowModal(false);
      setFormData({ student: '', symptoms: '', diagnosis: '', treatment: '' });
      fetchRecords();
    } catch (err) {
      alert("Failed to record visit");
    }
  };

  const columns = [
    { key: 'visitDate', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
    { key: 'student', label: 'Student', render: (val) => <strong>{val?.firstName} {val?.lastName}</strong> },
    { key: 'symptoms', label: 'Symptoms' },
    { key: 'diagnosis', label: 'Diagnosis' },
    { key: 'treatment', label: 'Treatment' },
    { key: 'prescribedBy', label: 'Personnel', render: (val) => val?.name }
  ];

  return (
    <>
      <TablePage
        title="Clinic Management"
        eyebrow="Health & Wellness"
        columns={columns}
        data={records}
        loading={loading}
        onRefresh={fetchRecords}
        addLabel="Record Visit"
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="panel-card" style={{ width: 500, padding: 32 }}>
            <h3 style={{ marginBottom: 20 }}>Record Medical Visit</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 15 }}>
              <div>
                <label className="eyebrow">Select Student</label>
                <select required value={formData.student} onChange={e => setFormData({...formData, student: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <option value="">-- Choose Student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.admissionNumber})</option>)}
                </select>
              </div>
              <div>
                <label className="eyebrow">Symptoms</label>
                <textarea required value={formData.symptoms} onChange={e => setFormData({...formData, symptoms: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', height: 60 }} />
              </div>
              <div>
                <label className="eyebrow">Diagnosis</label>
                <input value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div>
                <label className="eyebrow">Treatment / Prescription</label>
                <textarea value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', height: 60 }} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
