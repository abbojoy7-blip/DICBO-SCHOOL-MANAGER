import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await api.get('/visitors');
      setVisitors(res.data.visitors || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVisitors(); }, []);

  const columns = [
    { key: 'name', label: 'Visitor Name', render: (val) => <strong>{val}</strong> },
    { key: 'phone', label: 'Contact' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'whomToSee', label: 'Whom to See' },
    { key: 'checkIn', label: 'Check-in', render: (val) => new Date(val).toLocaleString() },
    { key: 'checkOut', label: 'Status', render: (val) => val ? <span className="badge badge-secondary">Departed</span> : <button className="btn btn-warning" style={{ padding: '4px 8px', fontSize: 11 }}>Check Out</button> }
  ];

  return (
    <TablePage
      title="Visitor Management"
      eyebrow="Front Office"
      columns={columns}
      data={visitors}
      loading={loading}
      onRefresh={fetchVisitors}
      addLabel="Record Entry"
      onAdd={() => alert("Feature coming soon")}
    />
  );
}
