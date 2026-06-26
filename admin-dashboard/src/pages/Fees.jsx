import DemoPage from '../components/DemoPage';

const feeSeed = [
  { id: 'fee1', student: 'John Doe', amount: 'UGX 200,000', receipt: 'RCPT-1001', date: '2026-06-01', status: 'Paid' },
  { id: 'fee2', student: 'Sarah Namukasa', amount: 'UGX 200,000', receipt: 'RCPT-1002', date: '2026-06-02', status: 'Partial' },
  { id: 'fee3', student: 'Brian Okello', amount: 'UGX 180,000', receipt: 'RCPT-1003', date: '2026-06-03', status: 'Unpaid' }
];

export default function Fees() {
  return (
    <DemoPage
      title="Fee operations"
      description="Monitor fee collections, balances, and receipts for every student account."
      storageKey="fees"
      seedData={feeSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'student', label: 'Student' },
        { key: 'amount', label: 'Amount' },
        { key: 'receipt', label: 'Receipt' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status', render: (value) => <span className={value === 'Paid' ? 'badge badge-success' : value === 'Partial' ? 'badge badge-warning' : 'badge badge-info'}>{value}</span> }
      ]}
    />
  );
}
