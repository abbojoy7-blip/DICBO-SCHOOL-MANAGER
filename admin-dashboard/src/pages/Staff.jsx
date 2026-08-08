import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'teacher', password: 'password123' });
  const [saving, setSaving] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await api.get('/staff');
      setStaff(res.data.staff || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/staff', formData);
      setShowModal(false);
      setFormData({ name: '', email: '', role: 'teacher', password: 'password123' });
      fetchStaff();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save staff');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading staff directory..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">HR Management</p>
          <h2>Staff Directory</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Staff</button>
      </div>

      <div className="panel-card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s._id}>
                <td><strong>{s.name}</strong></td>
                <td style={{ textTransform: 'capitalize' }}>{s.role}</td>
                <td>{s.email}</td>
                <td><span className={s.status === 'active' ? 'badge badge-success' : 'badge badge-warning'}>{s.status}</span></td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No staff members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '450px' }}>
            <h3>Register New Staff</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Role</label>
                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <option value="administrator">Administrator</option>
                  <option value="teacher">Teacher</option>
                  <option value="accountant">Accountant</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Temporary Password</label>
                <input type="text" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Create Account'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
