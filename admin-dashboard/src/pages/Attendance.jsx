import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Attendance() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: status }
  const [loading, setLoading] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get('/academic/classes');
        setClasses(res.data.classes || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClasses();
  }, []);

  const fetchClassStudents = async (classId) => {
    if (!classId) return;
    setFetchingStudents(true);
    try {
      const res = await api.get(`/students?studentClass=${classId}`);
      const studentData = res.data.students || [];
      setStudents(studentData);

      // Initialize attendance state with "Present"
      const initialAttendance = {};
      studentData.forEach(s => {
        initialAttendance[s._id] = 'Present';
      });
      setAttendance(initialAttendance);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setFetchingStudents(false);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchClassStudents(selectedClass);
    }
  }, [selectedClass]);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const records = Object.keys(attendance).map(studentId => ({
        studentId,
        status: attendance[studentId]
      }));

      await api.post('/attendance', {
        studentClass: selectedClass,
        date,
        attendanceRecords: records,
        academicYear: "2026", // Should be dynamic
        term: "Term 1" // Should be dynamic
      });

      setMessage({ text: 'Attendance saved successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Failed to save attendance', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Classroom Management</p>
          <h2>Daily Attendance Register</h2>
        </div>
      </div>

      <div className="panel-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="">-- Choose Class --</option>
              {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={!selectedClass || loading || students.length === 0}
            onClick={submitAttendance}
            style={{ height: '42px' }}
          >
            {loading ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>

      {message.text && (
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message.text}
        </div>
      )}

      <div className="panel-card">
        {fetchingStudents ? (
          <LoadingState message="Fetching students..." />
        ) : students.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Admission No</th>
                <th style={{ textAlign: 'center' }}>Present</th>
                <th style={{ textAlign: 'center' }}>Absent</th>
                <th style={{ textAlign: 'center' }}>Late</th>
                <th style={{ textAlign: 'center' }}>Excused</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td><strong>{s.firstName} {s.lastName}</strong></td>
                  <td>{s.admissionNumber}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="radio" name={`status-${s._id}`} checked={attendance[s._id] === 'Present'} onChange={() => handleStatusChange(s._id, 'Present')} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="radio" name={`status-${s._id}`} checked={attendance[s._id] === 'Absent'} onChange={() => handleStatusChange(s._id, 'Absent')} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="radio" name={`status-${s._id}`} checked={attendance[s._id] === 'Late'} onChange={() => handleStatusChange(s._id, 'Late')} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="radio" name={`status-${s._id}`} checked={attendance[s._id] === 'Excused'} onChange={() => handleStatusChange(s._id, 'Excused')} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : selectedClass ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No students registered in this class.</div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Please select a class to mark attendance.</div>
        )}
      </div>
    </div>
  );
}
