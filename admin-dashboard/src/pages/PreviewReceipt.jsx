import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PreviewReceipt() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = searchParams.get('student') || 's1';
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    setStudent(students.find((item) => item.id === studentId) || students[0]);
  }, [studentId]);

  const receipt = useMemo(() => ({
    number: 'RCPT-2026-1048',
    date: '26 June 2026',
    amount: 'UGX 200,000',
    method: 'Bank transfer'
  }), []);

  if (!student) return null;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Fee receipt preview</p>
          <h2>Official Receipt • {student.name}</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
          <button className="btn btn-primary" onClick={() => window.print()}>Print receipt</button>
        </div>
      </div>

      <div className="print-card">
        <div className="print-card__header">
          <div>
            <h3>DICBO School Manager</h3>
            <p>Fee Office • Term 3 Payment Confirmation</p>
          </div>
          <div className="print-card__badge">PAID</div>
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

          <div className="receipt-grid">
            <div><span>Receipt No.</span><strong>{receipt.number}</strong></div>
            <div><span>Date</span><strong>{receipt.date}</strong></div>
            <div><span>Amount</span><strong>{receipt.amount}</strong></div>
            <div><span>Method</span><strong>{receipt.method}</strong></div>
          </div>
          <div className="receipt-summary">
            <p>Thank you for your payment. This receipt confirms the successful settlement of tuition and activity fees for the current term.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
