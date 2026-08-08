import React, { useState } from 'react';
import LoadingState from './ui/LoadingState';

export default function TablePage({
  title,
  eyebrow,
  columns,
  data = [],
  loading,
  onAdd,
  addLabel,
  onRefresh,
  searchPlaceholder = "Search records..."
}) {
  const [query, setQuery] = useState('');

  const filtered = data.filter(row => {
    return Object.values(row).some(val =>
      String(val).toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
        </div>
        <div className="page-actions">
           {onRefresh && <button className="btn btn-secondary" onClick={onRefresh}>Refresh</button>}
           {onAdd && <button className="btn btn-primary" onClick={onAdd}>{addLabel || 'Add New'}</button>}
        </div>
      </div>

      <div className="panel-card">
        <div style={{ marginBottom: 20, maxWidth: 400 }}>
           <input
             placeholder={searchPlaceholder}
             value={query}
             onChange={e => setQuery(e.target.value)}
             style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0' }}
           />
        </div>

        {loading ? (
          <LoadingState message={`Accessing ${title.toLowerCase()}...`} />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  {columns.map(col => <th key={col.key}>{col.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row._id || idx}>
                    {columns.map(col => (
                      <td key={col.key}>{col.render ? col.render(row[col.key], row) : (row[col.key] || '—')}</td>
                    ))}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                       <div style={{ fontSize: 32, marginBottom: 10 }}>📂</div>
                       <strong>No records found</strong>
                       <p style={{ fontSize: 13 }}>There are no entries matching your search criteria.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
