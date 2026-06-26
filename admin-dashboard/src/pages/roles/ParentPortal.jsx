import RolePortalDashboard from '../../components/RolePortalDashboard';
import DemoPage from '../../components/DemoPage';

const children = [
  { id: 'c1', name: 'John Doe', class: 'P5 Blue', status: 'On track' },
  { id: 'c2', name: 'Jane Doe', class: 'P2 Yellow', status: 'Excellent' }
];

const attendance = [
  { id: 'pa1', child: 'John Doe', date: '2026-06-26', status: 'Present' }
];

const progress = [
  { id: 'pp1', child: 'John Doe', subject: 'Mathematics', score: '88', grade: 'A' }
];

const fees = [
  { id: 'pf1', child: 'John Doe', term: 'Term 3', balance: 'UGX 200,000', status: 'Pending' }
];

const payments = [
  { id: 'pay1', child: 'John Doe', amount: 'UGX 200,000', date: '2026-06-01', method: 'Mobile money' }
];

const reportCards = [
  { id: 'rc1', child: 'John Doe', term: 'Term 2', score: '86%', status: 'Ready' }
];

const messages = [
  { id: 'pm1', from: 'Teacher', subject: 'Parent meeting', status: 'Unread' }
];

const announcements = [
  { id: 'pan1', title: 'School fair', body: 'Please confirm attendance', type: 'info' }
];

export default function ParentPortal(){
  return (
    <div>
      <RolePortalDashboard title="Parent Portal" subtitle="Track your children’s attendance, progress, fees, and school updates in a single parent dashboard." badge="● Parent workspace • Demo mode" stats={[{label:'Children linked',value:'2',delta:'Both active'},{label:'Attendance',value:'96%',delta:'Excellent'},{label:'Report cards',value:'2',delta:'Ready'},{label:'Outstanding fees',value:'UGX 200k',delta:'Due soon'}]} chartData={[{name:'Math',value:88},{name:'English',value:76},{name:'Science',value:90}]} recent={[{title:'Report card ready',detail:'John Doe report card is ready to review',date:'Today'},{title:'Fee reminder',detail:'Term 3 balance remains due',date:'Yesterday'}]} />
      <div className="page-shell">
        <div className="dashboard-grid">
          <DemoPage title="Child Selector" description="Switch between linked children" storageKey="parent-children" seedData={children} columns={[{key:'name',label:'Child'},{key:'class',label:'Class'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Attendance Summary" description="Daily attendance views for each child" storageKey="parent-attendance" seedData={attendance} columns={[{key:'child',label:'Child'},{key:'date',label:'Date'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Academic Progress" description="Performance and growth overview" storageKey="parent-progress" seedData={progress} columns={[{key:'child',label:'Child'},{key:'subject',label:'Subject'},{key:'score',label:'Score'},{key:'grade',label:'Grade'}]} actions={['edit']} />
          <DemoPage title="Fee Statement" description="Current fee balance and due items" storageKey="parent-fees" seedData={fees} columns={[{key:'child',label:'Child'},{key:'term',label:'Term'},{key:'balance',label:'Balance'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Payment History" description="Record of school payments" storageKey="parent-payments" seedData={payments} columns={[{key:'child',label:'Child'},{key:'amount',label:'Amount'},{key:'date',label:'Date'},{key:'method',label:'Method'}]} actions={['edit']} />
          <DemoPage title="Report Cards" description="Termly academic reports" storageKey="parent-report-cards" seedData={reportCards} columns={[{key:'child',label:'Child'},{key:'term',label:'Term'},{key:'score',label:'Score'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Teacher Communication" description="Notes and messages from school staff" storageKey="parent-messages" seedData={messages} columns={[{key:'from',label:'From'},{key:'subject',label:'Subject'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Announcements" description="School announcements and reminders" storageKey="parent-announcements" seedData={announcements} columns={[{key:'title',label:'Title'},{key:'body',label:'Body'},{key:'type',label:'Type'}]} actions={['edit']} />
        </div>
      </div>
    </div>
  );
}
