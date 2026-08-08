import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function BudgetManager() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({ totalPlanned: 0, totalActual: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    year: '2026',
    category: '',
    description: '',
    plannedAmount: '',
    actualSpending: 0,
    status: 'Planned'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [budgetRes, catRes] = await Promise.all([
        api.get('/budget'),
        api.get('/budget/categories')
      ]);
      setBudgets(budgetRes.data.budgets || []);
      setSummary(budgetRes.data.summary);
      setCategories(catRes.data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/budget', formData);
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save budget");
    }
  };

  if (loading) return <LoadingState message="Loading financial budgets..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Financial Planning</p>
          <h2>School Budget Management</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Budget Item</button>
      </div>

      <div className="stat-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="label">Total Planned</div>
          <div className="value">UGX {summary.totalPlanned.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="label">Actual Spending</div>
          <div className="value">UGX {summary.totalActual.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="label">Available Balance</div>
          <div className="value" style={{ color: summary.totalPlanned - summary.totalActual < 0 ? '#ef4444' : '#10b981' }}>
            UGX {(summary.totalPlanned - summary.totalActual).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="panel-card">
        <table className="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Category</th>
              <th>Description</th>
              <th>Planned (UGX)</th>
              <th>Actual (UGX)</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map(b => (
              <tr key={b._id}>
                <td>{b.year}</td>
                <td><strong>{b.category?.name}</strong></td>
                <td style={{ fontSize: 13, color: '#64748b' }}>{b.description}</td>
                <td>{b.plannedAmount.toLocaleString()}</td>
                <td>{b.actualSpending.toLocaleString()}</td>
                <td style={{ fontWeight: 700 }}>{(b.plannedAmount - b.actualSpending).toLocaleString()}</td>
                <td><span className="badge badge-info">{b.status}</span></td>
                <td>
                  <button className="btn btn-secondary" style={{ padding: '4px 8px' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 16, width: 500, maxWidth: '95vw' }}>
            <h3>New Budget Allocation</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label>Year</label>
                  <input required value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} className="btn-secondary" style={{ width: '100%', padding: 8, borderRadius: 8 }} />
                </div>
                <div>
                  <label>Category</label>
                  <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Planned Amount (UGX)</label>
                <input type="number" required value={formData.plannedAmount} onChange={e => setFormData({ ...formData, plannedAmount: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0', height: 60 }} />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Allocation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
