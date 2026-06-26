export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10000}}>
      <div style={{background:'#fff', padding:20, borderRadius:16, width:360, boxShadow:'0 20px 50px rgba(15,23,42,.16)'}}>
        <h3>{title}</h3>
        <p style={{marginTop:8, color:'#64748b'}}>{message}</p>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:16}}>
          <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="btn btn-warning">Confirm</button>
        </div>
      </div>
    </div>
  );
}
