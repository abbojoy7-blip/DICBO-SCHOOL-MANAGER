import DemoPage from '../components/DemoPage';

const attendanceSeed = [
  { id: 'att1', student: 'John Doe', class: 'P5 Blue', status: 'Present', date: '2026-06-26' },
  { id: 'att2', student: 'Sarah Namukasa', class: 'P6 Green', status: 'Late', date: '2026-06-26' },
  { id: 'att3', student: 'Brian Okello', class: 'P7 Red', status: 'Absent', date: '2026-06-26' }
];

export default function Attendance() {
  return (
    <DemoPage
      title="Attendance register"
      description="Track daily attendance, late arrivals, and absences with a classroom-ready snapshot."
      storageKey="attendance"
      seedData={attendanceSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'student', label: 'Student' },
        { key: 'class', label: 'Class' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status', render: (value) => <span className={value === 'Present' ? 'badge badge-success' : value === 'Late' ? 'badge badge-warning' : 'badge badge-info'}>{value}</span> }
      ]}
    />
  );
}
