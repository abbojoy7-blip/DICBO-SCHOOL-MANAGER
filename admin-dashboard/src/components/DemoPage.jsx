import { useEffect, useMemo, useState } from 'react';
import LoadingState from './ui/LoadingState';
import Toast from './ui/Toast';
import ConfirmDialog from './ui/ConfirmDialog';

function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export default function DemoPage({ title, description, storageKey, seedData, columns, actions = [], emptyMessage = 'No records yet.' }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState('edit');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  useEffect(() => {
    if (!localStorage.getItem(storageKey) && seedData?.length) {
      write(storageKey, seedData);
    }
    const data = read(storageKey, seedData || []);
    setRows(data);
    const t = window.setTimeout(() => setLoading(false), 180);
    return () => window.clearTimeout(t);
  }, [storageKey]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const haystack = Object.values(row).join(' ').toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' || row.status === statusFilter || row.category === statusFilter || row.type === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, statusFilter]);

  const statusOptions = useMemo(() => {
    const values = rows.flatMap((row) => [row.status, row.category, row.type].filter(Boolean));
    return ['All', ...Array.from(new Set(values))];
  }, [rows]);

  const saveDemo = (row) => {
    const data = read(storageKey, seedData || []);
    const next = row.id ? data.map((item) => (item.id === row.id ? row : item)) : [{ ...row, id: Date.now().toString() }, ...data];
    write(storageKey, next);
    setRows(next);
    setSelected(null);
    setDialogMode('edit');
    setToast({ visible: true, message: 'Saved successfully', type: 'success' });
    window.setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 1800);
  };

  const deleteDemo = (row) => {
    const data = read(storageKey, seedData || []);
    const next = data.filter((item) => item.id !== row.id);
    write(storageKey, next);
    setRows(next);
    setConfirmDelete(null);
    setToast({ visible: true, message: 'Removed from demo data', type: 'warning' });
    window.setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 1800);
  };

  const openDialog = (row, mode = 'view') => {
    setSelected(row ? { ...row } : {});
    setDialogMode(mode);
  };

  const closeDialog = () => {
    setSelected(null);
    setDialogMode('edit');
  };

  if (loading) return <LoadingState message={`Preparing ${title.toLowerCase()}…`} />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Portal module</p>
          <h2>{title}</h2>
          <p style={{ color: '#64748b', marginTop: 4 }}>{description}</p>
        </div>
        <div className="page-actions">
          <input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', minWidth: 220 }} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
            {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => openDialog({}, 'edit')}>New record</button>
        </div>
      </div>

      <div className="panel-card">
        {filteredRows.length === 0 ? (
          <div style={{ padding: 28, color: '#64748b', border: '1px dashed #cbd5e1', borderRadius: 12, background: '#f8fafc', textAlign: 'center' }}>
            <strong style={{ display: 'block', color: '#0f172a', marginBottom: 6 }}>No records available</strong>
            <div>{emptyMessage}</div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.key}>{column.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => <td key={column.key}>{column.render ? column.render(row[column.key], row) : (row[column.key] || '—')}</td>)}
                  <td>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button className="btn btn-secondary" onClick={() => openDialog(row, 'view')}>View</button>
                      {actions.includes('edit') && <button className="btn btn-warning" onClick={() => openDialog(row, 'edit')}>Edit</button>}
                      {actions.includes('delete') && <button className="btn btn-warning" onClick={() => setConfirmDelete(row)}>Delete</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11000 }}>
          <div style={{ background: '#fff', width: 640, maxWidth: '92vw', padding: 24, borderRadius: 16, boxShadow: '0 20px 45px rgba(15,23,42,.16)' }}>
            <div className="page-header" style={{ marginBottom: 12 }}>
              <div>
                <p className="eyebrow">Dialog</p>
                <h3>{selected.id ? 'Details' : 'New record'}</h3>
              </div>
              <button className="btn btn-secondary" onClick={closeDialog}>Close</button>
            </div>
            {dialogMode === 'view' ? (
              <div style={{ display: 'grid', gap: 10 }}>
                {columns.map((column) => (
                  <div key={column.key}>
                    <label>{column.label}</label>
                    <div style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#f8fafc' }}>{selected[column.key] || '—'}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {columns.map((column) => (
                  <div key={column.key}>
                    <label>{column.label}</label>
                    <input value={selected[column.key] || ''} onChange={(e) => setSelected({ ...selected, [column.key]: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #e2e8f0' }} />
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
              <button className="btn btn-secondary" onClick={closeDialog}>Cancel</button>
              {dialogMode === 'view' ? <button className="btn btn-warning" onClick={() => setDialogMode('edit')}>Edit</button> : <button className="btn btn-primary" onClick={() => saveDemo(selected)}>Save</button>}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={Boolean(confirmDelete)} title="Remove this record?" message="This only affects the local demo data shown in the portal." onConfirm={() => deleteDemo(confirmDelete)} onCancel={() => setConfirmDelete(null)} />
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}
