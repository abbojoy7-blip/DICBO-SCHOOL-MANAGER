import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingState from '../../components/ui/LoadingState';

export default function StudentView() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStudent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/students/${id}`);
      const s = response.data;
      setStudent({
        id: s._id,
        name: `${s.firstName} ${s.lastName}`,
        admissionNumber: s.admissionNumber,
        class: s.studentClass?.name || 'N/A',
        gender: s.gender,
        feeStatus: s.feeStatus || 'Pending'
      });
    } catch (err) {
      console.error("Error fetching student:", err);
      setError("Student not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (loading) return <LoadingState message="Loading student profile…" />;

  if (error || !student) {
    return (
      <div className="page-shell">
        <div className="notice" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5' }}>
          <p>{error || "Student not found"}</p>
          <button className="btn btn-primary" onClick={() => navigate('/students')} style={{ marginTop: '10px' }}>Back to list</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Student profile</p>
          <h2>{student.name}</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/preview/report-card?student=' + student.id)}>Preview report</button>
          <button className="btn btn-primary" onClick={() => navigate(`/students/${id}/edit`)}>Edit profile</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel-card">
          <div className="profile-card" style={{ marginBottom: 12 }}>
            <div className="avatar avatar-large">
              {(student.name || '').split(' ').map((part) => part[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h3>{student.name}</h3>
              <p style={{ color: '#64748b' }}>Admission {student.admissionNumber} • {student.class}</p>
            </div>
          </div>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div className="panel-card" style={{ textAlign: 'center' }}><strong>96%</strong><br /><span>Attendance</span></div>
            <div className="panel-card" style={{ textAlign: 'center' }}><strong>A</strong><br /><span>Latest grade</span></div>
            <div className="panel-card" style={{ textAlign: 'center' }}><strong style={{ color: student.feeStatus === 'Paid' ? '#10b981' : '#f59e0b' }}>{student.feeStatus}</strong><br /><span>Fee status</span></div>
          </div>
        </div>
        <div className="panel-card">
          <h3>Quick actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <button className="btn btn-secondary" onClick={() => navigate('/preview/receipt?student=' + student.id)}>View fee receipt</button>
            <button className="btn btn-secondary">Send message</button>
            <button className="btn btn-primary">Schedule meeting</button>
          </div>
        </div>
      </div>
    </div>
  );
}
