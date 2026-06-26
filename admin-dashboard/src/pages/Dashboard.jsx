import { useEffect, useMemo, useState } from 'react';
import LoadingState from '../components/ui/LoadingState';

export default function Dashboard(){
  const [stats, setStats] = useState({ totalStudents:0, paidFees:0, pendingFees:0, attendance:0, avgScore:0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const reports = JSON.parse(localStorage.getItem('reports')||'null');
    const payments = JSON.parse(localStorage.getItem('fees')||'[]');
    const students = JSON.parse(localStorage.getItem('students')||'[]');
    const attendance = JSON.parse(localStorage.getItem('attendance')||'[]');
    const exams = JSON.parse(localStorage.getItem('exams')||'[]');
    const nextStats = reports || { totalStudents: students.length, paidFees:0, pendingFees:0 };
    setStats({
      totalStudents: students.length,
      paidFees: payments.filter(item => item.status === 'Paid').length,
      pendingFees: payments.filter(item => item.status !== 'Paid').length,
      attendance: Math.round((attendance.filter(item => item.status === 'Present').length / Math.max(attendance.length, 1)) * 100),
      avgScore: Math.round(exams.reduce((sum, item) => sum + item.score, 0) / Math.max(exams.length, 1))
    });
    setRecent(payments.slice(0,5));
    setLoading(false);
  },[]);

  const lineData = useMemo(() => [
    {name:'Jan', value: 420}, {name:'Feb', value: 470}, {name:'Mar', value: 510}, {name:'Apr', value: 590}, {name:'May', value: 680}, {name:'Jun', value: 740}
  ], []);

  const attendanceTrend = useMemo(() => [
    {name:'Mon', present: 92}, {name:'Tue', present: 95}, {name:'Wed', present: 91}, {name:'Thu', present: 96}, {name:'Fri', present: 98}
  ], []);

  const feeData = [
    {name:'Paid', value: stats.paidFees},
    {name:'Pending', value: stats.pendingFees}
  ];

  const COLORS = ['#10b981','#f59e0b'];

  return (
    <div className="page-shell">
      {loading ? <LoadingState /> : (
      <>
      <div className="hero-card">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h2 className="hero-card__title">DICBO School Manager is running in demo mode</h2>
          <p className="hero-card__subtitle">Track admissions, fee collection, attendance, and academic performance from a single premium dashboard tailored for school leadership.</p>
        </div>
        <div className="hero-badge">● Live demo • Sample data • Local storage</div>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><div className="label">Total students</div><div className="value counter">{stats.totalStudents}</div><div className="delta">+8% this term</div></div>
        <div className="stat-card"><div className="label">Fee status</div><div className="value counter">{stats.paidFees}/{stats.paidFees + stats.pendingFees}</div><div className="delta">Paid this month</div></div>
        <div className="stat-card"><div className="label">Attendance</div><div className="value counter">{stats.attendance}%</div><div className="delta">Above target</div></div>
        <div className="stat-card"><div className="label">Average score</div><div className="value counter">{stats.avgScore}%</div><div className="delta">Top quartile</div></div>
      </div>

      <div className="dashboard-grid">
        <div className="table-card">
          <div className="page-header" style={{marginBottom:12}}>
            <div><p className="eyebrow">Enrollment trend</p><h3>Student enrollment</h3></div>
            <button className="btn btn-secondary">Export Excel</button>
          </div>
          <div style={{ height: 240, display: 'flex', alignItems: 'flex-end', gap: 10, paddingTop: 16 }}>
            {lineData.map((item) => (
              <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: 26, height: `${Math.max(20, item.value / 6)}px`, background: 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)', borderRadius: 8 }} />
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-card">
          <div className="page-header" style={{marginBottom:12}}>
            <div><p className="eyebrow">Fee portfolio</p><h3>Collection mix</h3></div>
            <button className="btn btn-secondary">Export PDF</button>
          </div>
          <div style={{ height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'conic-gradient(#10b981 0 58%, #f59e0b 58% 100%)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 24, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0f172a' }}>{stats.paidFees + stats.pendingFees}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /> Paid</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} /> Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="table-card">
          <div className="page-header" style={{marginBottom:12}}>
            <div><p className="eyebrow">Learning pulse</p><h3>Attendance and exams</h3></div>
            <button className="btn btn-secondary">Print summary</button>
          </div>
          <div style={{ height: 220, display: 'flex', alignItems: 'flex-end', gap: 12, paddingTop: 16 }}>
            {attendanceTrend.map((item) => (
              <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: 160, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: 28, height: `${item.present}px`, background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)', borderRadius: 8 }} />
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="list-card">
          <div className="page-header" style={{marginBottom:12}}>
            <div><p className="eyebrow">Recent activity</p><h3>Latest updates</h3></div>
            <span className="badge badge-info">4 new</span>
          </div>
          <ul>{recent.map((item) => <li key={item.id}><div><strong>{item.student}</strong><div style={{color:'#64748b', fontSize:13}}>{item.status} • {item.receipt}</div></div><span style={{color:'#2563eb', fontWeight:700}}>{item.date}</span></li>)}</ul>
        </div>
      </div>
      </>
      )}
    </div>
  )
}
