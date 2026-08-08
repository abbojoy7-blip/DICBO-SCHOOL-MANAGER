import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Payroll() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      const res = await api.get('/hr/payroll');
      setRecords(res.data.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPayroll(); }, []);

  const columns = [
    { key: 'staff', label: 'Employee', render: (val) => <strong>{val?.name}</strong> },
    { key: 'period', label: 'Period', render: (_, row) => `${row.month}/${row.year}` },
    { key: 'basicSalary', label: 'Basic', render: (val) => `UGX ${val?.toLocaleString()}` },
    { key: 'netSalary', label: 'Net Pay', render: (val) => <strong>UGX {val?.toLocaleString()}</strong> },
    { key: 'status', label: 'Status', render: (val) => <span className={`badge ${val === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{val}</span> },
    { key: 'actions', label: 'Action', render: () => <button className="btn btn-secondary" style={{ padding: '4px 8px' }}>Payslip</button> }
  ];

  return (
    <TablePage
      title="Staff Payroll"
      eyebrow="HR & Finance"
      columns={columns}
      data={records}
      loading={loading}
      onRefresh={fetchPayroll}
      addLabel="Process Payroll"
      onAdd={() => alert("Feature coming soon")}
    />
  );
}
