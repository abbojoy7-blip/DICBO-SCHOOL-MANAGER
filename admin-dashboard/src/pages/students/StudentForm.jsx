import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function StudentForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', admissionNumber:'', class:'', gender:'male', feeStatus:'Pending' });

  useEffect(()=>{
    if(id){
      const s = (JSON.parse(localStorage.getItem('students')||'[]')).find(x=>x.id===id);
      if(s) setForm(s);
    }
  },[id]);

  const submit = (e) =>{
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem('students')||'[]');
    if(id){
      const updated = all.map(a=> a.id===id ? {...a, ...form} : a);
      localStorage.setItem('students', JSON.stringify(updated));
    }else{
      const rec = {...form, id: uuid()};
      all.unshift(rec);
      localStorage.setItem('students', JSON.stringify(all));
    }
    navigate('/students');
  }

  return (
    <form onSubmit={submit} style={{background:'#fff',padding:16,borderRadius:8}}>
      <h2>{id? 'Edit Student' : 'Add Student'}</h2>
      <label style={{display:'block',marginTop:8}}>Name</label>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
      <label style={{display:'block',marginTop:8}}>Admission No</label>
      <input value={form.admissionNumber} onChange={e=>setForm({...form,admissionNumber:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
      <label style={{display:'block',marginTop:8}}>Class</label>
      <input value={form.class} onChange={e=>setForm({...form,class:e.target.value})} style={{width:'100%',padding:8,borderRadius:6,border:'1px solid #e5e7eb'}} />
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button type="submit" style={{padding:8,borderRadius:6,background:'#10b981',color:'#fff',border:'none'}}>{id? 'Save' : 'Create'}</button>
        <button type="button" onClick={()=>navigate(-1)} style={{padding:8,borderRadius:6,background:'#e5e7eb',border:'none'}}>Cancel</button>
      </div>
    </form>
  )
}
