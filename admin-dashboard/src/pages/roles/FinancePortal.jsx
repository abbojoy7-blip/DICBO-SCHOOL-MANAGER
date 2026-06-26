import RolePortalDashboard from '../../components/RolePortalDashboard';
import DemoPage from '../../components/DemoPage';

const accounts = [
  { id: 'fa1', student: 'John Doe', balance: 'UGX 200,000', status: 'Pending' },
  { id: 'fa2', student: 'Sarah Namukasa', balance: 'UGX 150,000', status: 'Partial' }
];

const payments = [
  { id: 'fp1', student: 'John Doe', amount: 'UGX 200,000', date: '2026-06-01', method: 'Mobile money', status: 'Captured' }
];

const receipts = [
  { id: 'fr1', student: 'John Doe', receipt: 'RCPT-1001', amount: 'UGX 200,000', status: 'Issued' }
];

const balances = [
  { id: 'fb1', student: 'Brian Okello', balance: 'UGX 180,000', status: 'Outstanding' }
];

const reports = [
  { id: 'rep1', name: 'Monthly cash flow', generated: '2026-06-26', status: 'Ready' }
];

export default function FinancePortal(){
  return (
    <div>
      <RolePortalDashboard title="Finance Portal" subtitle="Track fee accounts, payments, receipts, and outstanding balances with a finance-ready demo workspace." badge="● Finance workspace • Demo mode" stats={[{label:'Accounts',value:'24',delta:'4 new'},{label:'Collected',value:'UGX 3.2M',delta:'+12%'},{label:'Outstanding',value:'UGX 1.1M',delta:'2 urgent'},{label:'Receipts',value:'18',delta:'Today'}]} chartData={[{name:'Jan',value:1.2},{name:'Feb',value:1.4},{name:'Mar',value:1.6},{name:'Apr',value:1.8},{name:'May',value:2.1},{name:'Jun',value:2.4}]} recent={[{title:'Payment captured',detail:'John Doe payment recorded',date:'Today'},{title:'Receipt issued',detail:'RCPT-1001 printed and saved',date:'Yesterday'}]} />
      <div className="page-shell">
        <div className="dashboard-grid">
          <DemoPage title="Student Accounts" description="Fee account summaries" storageKey="finance-accounts" seedData={accounts} columns={[{key:'student',label:'Student'},{key:'balance',label:'Balance'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Record Payment" description="Capture new payments" storageKey="finance-payments" seedData={payments} columns={[{key:'student',label:'Student'},{key:'amount',label:'Amount'},{key:'date',label:'Date'},{key:'method',label:'Method'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Generate Receipt" description="Issue receipts for captured payments" storageKey="finance-receipts" seedData={receipts} columns={[{key:'student',label:'Student'},{key:'receipt',label:'Receipt'},{key:'amount',label:'Amount'},{key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Outstanding Balances" description="Follow up on unpaid accounts" storageKey="finance-balances" seedData={balances} columns={[{key:'student',label:'Student'},{key:'balance',label:'Balance'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Financial Reports" description="Cash flow and ledger reports" storageKey="finance-reports" seedData={reports} columns={[{key:'name',label:'Report'},{key:'generated',label:'Generated'},{key:'status',label:'Status'}]} actions={['edit']} />
        </div>
      </div>
    </div>
  );
}
