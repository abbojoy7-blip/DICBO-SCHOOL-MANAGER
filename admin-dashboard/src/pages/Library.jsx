import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TablePage from '../components/TablePage';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/library');
      setBooks(res.data.books || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const columns = [
    { key: 'title', label: 'Title', render: (val) => <strong>{val}</strong> },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'available', label: 'Availability', render: (val, row) => `${val}/${row.quantity} Books` },
    { key: 'status', label: 'Status', render: (_, row) => <span className={`badge ${row.available > 0 ? 'badge-success' : 'badge-warning'}`}>{row.available > 0 ? 'In Stock' : 'All Issued'}</span> },
    { key: 'actions', label: 'Action', render: () => <button className="btn btn-secondary">Issue</button> }
  ];

  return (
    <TablePage
      title="Library Catalog"
      eyebrow="Resource Center"
      columns={columns}
      data={books}
      loading={loading}
      onRefresh={fetchBooks}
      addLabel="Add Book"
      onAdd={() => alert("Feature coming soon")}
    />
  );
}
