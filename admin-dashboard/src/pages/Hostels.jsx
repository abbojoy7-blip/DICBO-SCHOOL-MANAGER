import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHostels = async () => {
    setLoading(true);
    try {
      const res = await api.get('/hostels');
      setHostels(res.data.hostels || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHostels(); }, []);

  const columns = [
    { key: 'name', label: 'Hostel Name', render: (val) => <strong>{val}</strong> },
    { key: 'type', label: 'Type', render: (val) => <span className="badge badge-info">{val}</span> },
    { key: 'capacity', label: 'Capacity', render: (val) => `${val} Learners` },
    { key: 'warden', label: 'Warden', render: (val) => val?.name || 'Unassigned' },
    { key: 'actions', label: 'Actions', render: () => <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }}>Manage</button> }
  ];

  return (
    <TablePage
      title="Hostel & Boarding"
      eyebrow="Accommodation"
      columns={columns}
      data={hostels}
      loading={loading}
      onRefresh={fetchHostels}
      addLabel="Register Hostel"
      onAdd={() => alert("Feature coming soon")}
    />
  );
}
