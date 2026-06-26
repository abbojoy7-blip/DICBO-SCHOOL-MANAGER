import LoadingState from '../../components/ui/LoadingState';
import { useEffect, useState } from 'react';

export default function StudentDashboard(){
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const t = setTimeout(()=>setLoading(false), 160); return ()=>clearTimeout(t); },[]);
  return (
    <div className="page-shell">
      {loading ? <LoadingState message="Loading your student dashboard…" /> : (
        <div>
          <div className="page-header"><div><p className="eyebrow">Student</p><h2>Welcome, learner</h2></div></div>
          <div className="dashboard-grid">
            <div className="panel-card">Profile, timetable and attendance.</div>
            <div className="panel-card">Exam results and report cards.</div>
          </div>
        </div>
      )}
    </div>
  )
}
