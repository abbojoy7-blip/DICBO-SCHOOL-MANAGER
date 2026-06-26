export default function Toast({ message, type='info', visible }) {
  if (!visible) return null;
  return (
    <div style={{ position:'fixed', right:16, bottom:16, background:type==='success'?'#10b981':type==='warning'?'#f59e0b':'#2563eb', color:'white', padding:'12px 14px', borderRadius:12, zIndex:9999, boxShadow:'0 12px 30px rgba(15,23,42,.16)', minWidth:220 }}>
      <strong style={{display:'block', marginBottom:2}}>{type === 'success' ? 'Success' : type === 'warning' ? 'Notice' : 'Update'}</strong>
      <span>{message}</span>
    </div>
  );
}
