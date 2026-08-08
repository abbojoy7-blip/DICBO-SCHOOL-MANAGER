import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const MENUS = {
  administrator: [
    ['📊 Dashboard','/dashboard'],
    ['🎓 Students','/dashboard/students'],
    ['👩‍🏫 Staff','/dashboard/staff'],
    ['🏫 Classes','/dashboard/classes'],
    ['🗓️ Attendance','/dashboard/attendance'],
    ['💰 Fees','/dashboard/fees'],
    ['📝 Exams & Grades','/dashboard/exams'],
    ['🏢 Hostels','/dashboard/hostels'],
    ['🏥 Medical Clinic','/dashboard/clinic'],
    ['⚖️ Discipline','/dashboard/discipline'],
    ['💸 Payroll','/dashboard/payroll'],
    ['📅 Leave Management','/dashboard/leave'],
    ['📦 Inventory','/dashboard/inventory'],
    ['🏛️ Assets','/dashboard/assets'],
    ['👤 Visitors','/dashboard/visitors'],
    ['📑 Budget','/dashboard/budget'],
    ['📈 Reports','/dashboard/reports'],
    ['⚙️ School Profile','/dashboard/settings'],
    ['ℹ️ About System','/dashboard/about']
  ],
  superadmin: [
    ['🌍 Global Stats','/dashboard/system'],
    ['🏥 System Health','/dashboard/system/health'],
    ['🏫 Manage Schools','/dashboard/system'],
    ['📄 License','/dashboard/license'],
    ['📝 Release Notes','/dashboard/release-notes'],
    ['⚙️ System Settings','/dashboard/settings']
  ]
}

export default function Sidebar({ onLogout }) {
  const { user } = useAuth();
  const { settings } = useSettings();
  const role = user?.role || 'administrator';
  const menu = MENUS[role] || MENUS['administrator'];

  return (
    <aside className="sidebar">
      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '20px' }}>
        <h2 className="logo">
          {settings?.logo ? (
            <img src={settings.logo} alt="DIT Logo" style={{ width: 42, height: 42, objectFit: 'contain' }} />
          ) : (
            <div className="logo-mark">D</div>
          )}
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.02em', color: '#fff' }}>
            {settings?.shortName || 'DIT ERP'}
          </span>
        </h2>

        <div className="sidebar-meta">Academic Excellence</div>

        <nav className="nav">
          {menu.map(([label, to]) => {
            const icon = label.split(' ')[0];
            const text = label.split(' ').slice(1).join(' ');
            return (
              <NavLink key={to} to={to} className={({isActive}) => isActive ? 'active' : ''}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span>{text}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={onLogout} className="btn btn-gold" style={{ width: '100%', fontSize: '13px' }}>Sign out</button>
      </div>
    </aside>
  );
}
