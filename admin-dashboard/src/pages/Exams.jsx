import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Quiz', academicYear: '2026', term: 'Term 1' });
  const [view, setView] = useState('list'); // 'list' or 'grading'
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await api.get('/exams');
      setExams(res.data.exams || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/exams', formData);
      setShowModal(false);
      fetchExams();
    } catch (err) {
      alert("Failed to create exam");
    }
  };

  if (loading) return <LoadingState message="Accessing examination portal..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Academics</p>
          <h2>{view === 'list' ? 'Examinations & Assessments' : `Grading: ${selectedExam?.name}`}</h2>
        </div>
        {view === 'list' ? (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create New Exam</button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setView('list')}>Back to List</button>
        )}
      </div>

      {view === 'list' ? (
        <div className="panel-card">
          <table className="table">
            <thead>
              <tr>
                <th>Exam Name</th>
                <th>Type</th>
                <th>Term</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(e => (
                <tr key={e._id}>
                  <td><strong>{e.name}</strong></td>
                  <td>{e.type}</td>
                  <td>{e.term}</td>
                  <td>{e.academicYear}</td>
                  <td><span className="badge badge-info">{e.status}</span></td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => { setSelectedExam(e); setView('grading'); }} style={{ padding: '4px 8px' }}>Manage Grades</button>
                  </td>
                </tr>
              ))}
              {exams.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No exams scheduled.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <GradingPanel exam={selectedExam} />
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 16, width: 400 }}>
            <h3>New Examination</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <label>Exam Title</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Type</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <option value="Quiz">Quiz</option>
                  <option value="Mid-Term">Mid-Term</option>
                  <option value="Final">Final</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function GradingPanel({ exam }) {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({}); // { studentId: score }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      const [subRes, classRes] = await Promise.all([
        api.get('/academic/subjects'),
        api.get('/academic/classes')
      ]);
      setSubjects(subRes.data.subjects || []);
      setClasses(classRes.data.classes || []);
    };
    fetchMetadata();
  }, []);

  const fetchStudents = async () => {
    if (!selectedClass) return;
    try {
      const res = await api.get(`/students?studentClass=${selectedClass}`);
      setStudents(res.data.students || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const grades = Object.keys(marks).map(sid => ({
        student: sid,
        exam: exam._id,
        subject: selectedSubject,
        score: marks[sid],
        remarks: ''
      }));
      await api.post('/exams/grades', { grades });
      alert("Grades saved successfully");
    } catch (err) {
      alert("Failed to save grades");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div className="panel-card" style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label>Select Class</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <option value="">-- Choose Class --</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label>Select Subject</label>
          <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <option value="">-- Choose Subject --</option>
            {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={!selectedSubject || students.length === 0 || saving}>
          {saving ? 'Saving...' : 'Save All Marks'}
        </button>
      </div>

      {students.length > 0 && (
        <div className="panel-card">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission No</th>
                <th style={{ width: 150 }}>Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td><strong>{s.firstName} {s.lastName}</strong></td>
                  <td>{s.admissionNumber}</td>
                  <td>
                    <input
                      type="number"
                      min="0" max="100"
                      value={marks[s._id] || ''}
                      onChange={e => setMarks({ ...marks, [s._id]: e.target.value })}
                      style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
