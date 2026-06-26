import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { seed } from '../data/sampleData';
import { syncDemoData } from '../data/demoData';

export default function Login(){
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    seed();
    syncDemoData();
    try{
      const u = await login(email, password);
      setLoading(false);
      // redirect based on role
      const map = {
        administrator: '/dashboard',
        teacher: '/teacher',
        student: '/student',
        parent: '/parent',
        finance: '/finance',
        librarian: '/librarian',
        transport: '/transport'
      };
      navigate(map[u.role] || '/dashboard');
    }catch(err){
      setLoading(false);
      alert('Invalid demo credentials');
    }
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-hero">
          <div>
            <div className="demo-pill">● Demo Mode • Sample school data</div>
            <h1 style={{fontSize:32, margin:'16px 0 10px'}}>DICBO School Manager</h1>
            <p style={{color:'rgba(255,255,255,.88)', maxWidth:360}}>A premium school administration experience for admissions, attendance, finances, academics, and parent communication.</p>
          </div>
          <div className="notice" style={{background:'rgba(255,255,255,.12)', color:'white', border:'1px solid rgba(255,255,255,.18)'}}>
            <strong>Trusted by forward-looking schools</strong>
            <div style={{marginTop:6}}>Realistic dashboards, secure workflows, and polished presentation-ready views.</div>
          </div>
        </div>
        <form className="login-form" onSubmit={submit}>
          <div style={{marginBottom:8}}>
            <p className="eyebrow">Secure access</p>
            <h2 style={{fontSize:24}}>Welcome back</h2>
            <p style={{color:'#64748b', marginTop:4}}>Sign in to explore the demo portal.</p>
          </div>
          <label>Email address</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
          <button disabled={loading} className="btn btn-primary" style={{width:'100%', marginTop:8}}>{loading ? 'Signing in...' : 'Sign in'}</button>
          <div className="notice" style={{marginTop:4}}>Use the demo account email of your choice with password <strong>demo1234</strong>.</div>
        </form>
      </div>
    </div>
  )
}
