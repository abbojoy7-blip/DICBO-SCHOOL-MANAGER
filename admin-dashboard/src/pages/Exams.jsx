import DemoPage from '../components/DemoPage';

const examSeed = [
  { id: 'exam1', student: 'John Doe', subject: 'Mathematics', score: '88', grade: 'A' },
  { id: 'exam2', student: 'Sarah Namukasa', subject: 'English', score: '76', grade: 'B' },
  { id: 'exam3', student: 'Brian Okello', subject: 'Science', score: '92', grade: 'A' }
];

export default function Exams() {
  return (
    <DemoPage
      title="Assessment results"
      description="Review exam scores, grades, and performance summaries without leaving the demo workspace."
      storageKey="exams"
      seedData={examSeed}
      actions={['edit', 'delete']}
      columns={[
        { key: 'student', label: 'Student' },
        { key: 'subject', label: 'Subject' },
        { key: 'score', label: 'Score' },
        { key: 'grade', label: 'Grade' }
      ]}
    />
  );
}
