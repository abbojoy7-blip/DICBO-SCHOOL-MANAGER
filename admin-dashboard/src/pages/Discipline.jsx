import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Discipline() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ student: '', incidentType: '', description: '', actionTaken: '' });

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await api.get('/discipline');
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
      await api.post('/discipline', formData);
      setShowModal(false);
      setFormData({ student: '', incidentType: '', description: '', actionTaken: '' });
      fetchRecords();
    } catch (err) {
      alert("Failed to record incident");
    }
  };

  const columns = [
    { key: 'incidentDate', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
    { key: 'student', label: 'Student', render: (val) => <strong>{val?.firstName} {val?.lastName}</strong> },
    { key: 'incidentType', label: 'Type' },
    { key: 'description', label: 'Description', render: (val) => <span style={{ fontSize: 13 }}>{val}</span> },
    { key: 'actionTaken', label: 'Action', render: (val) => <span className="badge badge-warning">{val}</span> },
    { key: 'reportedBy', label: 'By', render: (val) => val?.name }
  ];

  return (
    <>
      <TablePage
        title="Discipline Tracker"
        eyebrow="Student Conduct"
        columns={columns}
        data={records}
        loading={loading}
        onRefresh={fetchRecords}
        addLabel="Report Incident"
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="panel-card" style={{ width: 500, padding: 32 }}>
            <h3 style={{ marginBottom: 20 }}>Report Disciplinary Incident</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 15 }}>
              <div>
                <label className="eyebrow">Select Student</label>
                <select required value={formData.student} onChange={e => setFormData({...formData, student: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <option value="">-- Choose Student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.admissionNumber})</option>)}
                </select>
              </div>
              <div>
                <label className="eyebrow">Incident Type</label>
                <input required placeholder="e.g. Late coming, Fighting" value={formData.incidentType} onChange={e => setFormData({...formData, incidentType: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div>
                <label className="eyebrow">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', height: 60 }} />
              </div>
              <div>
                <label className="eyebrow">Action Taken</label>
                <input required placeholder="e.g. Warning letter, Suspension" value={formData.actionTaken} onChange={e => setFormData({...formData, actionTaken: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
