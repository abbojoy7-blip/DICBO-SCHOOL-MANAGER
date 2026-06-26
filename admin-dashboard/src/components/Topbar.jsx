import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { useAuth } from '../context/AuthContext';

export default function Topbar(){
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const items = useMemo(() => {
    return [
      ...JSON.parse(localStorage.getItem('students') || '[]'),
      ...JSON.parse(localStorage.getItem('staff') || '[]'),
      ...JSON.parse(localStorage.getItem('announcements') || '[]')
    ];
  }, [location.pathname]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(items.filter(item => (item.name || item.title || item.student || '').toLowerCase().includes(q)).slice(0, 5));
  }, [query, items]);

  const switchRole = async (role) => {
    const map = {
      administrator: { route: '/dashboard', email: 'admin@demo.com' },
      teacher: { route: '/teacher', email: 'teacher@demo.com' },
      student: { route: '/student', email: 'student@demo.com' },
      parent: { route: '/parent', email: 'parent@demo.com' },
      finance: { route: '/finance', email: 'finance@demo.com' },
      librarian: { route: '/librarian', email: 'librarian@demo.com' },
      transport: { route: '/transport', email: 'transport@demo.com' }
    };
    const target = map[role];
    if (target) {
      await login(target.email, 'demo1234');
      navigate(target.route);
    }
  };

  return (
    <header className="topbar">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
        <div style={{display:'flex', alignItems:'center', gap:10, minWidth:220}}>
          <div className="logo-mark" style={{ width: 36, height: 36, borderRadius: 10, fontSize: 14 }}>D</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>DICBO School Manager</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>School Management System</div>
          </div>
        </div>
        <div style={{flex:1, minWidth:220, position:'relative'}}>
          <input value={query} onChange={e=>setQuery(e.target.value)} style={{padding:'10px 12px', borderRadius:10, border:'1px solid #e2e8f0', width:'100%', background:'#f8fafc'}} placeholder="Global search..."/>
          {results.length > 0 && <div style={{position:'absolute', background:'#fff', border:'1px solid #eee', borderRadius:10, width:'min(320px, 90vw)', zIndex:10, marginTop:4, boxShadow:'0 10px 24px rgba(15,23,42,.1)'}}>{results.map((r,i)=><div key={i} style={{padding:10, borderBottom:'1px solid #f3f4f6'}}>{r.name || r.title || r.student}</div>)}</div>}
        </div>
        <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
          <div style={{padding:'8px 10px', borderRadius:999, background:'#eff6ff', color:'#2563eb', fontWeight:700}}>🔔 3</div>
          <div style={{padding:'8px 10px', borderRadius:999, background:'#f8fafc'}}>👤 {user?.role ? user.role : 'Demo'}</div>
          <label style={{display:'flex', alignItems:'center', gap:6, padding:'8px 10px', borderRadius:999, border:'1px solid #e2e8f0', background:'#fff'}}>
            <span style={{fontSize:12, color:'#64748b'}}>Switch role</span>
            <select value={user?.role || 'administrator'} onChange={(e) => switchRole(e.target.value)} style={{border:'0', background:'transparent', outline:'none'}}>
              <option value="administrator">Administrator</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="finance">Finance</option>
              <option value="librarian">Librarian</option>
              <option value="transport">Transport</option>
            </select>
          </label>
        </div>
      </div>
      <Breadcrumbs />
    </header>
  )
}