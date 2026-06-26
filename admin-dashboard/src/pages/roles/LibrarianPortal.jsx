import RolePortalDashboard from '../../components/RolePortalDashboard';
import DemoPage from '../../components/DemoPage';

const books = [
  { id: 'lb1', title: 'Introduction to Algebra', author: 'M. Kato', category: 'Math', status: 'Available' },
  { id: 'lb2', title: 'World History', author: 'R. Nsubuga', category: 'History', status: 'Issued' }
];

const issues = [
  { id: 'li1', student: 'John Doe', book: 'World History', issued: '2026-06-20', due: '2026-06-30', status: 'Active' }
];

const returns = [
  { id: 'lr1', student: 'Sarah Namukasa', book: 'Introduction to Algebra', returned: '2026-06-24', status: 'Returned' }
];

const fines = [
  { id: 'lf1', student: 'John Doe', amount: 'UGX 10,000', reason: 'Late return', status: 'Pending' }
];

const overdueBooks = [
  { id: 'lo1', student: 'Brian Okello', book: 'World History', due: '2026-06-22', days: '2', status: 'Overdue' },
  { id: 'lo2', student: 'Sarah Namukasa', book: 'Introduction to Algebra', due: '2026-06-20', days: '4', status: 'Overdue' }
];

export default function LibrarianPortal(){
  return (
    <div>
      <RolePortalDashboard title="Librarian Portal" subtitle="Manage catalogues, book circulation, returns, and fine tracking in a polished library workspace." badge="● Librarian workspace • Demo mode" stats={[{label:'Books',value:'84',delta:'6 new'},{label:'Issued',value:'7',delta:'2 overdue'},{label:'Returns',value:'12',delta:'This week'},{label:'Fines',value:'UGX 30k',delta:'2 pending'}]} chartData={[{name:'Mon',value:4},{name:'Tue',value:6},{name:'Wed',value:5},{name:'Thu',value:7},{name:'Fri',value:3}]} recent={[{title:'Book issued',detail:'World History assigned to John Doe',date:'Today'},{title:'Fine pending',detail:'Late return charge issued',date:'Yesterday'}]} />
      <div className="page-shell">
        <div className="dashboard-grid">
          <DemoPage title="Book Catalogue" description="Manage the current library collection" storageKey="library-catalogue" seedData={books} columns={[{key:'title',label:'Title'},{key:'author',label:'Author'},{key:'category',label:'Category'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Issue Book" description="Issue books to learners" storageKey="library-issues" seedData={issues} columns={[{key:'student',label:'Student'},{key:'book',label:'Book'},{key:'due',label:'Due'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Return Book" description="Manage returns and stock availability" storageKey="library-returns" seedData={returns} columns={[{key:'student',label:'Student'},{key:'book',label:'Book'},{key:'returned',label:'Returned'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Overdue Books" description="Track late returns and follow-up actions" storageKey="library-overdue" seedData={overdueBooks} columns={[{key:'student',label:'Student'},{key:'book',label:'Book'},{key:'due',label:'Due'},{key:'days',label:'Days overdue'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Fine Management" description="Fine records and follow-up" storageKey="library-fines" seedData={fines} columns={[{key:'student',label:'Student'},{key:'amount',label:'Amount'},{key:'reason',label:'Reason'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
      </div>
    </div>
  );
}
