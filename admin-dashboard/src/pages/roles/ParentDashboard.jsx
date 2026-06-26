import LoadingState from '../../components/ui/LoadingState';
import { useEffect, useState } from 'react';

export default function ParentDashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 160); return ()=>clearTimeout(t); },[]);
  return (
    <div className="page-shell">
      {loading ? <LoadingState message="Preparing parent overview…" /> : (
        <div>
          <div className="page-header"><div><p className="eyebrow">Parent</p><h2>Your children</h2></div></div>
          <div className="dashboard-grid">
            <div className="panel-card">Linked child profiles and attendance.</div>
            <div className="panel-card">Report cards and fees.</div>
          </div>
        </div>
      )}
    </div>
  )
}
