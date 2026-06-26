import LoadingState from '../../components/ui/LoadingState';
import { useEffect, useState } from 'react';

export default function FinanceDashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 160); return ()=>clearTimeout(t); },[]);
  return (
    <div className="page-shell">
      {loading ? <LoadingState message="Loading finance tools…" /> : (
        <div>
          <div className="page-header"><div><p className="eyebrow">Finance</p><h2>Payments and reports</h2></div></div>
          <div className="dashboard-grid">
            <div className="panel-card">Payments, receipts and balances.</div>
            <div className="panel-card">Financial reports and exports.</div>
          </div>
        </div>
      )}
    </div>
  )
}
