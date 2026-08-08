import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', level: '' });
  const [saving, setSaving] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/academic/classes');
      setClasses(res.data.classes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/academic/classes', formData);
      setShowModal(false);
      setFormData({ name: '', level: '' });
      fetchClasses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save class');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState message="Loading classes..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Academic Structure</p>
          <h2>Classes & Streams</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Class</button>
      </div>

      <div className="panel-card">
        <table className="table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Level</th>
              <th>Assigned Teacher</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(c => (
              <tr key={c._id}>
                <td><strong>{c.name}</strong></td>
                <td>{c.level || 'N/A'}</td>
                <td>{c.teacher?.name || 'Unassigned'}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No classes defined.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '400px' }}>
            <h3>Create New Class</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Class Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Primary One"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Level</label>
                <select
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  <option value="">Select Level</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Nursery">Nursery</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Create Class'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
