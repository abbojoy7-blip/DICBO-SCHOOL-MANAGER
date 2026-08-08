import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inventory');
      setItems(res.data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState message="Accessing inventory records..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Stock Management</p>
          <h2>Consumables & Inventory</h2>
        </div>
        <button className="btn btn-primary">Add Item</button>
      </div>

      <div className="panel-card">
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i._id}>
                <td><strong>{i.name}</strong></td>
                <td>{i.category}</td>
                <td>{i.quantity}</td>
                <td>{i.unit}</td>
                <td><span className={`badge ${i.quantity > i.reorderLevel ? 'badge-success' : 'badge-warning'}`}>{i.quantity > i.reorderLevel ? 'In Stock' : 'Low Stock'}</span></td>
                <td><button className="btn btn-secondary">Update Stock</button></td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No inventory items registered.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
