import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function SuperAdminPanel() {
  const [schools, setSchools] = useState([]);
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalUsers: 0,
    totalStudents: 0,
    activeSubscriptions: 0,
    expiredSubscriptions: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: '', adminName: '', adminEmail: '', plan: 'Trial' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schoolsRes, statsRes] = await Promise.all([
        api.get('/system/schools'),
        api.get('/system/stats')
      ]);
      setSchools(schoolsRes.data.schools);
      setStats(statsRes.data.stats);
      setRecentActivity(statsRes.data.recentActivity || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    try {
      // Logic for superadmin to register a new school tenant
      await api.post('/auth/register', {
        name: newSchool.adminName,
        email: newSchool.adminEmail,
        password: 'password123', // temporary
        schoolName: newSchool.name,
        role: 'administrator'
      });
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert("Failed to register school");
    }
  };

  if (loading) return <LoadingState message="Accessing global infrastructure..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Platform Ownership</p>
          <h2>DICBO Global Administration</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Onboard New School</button>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Registered Entities</div>
          <div className="value">{stats.totalSchools}</div>
          <div className="delta">{stats.activeSubscriptions} Active</div>
        </div>
        <div className="stat-card">
          <div className="label">Global Enrollment</div>
          <div className="value">{stats.totalStudents}</div>
          <div className="delta">Learners across platform</div>
        </div>
        <div className="stat-card">
          <div className="label">System Identity</div>
          <div className="value">{stats.totalUsers}</div>
          <div className="delta">Authorized staff accounts</div>
        </div>
        <div className="stat-card">
          <div className="label">Security Health</div>
          <div className="value" style={{ color: '#10b981' }}>Secure</div>
          <div className="delta">All systems operational</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel-card">
          <div className="page-header" style={{ marginBottom: 20 }}>
            <h3>Institution Directory</h3>
            <div className="page-actions">
               <input placeholder="Search school name..." style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>School Identity</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Enrollment</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map(s => (
                <tr key={s._id}>
                  <td><strong>{s.name}</strong><div style={{ fontSize: 11, color: '#64748b' }}>{s.district || 'Location Pending'}</div></td>
                  <td><span className="badge badge-info">{s.subscriptionPlan}</span></td>
                  <td>
                    <span className={`badge ${s.subscriptionStatus === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {s.subscriptionStatus}
                    </span>
                  </td>
                  <td>—</td>
                  <td>{s.expiryDate ? new Date(s.expiryDate).toLocaleDateString() : 'N/A'}</td>
                  <td><button className="btn btn-secondary" style={{ padding: '4px 8px' }}>Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="list-card">
          <div className="page-header" style={{ marginBottom: 16 }}>
            <div><p className="eyebrow">Real-time Activity</p><h3>Platform Audit</h3></div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentActivity.map((log, idx) => (
              <li key={log._id || idx} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#1e293b' }}>{log.action.replace(/_/g, ' ')}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{log.user?.name} ({log.user?.role})</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{new Date(log.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary" style={{ width: '100%', marginTop: 15, fontSize: 13 }}>View All Logs</button>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="panel-card" style={{ width: 450, padding: 32 }}>
            <h3 style={{ marginBottom: 20 }}>Onboard New Institution</h3>
            <form onSubmit={handleCreateSchool} style={{ display: 'grid', gap: 15 }}>
              <div>
                <label>School Name</label>
                <input required value={newSchool.name} onChange={e => setNewSchool({...newSchool, name: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 15 }}>
                <p className="eyebrow">Primary Admin User</p>
                <div style={{ display: 'grid', gap: 10 }}>
                  <input placeholder="Full Name" required value={newSchool.adminName} onChange={e => setNewSchool({...newSchool, adminName: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                  <input type="email" placeholder="Email Address" required value={newSchool.adminEmail} onChange={e => setNewSchool({...newSchool, adminEmail: e.target.value})} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Create School</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
