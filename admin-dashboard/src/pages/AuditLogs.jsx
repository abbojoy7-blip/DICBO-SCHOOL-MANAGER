import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/system/audit-logs');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Security & Compliance</p>
          <h2>System Audit Trails</h2>
        </div>
        <button className="btn btn-secondary" onClick={fetchLogs}>Refresh Logs</button>
      </div>

      <div className="panel-card">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>School</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <td style={{ fontSize: 12 }}>{new Date(log.createdAt).toLocaleString()}</td>
                <td>
                  <strong>{log.user?.name}</strong>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{log.user?.email}</div>
                </td>
                <td><span className="badge badge-info" style={{ fontSize: 10 }}>{log.action}</span></td>
                <td style={{ fontSize: 13, color: '#475569' }}>{log.details}</td>
                <td>{log.school?.name || 'Platform'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
