import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingState from '../../components/ui/LoadingState';
import { useAuth } from '../../context/AuthContext';

export default function StudentsList(){
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem('students')||'[]');
    let visible = all;
    if(user?.role === 'teacher'){
      const classes = JSON.parse(localStorage.getItem('classes')||'[]');
      const my = classes.filter(c=> (c.teacher||'').toLowerCase() === (user.name||'').toLowerCase());
      const myNames = my.map(m=>m.name);
      visible = all.filter(s => myNames.some(n => (n||'').includes(s.class)));
    }else if(user?.role === 'parent'){
      const ids = user.children || [];
      visible = all.filter(s => ids.includes(s.id));
    }else if(user?.role === 'student'){
      visible = all.filter(s => s.id === user.studentId);
    }
    setStudents(visible);
    setLoading(false);
  },[]);

  const doSearch = () => {
    const all = JSON.parse(localStorage.getItem('students')||'[]');
    setStudents(all.filter(s=> (s.name||'').toLowerCase().includes(query.toLowerCase()) || (s.admissionNumber||'').includes(query) ));
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Student records</p>
          <h2>Admissions & learner profiles</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">Export Excel</button>
          <button className="btn btn-primary" onClick={()=>navigate('/students/new')}>Add student</button>
        </div>
      </div>

      {loading ? <LoadingState message="Preparing student records…" /> : <div className="panel-card">
        <div className="page-header" style={{marginBottom:12}}>
          <div><strong>Search and manage learners</strong><div style={{color:'#64748b', fontSize:13}}>Filter by name, admission number, or class.</div></div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <input placeholder="Search students" value={query} onChange={e=>setQuery(e.target.value)} style={{padding:'10px 12px',borderRadius:10,border:'1px solid #e2e8f0', minWidth:220}} />
            <button className="btn btn-primary" onClick={doSearch}>Search</button>
          </div>
        </div>
        <table className="table">
          <thead><tr><th>Name</th><th>Admission</th><th>Class</th><th>Fee</th><th>Action</th></tr></thead>
          <tbody>
            {students.map(s=> (
              <tr key={s.id}>
                <td><div className="profile-card" style={{padding:0, background:'transparent', border:'0', boxShadow:'none'}}><div className="avatar">{(s.name||'').split(' ').map(p=>p[0]).slice(0,2).join('')}</div><div><strong>{s.name}</strong><div style={{color:'#64748b',fontSize:13}}>{s.gender || 'Learner'}</div></div></div></td>
                <td>{s.admissionNumber}</td>
                <td>{s.class}</td>
                <td><span className={s.feeStatus === 'Paid' ? 'badge badge-success' : 'badge badge-warning'}>{s.feeStatus}</span></td>
                <td><Link to={`/students/${s.id}`} className="btn btn-secondary">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  )
}
