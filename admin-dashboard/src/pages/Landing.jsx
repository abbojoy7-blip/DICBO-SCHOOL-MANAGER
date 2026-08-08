import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--primary-navy)', backgroundColor: '#fff' }}>
      {/* Institutional Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 8%', alignItems: 'center', background: '#fff', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--academic-gold)', display: 'grid', placeItems: 'center', color: 'var(--primary-navy)', fontWeight: 900 }}>D</div>
          <h2 style={{ color: 'var(--primary-navy)', margin: 0, fontWeight: 800, fontSize: 22 }}>DIT INTERNATIONALSCHOOL</h2>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/login')} style={{ fontSize: 13, fontWeight: 700 }}>STUDENT PORTAL</button>
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ fontSize: 13, fontWeight: 700, background: 'var(--primary-navy)' }}>STAFF SIGN IN</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '120px 8%', textAlign: 'left', background: 'linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-blue) 100%)', color: '#fff', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
        <div>
          <div style={{ textTransform: 'uppercase', fontSize: 13, fontWeight: 800, color: 'var(--academic-gold)', letterSpacing: '0.2em', marginBottom: 24 }}>Official Education ERP</div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, marginBottom: '24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Trust • Excellence <br/>Discipline.
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 0 48px', lineHeight: 1.6 }}>
            The premier management solution for DIT InternationalSchool.
            Integrating admissions, advanced financials, and holistic academic tracking into a single institutional ecosystem.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="btn btn-gold" style={{ padding: '18px 40px', fontSize: '15px', borderRadius: 6, fontWeight: 800 }} onClick={() => navigate('/login')}>
              ENTER ENTERPRISE PORTAL
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center' }}>
           <div style={{ width: '100%', maxWidth: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', display: 'grid', placeItems: 'center' }}>
              <div style={{ fontSize: '160px', fontWeight: 900, color: 'var(--academic-gold)', opacity: 0.8 }}>DIT</div>
           </div>
        </div>
      </section>

      {/* Core Institutional Pillars */}
      <section style={{ padding: '100px 8%', background: 'var(--light-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          <div className="panel-card" style={{ padding: '48px', border: 'none', background: '#fff' }}>
            <h3 style={{ fontSize: 22, marginBottom: 16, color: 'var(--primary-navy)' }}>Global Governance</h3>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>Centralized administration with real-time analytics, ensuring transparency and data-driven decision making across all departments.</p>
          </div>
          <div className="panel-card" style={{ padding: '48px', border: 'none', background: '#fff' }}>
            <h3 style={{ fontSize: 22, marginBottom: 16, color: 'var(--primary-navy)' }}>Financial Integrity</h3>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>Sophisticated fee tracking and budget management protocols designed for the high standards of an international institution.</p>
          </div>
          <div className="panel-card" style={{ padding: '48px', border: 'none', background: '#fff' }}>
            <h3 style={{ fontSize: 22, marginBottom: 16, color: 'var(--primary-navy)' }}>Academic Excellence</h3>
            <p style={{ color: '#64748b', lineHeight: 1.7 }}>Comprehensive learner profiling and performance tracking systems to nurture every student's unique potential.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 8%', background: 'var(--primary-navy)', color: '#fff', borderTop: '4px solid var(--academic-gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '60px' }}>
          <div style={{ maxWidth: 400 }}>
            <h2 style={{ color: '#fff', marginBottom: 20 }}>DIT INTERNATIONALSCHOOL</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.8 }}>The official Enterprise Resource Planning (ERP) platform for DIT InternationalSchool. Built for precision, security, and educational excellence.</p>
          </div>
          <div style={{ display: 'flex', gap: '80px' }}>
            <div>
              <h4 style={{ marginBottom: 24, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--academic-gold)' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                <li>info@dit-international.edu</li>
                <li>+256 700 888 999</li>
                <li>Kampala, Uganda</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          © 2026 DIT INTERNATIONALSCHOOL • PROPRIETARY ERP SOFTWARE
          <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Powered By Dot Inspiration Technologies</div>
        </div>
      </footer>
    </div>
  );
}
