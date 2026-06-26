import { NavLink } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const MENUS = {
  administrator: [
    ['📊 Dashboard','/dashboard'],['🎓 Students','/dashboard/students'],['👩‍🏫 Teachers','/dashboard/staff'],['👪 Parents','/dashboard/parents'],['🏫 Admissions','/dashboard/classes'],['🏫 Classes','/dashboard/classes'],['🗓️ Attendance','/dashboard/attendance'],['💰 Fees','/dashboard/fees'],['📝 Exams','/dashboard/exams'],['📅 Timetable','/dashboard/timetable'],['📚 Library','/dashboard/library'],['📦 Inventory','/dashboard/inventory'],['🚍 Transport','/dashboard/transport'],['📣 Announcements','/dashboard/announcements'],['✉️ Messages','/dashboard/messages'],['📈 Reports','/preview/report-card'],['⚙️ Settings','/dashboard/settings']
  ],
  teacher: [
    ['📊 Dashboard','/teacher'],['🏫 My Classes','/teacher/classes'],['🗓️ Attendance','/teacher/attendance'],['📝 Marks','/teacher/exams'],['✍️ Homework','/teacher/homework'],['📅 Timetable','/teacher/timetable'],['🎓 Students','/teacher/students'],['✉️ Messages','/teacher/messages'],['📣 Announcements','/teacher/announcements']
  ],
  student: [
    ['📊 Dashboard','/student'],['📅 My Timetable','/student/timetable'],['🗓️ Attendance','/student/attendance'],['✍️ Homework','/student/homework'],['📝 Results','/student/results'],['📄 Report Cards','/student/report-cards'],['💳 Fee Status','/student/fees'],['✉️ Messages','/student/messages'],['📣 Announcements','/student/announcements'],['👤 My Profile','/student/profile']
  ],
  parent: [
    ['📊 Dashboard','/parent'],['👪 My Children','/parent/children'],['🗓️ Attendance','/parent/attendance'],['📈 Academic Progress','/parent/progress'],['📄 Report Cards','/parent/report-cards'],['💳 Fee Statements','/parent/fees'],['✉️ Messages','/parent/messages'],['📣 Announcements','/parent/announcements']
  ],
  finance: [
    ['📊 Dashboard','/finance'],['💰 Payments','/finance/payments'],['🧾 Receipts','/finance/receipts'],['📋 Balances','/finance/balances'],['📈 Reports','/finance/reports']
  ],
  librarian: [
    ['📊 Dashboard','/librarian'],['📚 Books','/librarian/catalogue'],['📖 Issue Books','/librarian/issue'],['🔁 Returns','/librarian/returns'],['💸 Fines','/librarian/fines'],['📈 Reports','/librarian/reports']
  ],
  transport: [
    ['📊 Dashboard','/transport'],['🚗 Vehicles','/transport/vehicles'],['🗺️ Routes','/transport/routes'],['👨‍✈️ Drivers','/transport/drivers'],['🧑‍🎓 Student Assignments','/transport/assignments']
  ]
}

export default function Sidebar({ onLogout }) {
  const { user } = useAuth();
  const role = user?.role || 'administrator';
  const menu = MENUS[role] || MENUS['administrator'];

  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo"><span className="logo-mark">D</span> DICBO Admin</h2>
        <div className="sidebar-meta">Premium school operations</div>
      </div>

      <nav className="nav">
        {menu.map(([label, to]) => (
          <NavLink key={to} to={to} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={onLogout} className="btn btn-warning" style={{ width: '100%' }}>Sign out</button>
      </div>
    </aside>
  );
}
