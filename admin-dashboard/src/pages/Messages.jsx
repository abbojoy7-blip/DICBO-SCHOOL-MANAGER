import DemoPage from '../components/DemoPage';

const messageSeed = [
  { id: 'msg1', from: 'Parent', subject: 'Student transport concerns', unread: true, status: 'Unread' },
  { id: 'msg2', from: 'Office', subject: 'Meeting schedule', unread: false, status: 'Read' }
];

export default function Messages() {
  return (
    <DemoPage
      title="Messages"
      description="Stay on top of parent, staff, and leadership conversations from one inbox view."
      storageKey="messages"
      seedData={messageSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'from', label: 'From' },
        { key: 'subject', label: 'Subject' },
        { key: 'status', label: 'Status', render: (value) => <span className={value === 'Unread' ? 'badge badge-warning' : 'badge badge-success'}>{value}</span> }
      ]}
    />
  );
}
