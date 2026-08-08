import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inventory/assets');
      setAssets(res.data.assets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssets(); }, []);

  const columns = [
    { key: 'tagNumber', label: 'Tag', render: (val) => <code>{val}</code> },
    { key: 'name', label: 'Asset Name', render: (val) => <strong>{val}</strong> },
    { key: 'category', label: 'Category' },
    { key: 'value', label: 'Value', render: (val) => `UGX ${val?.toLocaleString()}` },
    { key: 'status', label: 'Status', render: (val) => <span className="badge badge-info">{val}</span> },
    { key: 'actions', label: 'Actions', render: () => <button className="btn btn-secondary" style={{ padding: '4px 8px' }}>History</button> }
  ];

  return (
    <TablePage
      title="Asset Register"
      eyebrow="Property & Equipment"
      columns={columns}
      data={assets}
      loading={loading}
      onRefresh={fetchAssets}
      addLabel="Add Asset"
      onAdd={() => alert("Feature coming soon")}
    />
  );
}
