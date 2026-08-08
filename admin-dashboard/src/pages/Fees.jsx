import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Fees() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchFees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/fees');
      const mapped = response.data.payments.map(p => ({
        id: p._id,
        student: p.student ? `${p.student.firstName} ${p.student.lastName}` : "Unknown",
        amount: `UGX ${p.amountPaid.toLocaleString()}`,
        receipt: p.receiptNumber,
        date: new Date(p.paymentDate).toISOString().slice(0, 10),
        status: "Paid"
      }));
      setPayments(mapped);
    } catch (err) {
      console.error("Error fetching fees:", err);
      setError("Failed to load fee records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const filtered = payments.filter(p =>
    p.student.toLowerCase().includes(query.toLowerCase()) ||
    p.receipt.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <LoadingState message="Preparing fee operations…" />;

  if (error) {
    return (
      <div className="page-shell">
        <div className="notice" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5' }}>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchFees} style={{ marginTop: '10px' }}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Portal module</p>
          <h2>Fee operations</h2>
          <p style={{ color: '#64748b', marginTop: 4 }}>Monitor fee collections, balances, and receipts for every student account.</p>
        </div>
        <div className="page-actions">
          <input
            placeholder="Search student or receipt"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', minWidth: 220 }}
          />
          <button className="btn btn-primary" onClick={() => navigate('/dashboard/fees/new')}>Record Payment</button>
        </div>
      </div>

      <div className="panel-card">
        {filtered.length === 0 ? (
          <div style={{ padding: 28, color: '#64748b', border: '1px dashed #cbd5e1', borderRadius: 12, background: '#f8fafc', textAlign: 'center' }}>
            <strong style={{ display: 'block', color: '#0f172a', marginBottom: 6 }}>No records available</strong>
            <div>No matching fee records found.</div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Amount</th>
                <th>Receipt</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{row.student}</td>
                  <td>{row.amount}</td>
                  <td>{row.receipt}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={row.status === 'Paid' ? 'badge badge-success' : 'badge badge-warning'}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
