import RolePortalDashboard from '../../components/RolePortalDashboard';
import DemoPage from '../../components/DemoPage';

const subjects = [
  { id: 'sub1', name: 'Mathematics', teacher: 'Alice Muwonge', status: 'On track' },
  { id: 'sub2', name: 'English', teacher: 'Grace Teacher', status: 'Needs review' }
];

const timetable = [
  { id: 'st1', day: 'Monday', slot: '08:00', subject: 'Mathematics' },
  { id: 'st2', day: 'Tuesday', slot: '09:00', subject: 'Science' }
];

const attendance = [
  { id: 'sa1', date: '2026-06-26', status: 'Present' },
  { id: 'sa2', date: '2026-06-25', status: 'Late' }
];

const homework = [
  { id: 'sh1', title: 'Algebra revision', due: '2026-06-30', status: 'Pending' }
];

const results = [
  { id: 'sr1', subject: 'Mathematics', score: '88', grade: 'A' },
  { id: 'sr2', subject: 'English', score: '76', grade: 'B' }
];

const fees = [
  { id: 'sf1', term: 'Term 3', balance: 'UGX 200,000', status: 'Pending' }
];

const reportCards = [
  { id: 'src1', term: 'Term 2', average: '86%', conduct: 'Excellent', status: 'Ready' },
  { id: 'src2', term: 'Term 1', average: '82%', conduct: 'Good', status: 'Reviewed' }
];

const messages = [
  { id: 'sm1', from: 'Teacher', subject: 'Homework update', status: 'Unread' }
];

const announcements = [
  { id: 'san1', title: 'Sports day', body: 'Bring sportswear on Friday', type: 'info' }
];

export default function StudentPortal() {
  return (
    <div>
      <RolePortalDashboard title="Student Portal" subtitle="Stay informed about lessons, homework, attendance, fees, and results from a single student view." badge="● Student workspace • Demo mode" stats={[{label:'Attendance',value:'94%',delta:'Excellent'},{label:'Current subjects',value:'6',delta:'2 upcoming tests'},{label:'Homework',value:'2',delta:'1 due today'},{label:'Fees',value:'Pending',delta:'UGX 200k'}]} chartData={[{name:'Math',value:88},{name:'English',value:76},{name:'Science',value:91},{name:'History',value:80}]} recent={[{title:'Results published',detail:'Math score is now visible',date:'Today'},{title:'Homework assigned',detail:'Algebra revision due Friday',date:'Yesterday'}]} />
      <div className="page-shell">
        <div className="dashboard-grid">
          <DemoPage title="My Subjects" description="Current subjects and teacher contact" storageKey="student-subjects" seedData={subjects} columns={[{key:'name',label:'Subject'},{key:'teacher',label:'Teacher'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Timetable" description="Your weekly class schedule" storageKey="student-timetable" seedData={timetable} columns={[{key:'day',label:'Day'},{key:'slot',label:'Slot'},{key:'subject',label:'Subject'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Attendance History" description="Your attendance record" storageKey="student-attendance" seedData={attendance} columns={[{key:'date',label:'Date'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Homework" description="Upcoming tasks and reminders" storageKey="student-homework" seedData={homework} columns={[{key:'title',label:'Title'},{key:'due',label:'Due'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Exam Results" description="Current performance overview" storageKey="student-results" seedData={results} columns={[{key:'subject',label:'Subject'},{key:'score',label:'Score'},{key:'grade',label:'Grade'}]} actions={['edit']} />
          <DemoPage title="Fee Status" description="Your fee balance and payment status" storageKey="student-fees" seedData={fees} columns={[{key:'term',label:'Term'},{key:'balance',label:'Balance'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Report Cards" description="Termly academic reports and conduct review" storageKey="student-report-cards" seedData={reportCards} columns={[{key:'term',label:'Term'},{key:'average',label:'Average'},{key:'conduct',label:'Conduct'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Messages" description="Teacher and admin communication" storageKey="student-messages" seedData={messages} columns={[{key:'from',label:'From'},{key:'subject',label:'Subject'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Announcements" description="Latest school announcements" storageKey="student-announcements" seedData={announcements} columns={[{key:'title',label:'Title'},{key:'body',label:'Body'},{key:'type',label:'Type'}]} actions={['edit']} />
          <DemoPage title="My Profile" description="Personal details and emergency contacts" storageKey="student-profile" seedData={[{id:'sp1',name:'John Doe',admission:'ADM001',class:'P5 Blue',guardian:'Martha Parent'}]} columns={[{key:'name',label:'Name'},{key:'admission',label:'Admission'},{key:'class',label:'Class'},{key:'guardian',label:'Guardian'}]} actions={['edit']} />
        </div>
      </div>
    </div>
  );
}
