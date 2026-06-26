import DemoPage from '../components/DemoPage';

const staffSeed = [
  { id: 'st1', name: 'Alice Muwonge', role: 'Principal', email: 'alice@dicbo.edu', phone: '+256778000111', status: 'Active' },
  { id: 'st2', name: 'Daniel Ssekandi', role: 'Head of Academics', email: 'daniel@dicbo.edu', phone: '+256778000112', status: 'Active' },
  { id: 'st3', name: 'Miriam Kakande', role: 'Bursar', email: 'miriam@dicbo.edu', phone: '+256778000113', status: 'On Leave' },
  { id: 'st4', name: 'Grace Nalubowa', role: 'Science Teacher', email: 'grace@dicbo.edu', phone: '+256778000114', status: 'Active' }
];

export default function Staff() {
  return (
    <DemoPage
      title="Staff directory"
      description="Manage staff profiles, contact details, and leave status from one polished HR workspace."
      storageKey="staff"
      seedData={staffSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'status', label: 'Status', render: (value) => <span className={value === 'Active' ? 'badge badge-success' : 'badge badge-warning'}>{value}</span> }
      ]}
    />
  );
}
