import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function LeaveManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get('/hr/leave');
      setRequests(res.data.requests || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState message="Accessing leave records..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Staff HR</p>
          <h2>Leave & Absence Management</h2>
        </div>
        <button className="btn btn-primary">Apply for Leave</button>
      </div>

      <div className="panel-card">
        <table className="table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r._id}>
                <td><strong>{r.staff?.name}</strong></td>
                <td>{r.leaveType}</td>
                <td>{new Date(r.startDate).toLocaleDateString()}</td>
                <td>{new Date(r.endDate).toLocaleDateString()}</td>
                <td><span className={`badge ${r.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span></td>
                <td><button className="btn btn-secondary">Details</button></td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No leave requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
