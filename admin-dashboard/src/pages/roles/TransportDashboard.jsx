import LoadingState from '../../components/ui/LoadingState';
import { useEffect, useState } from 'react';

export default function TransportDashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 160); return ()=>clearTimeout(t); },[]);
  return (
    <div className="page-shell">
      {loading ? <LoadingState message="Preparing transport assignments…" /> : (
        <div>
          <div className="page-header"><div><p className="eyebrow">Transport</p><h2>Vehicles & routes</h2></div></div>
          <div className="dashboard-grid">
            <div className="panel-card">Manage vehicles, drivers and routes.</div>
            <div className="panel-card">Student assignments and pickup lists.</div>
          </div>
        </div>
      )}
    </div>
  )
}
