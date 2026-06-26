export default function Placeholder({title}){
  return (
    <div style={{background:'#fff',padding:24,borderRadius:16,boxShadow:'0 10px 30px rgba(15,23,42,.06)', border:'1px solid #eef2f7'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', gap:12, flexWrap:'wrap', marginBottom:16}}>
        <div>
          <h2 style={{margin:0, fontSize:24}}>{title}</h2>
          <p style={{margin:'4px 0 0', color:'#64748b'}}>This module is ready for deeper feature work while keeping the presentation experience polished.</p>
        </div>
        <div style={{padding:'8px 12px', borderRadius:999, background:'#eff6ff', color:'#2563eb', fontWeight:600}}>Preview Mode</div>
      </div>
      <div style={{display:'grid', gap:12, gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))'}}>
        <div style={{padding:16, borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0'}}>
          <strong>Next step</strong>
          <p style={{margin:'6px 0 0', color:'#64748b'}}>Add forms, filters, or workflow actions to turn this view into a complete feature.</p>
        </div>
        <div style={{padding:16, borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0'}}>
          <strong>Data source</strong>
          <p style={{margin:'6px 0 0', color:'#64748b'}}>All current demo content is stored in local storage for instant refresh and persistence.</p>
        </div>
      </div>
    </div>
  )
}
