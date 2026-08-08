import { useState } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Reports() {
  const [reportType, setReportType] = useState('students');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const endpoint = reportType === 'students' ? '/reports/students' : '/reports/financial';
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Reporting Center</p>
          <h2>School Analytics & Reports</h2>
        </div>
      </div>

      <div className="panel-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Report Category</label>
            <select value={reportType} onChange={e => setReportType(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minWidth: '200px' }}>
              <option value="students">Student Enrollment Report</option>
              <option value="financial">Financial Revenue Report</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={fetchReport} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>Print / Save PDF</button>
        </div>
      </div>

      {loading ? <LoadingState message="Compiling report data..." /> : data && (
        <div className="panel-card report-print-area">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ margin: 0 }}>DICBO School Manager</h1>
            <p style={{ margin: '5px 0', color: '#64748b' }}>Official {reportType === 'students' ? 'Student Registry' : 'Financial Revenue'} Summary</p>
            <p style={{ fontSize: '12px' }}>Generated on {new Date().toLocaleString()}</p>
          </div>

          {reportType === 'students' ? (
            <div>
              <div className="stat-grid" style={{ marginBottom: '30px' }}>
                <div className="stat-card">
                  <div className="label">Total Students</div>
                  <div className="value">{data.stats.total}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Male</div>
                  <div className="value">{data.stats.gender.Male}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Female</div>
                  <div className="value">{data.stats.gender.Female}</div>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Admission</th>
                    <th>Full Name</th>
                    <th>Class</th>
                    <th>Gender</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.students.map(s => (
                    <tr key={s._id}>
                      <td>{s.admissionNumber}</td>
                      <td>{s.firstName} {s.lastName}</td>
                      <td>{s.studentClass?.name}</td>
                      <td>{s.gender}</td>
                      <td>{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <div className="stat-grid" style={{ marginBottom: '30px' }}>
                <div className="stat-card">
                  <div className="label">Total Collected</div>
                  <div className="value">UGX {data.summary.totalCollected.toLocaleString()}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Total Transactions</div>
                  <div className="value">{data.summary.count}</div>
                </div>
              </div>

              <h3>Breakdown by Fee Type</h3>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                {Object.entries(data.summary.breakdownByType).map(([type, amount]) => (
                  <div key={type} className="panel-card" style={{ flex: 1, textAlign: 'center' }}>
                    <strong>{type}</strong>
                    <div style={{ color: '#2563eb', fontSize: '18px', fontWeight: '700' }}>UGX {amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Receipt</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map(p => (
                    <tr key={p._id}>
                      <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                      <td>{p.student?.firstName} {p.student?.lastName}</td>
                      <td>{p.receiptNumber}</td>
                      <td>{p.feeType}</td>
                      <td>UGX {p.amountPaid.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media print {
          .page-header, .page-actions, .page-shell > .panel-card:first-of-type, Sidebar, Topbar {
            display: none !important;
          }
          .report-print-area {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
          body {
            background: #fff !important;
          }
        }
      `}</style>
    </div>
  );
}
