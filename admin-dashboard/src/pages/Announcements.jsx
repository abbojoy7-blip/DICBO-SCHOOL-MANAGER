import DemoPage from '../components/DemoPage';

const announcementSeed = [
  { id: 'ann1', title: 'School reopening', body: 'The school reopens on 15th July.', type: 'info' },
  { id: 'ann2', title: 'Fee reminder', body: 'Term 3 fees are due on 30th June.', type: 'warning' }
];

export default function Announcements() {
  return (
    <DemoPage
      title="Announcements"
      description="Share updates with staff, parents, and learners using polished school-wide communications."
      storageKey="announcements"
      seedData={announcementSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'body', label: 'Body' },
        { key: 'type', label: 'Type' }
      ]}
    />
  );
}
