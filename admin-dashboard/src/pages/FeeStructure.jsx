import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function FeeStructure() {
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStructures = async () => {
    setLoading(true);
    try {
      const res = await api.get('/fees/structures'); // Need this endpoint
      setStructures(res.data.structures || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStructures(); }, []);

  const columns = [
    { key: 'studentClass', label: 'Class', render: (val) => <strong>{val?.name}</strong> },
    { key: 'term', label: 'Term' },
    { key: 'academicYear', label: 'Year' },
    { key: 'totalAmount', label: 'Total Fees', render: (val) => `UGX ${val?.toLocaleString()}` },
    { key: 'actions', label: 'Actions', render: () => <button className="btn btn-secondary">Edit</button> }
  ];

  return (
    <TablePage
      title="Fee Structures"
      eyebrow="Financial Configuration"
      columns={columns}
      data={structures}
      loading={loading}
      onRefresh={fetchStructures}
      addLabel="Define Fee"
      onAdd={() => alert("Feature coming soon")}
    />
  );
}
