import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import LoadingState from '../../components/ui/LoadingState';

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    admissionNumber: '',
    gender: 'Male',
    dateOfBirth: '',
    studentClass: '',
    stream: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    previousSchool: '',
    medicalInformation: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        // Fetch classes for the dropdown
        const classRes = await api.get('/academic/classes');
        setClasses(classRes.data.classes || []);

        if (id) {
          const studentRes = await api.get(`/students/${id}`);
          const s = studentRes.data.student;
          setForm({
            ...s,
            dateOfBirth: s.dateOfBirth ? new Date(s.dateOfBirth).toISOString().split('T')[0] : '',
            studentClass: s.studentClass?._id || s.studentClass
          });
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (id) {
        await api.put(`/students/${id}`, form);
      } else {
        await api.post('/students', form);
      }
      navigate('/dashboard/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <LoadingState message="Loading form data..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Student Registry</p>
          <h2>{id ? 'Edit Student Profile' : 'Register New Student'}</h2>
        </div>
      </div>

      <div className="panel-card">
        {error && (
          <div className="notice" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={submit} className="form-grid">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h3 style={{ marginBottom: '15px', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Personal Information</h3>

              <div style={{ marginBottom: '12px' }}>
                <label>First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required className="form-input" />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label>Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required className="form-input" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label>Gender *</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="form-input">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label>Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required className="form-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label>Class *</label>
                  <select name="studentClass" value={form.studentClass} onChange={handleChange} required className="form-input">
                    <option value="">Select Class</option>
                    {classes.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label>Stream</label>
                  <input name="stream" value={form.stream} onChange={handleChange} placeholder="e.g. Blue, North" className="form-input" />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label>Medical Information</label>
                <textarea name="medicalInformation" value={form.medicalInformation} onChange={handleChange} className="form-input" style={{ height: '80px' }} />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '15px', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>Parent & Contact Details</h3>

              <div style={{ marginBottom: '12px' }}>
                <label>Parent/Guardian Name *</label>
                <input name="parentName" value={form.parentName} onChange={handleChange} required className="form-input" />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label>Parent Phone *</label>
                <input name="parentPhone" value={form.parentPhone} onChange={handleChange} required className="form-input" />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label>Parent Email</label>
                <input type="email" name="parentEmail" value={form.parentEmail} onChange={handleChange} className="form-input" />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label>Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} className="form-input" style={{ height: '80px' }} />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label>Previous School</label>
                <input name="previousSchool" value={form.previousSchool} onChange={handleChange} className="form-input" />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Processing...' : (id ? 'Update Student' : 'Register Student')}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          margin-top: 4px;
        }
        .form-input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
        label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }
      `}</style>
    </div>
  );
}
