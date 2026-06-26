import LoadingState from '../../components/ui/LoadingState';
import { useEffect, useState } from 'react';

export default function TeacherDashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 160); return ()=>clearTimeout(t); },[]);
  return (
    <div className="page-shell">
      {loading ? <LoadingState message="Preparing your teacher workspace…" /> : (
        <div>
          <div className="page-header"><div><p className="eyebrow">Teacher</p><h2>My Classes & Activities</h2></div></div>
          <div className="dashboard-grid">
            <div className="panel-card">My Classes, attendance and marks entry are available here.</div>
            <div className="panel-card">Homework, timetable and messages.</div>
          </div>
        </div>
      )}
    </div>
  )
}
