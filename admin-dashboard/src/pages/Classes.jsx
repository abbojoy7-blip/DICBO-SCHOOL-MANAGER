import DemoPage from '../components/DemoPage';

const classSeed = [
  { id: 'cls1', name: 'P5 Blue', stream: 'Science', teacher: 'Alice Muwonge', capacity: '38' },
  { id: 'cls2', name: 'P6 Green', stream: 'Arts', teacher: 'Daniel Ssekandi', capacity: '34' },
  { id: 'cls3', name: 'S1 Yellow', stream: 'Computer', teacher: 'Miriam Kakande', capacity: '40' }
];

export default function Classes() {
  return (
    <DemoPage
      title="Classes & streams"
      description="Plan cohorts, stream placements, and teacher allocations in a polished admissions view."
      storageKey="classes"
      seedData={classSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'name', label: 'Class' },
        { key: 'stream', label: 'Stream' },
        { key: 'teacher', label: 'Teacher' },
        { key: 'capacity', label: 'Capacity' }
      ]}
    />
  );
}
