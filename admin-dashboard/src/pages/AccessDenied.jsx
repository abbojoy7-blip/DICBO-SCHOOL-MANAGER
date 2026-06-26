import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Restricted access</p>
          <h2 className="hero-card__title">This demo role does not have access to this workspace yet.</h2>
          <p className="hero-card__subtitle">Use the role-specific portal from the sidebar or return to the demo landing page to continue the presentation flow.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/landing')}>Go to landing</button>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
      <div className="panel-card">
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="notice">Demo permissions are intentionally simple so the presentation stays focused on workflow and polish.</div>
          <div><strong>What you can do next</strong><div style={{ color: '#64748b', marginTop: 6 }}>Choose a role-specific portal, open a module from the sidebar, or return to the landing experience to demo another account.</div></div>
        </div>
      </div>
    </div>
  );
}
