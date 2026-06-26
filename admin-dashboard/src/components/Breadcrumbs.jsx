import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const crumbs = location.pathname.split('/').filter(Boolean);

  return (
    <div style={{ marginTop: 8, color: '#6b7280', fontSize: 13 }}>
      <Link to="/dashboard" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
      {crumbs.map((c, index) => {
        const path = '/' + crumbs.slice(0, index + 1).join('/');
        const label = c.charAt(0).toUpperCase() + c.slice(1);
        return <span key={path}> / <Link to={path} style={{ color: '#6b7280', textDecoration: 'none' }}>{label}</Link></span>;
      })}
    </div>
  );
}
