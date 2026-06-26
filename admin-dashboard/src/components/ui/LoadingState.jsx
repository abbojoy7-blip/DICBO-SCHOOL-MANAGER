export default function LoadingState({ message = 'Loading your school dashboard…' }) {
  return (
    <div className="panel-card" style={{ display: 'grid', placeItems: 'center', minHeight: 220 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', border: '4px solid #dbeafe', borderTopColor: '#2563eb', margin: '0 auto 10px', animation: 'spin 0.8s linear infinite' }} />
        <strong>{message}</strong>
        <div style={{ color: '#64748b', marginTop: 6 }}>Preparing the latest school insights.</div>
      </div>
    </div>
  );
}