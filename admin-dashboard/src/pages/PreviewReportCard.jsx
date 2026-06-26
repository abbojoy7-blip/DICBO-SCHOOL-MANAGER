import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PreviewReportCard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = searchParams.get('student') || 's1';
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    setStudent(students.find((item) => item.id === studentId) || students[0]);
  }, [studentId]);

  const summary = useMemo(() => ({
    term: 'Term 3',
    average: 86,
    rank: 2,
    attendance: '96%'
  }), []);

  if (!student) return null;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Academic report preview</p>
          <h2>Report Card • {student.name}</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
          <button className="btn btn-primary" onClick={() => window.print()}>Print report card</button>
        </div>
      </div>

      <div className="print-card">
        <div className="print-card__header">
          <div>
            <h3>DICBO School Manager</h3>
            <p>St. Agnes Campus • Kampala, Uganda</p>
          </div>
          <div className="print-card__badge">Term 3 • 2026</div>
        </div>

        <div className="print-card__body">
          <div className="profile-card compact">
            <div className="avatar avatar-large">{student.name.split(' ').map((piece) => piece[0]).slice(0, 2).join('')}</div>
            <div>
              <h4>{student.name}</h4>
              <p>Admission: {student.admissionNumber}</p>
              <p>Class: {student.class}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="panel-card"><strong>{summary.average}%</strong><span>Average score</span></div>
            <div className="panel-card"><strong>#{summary.rank}</strong><span>Class rank</span></div>
            <div className="panel-card"><strong>{summary.attendance}</strong><span>Attendance</span></div>
          </div>

          <table className="table">
            <thead>
              <tr><th>Subject</th><th>Score</th><th>Grade</th><th>Comment</th></tr>
            </thead>
            <tbody>
              <tr><td>English</td><td>86</td><td>A</td><td>Excellent written communication.</td></tr>
              <tr><td>Mathematics</td><td>91</td><td>A</td><td>Strong analytical thinking.</td></tr>
              <tr><td>Science</td><td>84</td><td>B+</td><td>Confident practical work.</td></tr>
              <tr><td>Social Studies</td><td>80</td><td>B+</td><td>Steady improvement.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
