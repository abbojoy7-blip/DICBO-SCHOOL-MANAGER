import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function StudentView(){
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const s = (JSON.parse(localStorage.getItem('students')||'[]')).find(x=>x.id===id);
    setStudent(s);
  },[id]);

  if(!student) return <div className="panel-card">Student not found</div>;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Student profile</p>
          <h2>{student.name}</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/preview/report-card?student=' + student.id)}>Preview report</button>
          <button className="btn btn-primary" onClick={()=>navigate(`/students/${id}/edit`)}>Edit profile</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel-card">
          <div className="profile-card" style={{marginBottom:12}}>
            <div className="avatar avatar-large">{student.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
            <div>
              <h3>{student.name}</h3>
              <p style={{color:'#64748b'}}>Admission {student.admissionNumber} • {student.class}</p>
            </div>
          </div>
          <div className="stats-grid">
            <div className="panel-card"><strong>96%</strong><span>Attendance</span></div>
            <div className="panel-card"><strong>A</strong><span>Latest grade</span></div>
            <div className="panel-card"><strong>Paid</strong><span>Fee status</span></div>
          </div>
        </div>
        <div className="panel-card">
          <h3>Quick actions</h3>
          <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
            <button className="btn btn-secondary" onClick={() => navigate('/preview/receipt?student=' + student.id)}>View fee receipt</button>
            <button className="btn btn-secondary">Send message</button>
            <button className="btn btn-primary">Schedule meeting</button>
          </div>
        </div>
      </div>
    </div>
  )
}
