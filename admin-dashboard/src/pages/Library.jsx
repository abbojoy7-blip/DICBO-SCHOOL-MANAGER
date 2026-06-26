import DemoPage from '../components/DemoPage';

const librarySeed = [
  { id: 'lib1', title: 'Introduction to Algebra', author: 'M. Kato', category: 'Mathematics', status: 'Available' },
  { id: 'lib2', title: 'World History', author: 'R. Nsubuga', category: 'History', status: 'Issued' }
];

export default function Library() {
  return (
    <DemoPage
      title="Library catalogue"
      description="Manage books, availability, and circulation in a library-friendly workflow."
      storageKey="library"
      seedData={librarySeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'category', label: 'Category' },
        { key: 'status', label: 'Status', render: (value) => <span className={value === 'Available' ? 'badge badge-success' : 'badge badge-warning'}>{value}</span> }
      ]}
    />
  );
}
