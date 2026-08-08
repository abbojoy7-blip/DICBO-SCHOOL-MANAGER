import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingState from '../../components/ui/LoadingState';
import { useAuth } from '../../context/AuthContext';
import { exportToExcel, importFromExcel } from '../../utils/excel';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchStudents = async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/students${search ? `?search=${search}` : ''}`);
      const mappedStudents = response.data.students.map(s => ({
        id: s._id,
        name: `${s.firstName} ${s.lastName}`,
        admissionNumber: s.admissionNumber,
        class: s.studentClass?.name || 'N/A',
        feeStatus: s.feeStatus || 'Pending',
        gender: s.gender
      }));
      setStudents(mappedStudents);
    } catch (err) {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const doSearch = (e) => {
    e.preventDefault();
    fetchStudents(query);
  };

  const handleExport = () => {
    exportToExcel(students, `Student_Registry_${new Date().toLocaleDateString()}`);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromExcel(file, (data) => {
        console.log("Imported Data:", data);
        alert(`Read ${data.length} records. Bulk upload coming soon.`);
      });
    }
  };

  if (error) {
    return (
      <div className="page-shell">
        <div className="notice" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => fetchStudents()} style={{ marginTop: '10px' }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Registry</p>
          <h2>Student Admissions</h2>
        </div>
        <div className="page-actions">
          <input type="file" id="import-excel" hidden accept=".xlsx, .xls" onChange={handleImport} />
          <label htmlFor="import-excel" className="btn btn-secondary" style={{ cursor: 'pointer' }}>Import Excel</label>
          <button className="btn btn-secondary" onClick={handleExport}>Export Registry</button>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard/students/new')}>Add Student</button>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Preparing student records…" />
      ) : (
        <div className="panel-card">
          <div className="page-header" style={{ marginBottom: 12 }}>
            <form onSubmit={doSearch} style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 400 }}>
              <input
                placeholder="Search by name or admission..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0' }}
              />
              <button type="submit" className="btn btn-primary">Filter</button>
            </form>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Student Profile</th>
                <th>Admission No</th>
                <th>Current Class</th>
                <th>Fee Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="profile-card" style={{ padding: 0, background: 'transparent', border: '0', boxShadow: 'none' }}>
                      <div className="avatar">{(s.name || '').split(' ').map(p => p[0]).slice(0, 2).join('')}</div>
                      <div>
                        <strong>{s.name}</strong>
                        <div style={{ color: '#64748b', fontSize: 12 }}>{s.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td><code>{s.admissionNumber}</code></td>
                  <td>{s.class}</td>
                  <td><span className={s.feeStatus === 'Paid' ? 'badge badge-success' : 'badge badge-warning'}>{s.feeStatus}</span></td>
                  <td><Link to={`/dashboard/students/${s.id}`} className="btn btn-secondary" style={{ padding: '5px 12px', fontSize: 13 }}>View Profile</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
