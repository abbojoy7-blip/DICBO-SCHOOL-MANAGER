import LoadingState from '../../components/ui/LoadingState';
import { useEffect, useState } from 'react';

export default function LibrarianDashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 160); return ()=>clearTimeout(t); },[]);
  return (
    <div className="page-shell">
      {loading ? <LoadingState message="Loading library catalogue…" /> : (
        <div>
          <div className="page-header"><div><p className="eyebrow">Library</p><h2>Catalogue & circulation</h2></div></div>
          <div className="dashboard-grid">
            <div className="panel-card">Issue / return books, manage fines.</div>
            <div className="panel-card">Reports and availability.</div>
          </div>
        </div>
      )}
    </div>
  )
}
