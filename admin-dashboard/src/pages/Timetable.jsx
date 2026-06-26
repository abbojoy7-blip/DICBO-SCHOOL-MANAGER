import DemoPage from '../components/DemoPage';

const timetableSeed = [
  { id: 'tt1', day: 'Monday', slot: '08:00', subject: 'Mathematics', teacher: 'Daniel Ssekandi' },
  { id: 'tt2', day: 'Monday', slot: '09:00', subject: 'Science', teacher: 'Alice Muwonge' },
  { id: 'tt3', day: 'Tuesday', slot: '08:00', subject: 'English', teacher: 'Miriam Kakande' }
];

export default function Timetable() {
  return (
    <DemoPage
      title="Weekly timetable"
      description="Publish class schedules, lesson slots, and teacher assignments with a professional planner view."
      storageKey="timetable"
      seedData={timetableSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'day', label: 'Day' },
        { key: 'slot', label: 'Slot' },
        { key: 'subject', label: 'Subject' },
        { key: 'teacher', label: 'Teacher' }
      ]}
    />
  );
}
