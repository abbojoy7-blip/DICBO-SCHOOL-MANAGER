import DemoPage from '../components/DemoPage';

const parentSeed = [
  { id: 'p1', name: 'Martha Parent', child: 'John Doe', relationship: 'Mother', phone: '+256778000200', status: 'Active' },
  { id: 'p2', name: 'Joseph Nsubuga', child: 'Sarah Namukasa', relationship: 'Father', phone: '+256778000201', status: 'Active' }
];

export default function Parents() {
  return (
    <DemoPage
      title="Parent contacts"
      description="Keep a polished view of parent relationships, linked learners, and follow-up status."
      storageKey="parents"
      seedData={parentSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'name', label: 'Parent' },
        { key: 'child', label: 'Child' },
        { key: 'relationship', label: 'Relationship' },
        { key: 'phone', label: 'Phone' },
        { key: 'status', label: 'Status' }
      ]}
    />
  );
}
