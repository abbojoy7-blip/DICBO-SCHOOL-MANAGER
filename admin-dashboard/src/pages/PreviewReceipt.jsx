import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function PreviewReceipt() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = searchParams.get('student');
  const [student, setStudent] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, settingsRes] = await Promise.all([
          api.get(`/students/${studentId}`),
          api.get('/settings')
        ]);
        setStudent(studentRes.data.student);
        setSettings(settingsRes.data.settings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchData();
  }, [studentId]);

  if (loading) return <LoadingState />;
  if (!student) return <div className="page-shell">Student not found</div>;

  return (
    <div className="page-shell">
      <div className="page-header no-print">
        <div>
          <p className="eyebrow">Fee receipt preview</p>
          <h2>Official Receipt • {student.firstName} {student.lastName}</h2>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
          <button className="btn btn-primary" onClick={() => window.print()}>Print receipt</button>
        </div>
      </div>

      <div className="print-card" style={{ maxWidth: '800px', margin: '20px auto' }}>
        <div className="print-card__header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0 }}>{settings?.name || 'DICBO School Manager'}</h2>
            <p style={{ margin: '5px 0' }}>{settings?.address || 'School Address'}</p>
            <p style={{ margin: 0 }}>Tel: {settings?.phone || 'Contact Number'}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', border: '3px solid #10b981', padding: '5px 15px', borderRadius: '8px' }}>PAID</div>
          </div>
        </div>

        <div className="print-card__body" style={{ marginTop: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <p className="eyebrow">STUDENT DETAILS</p>
              <h4 style={{ margin: '5px 0' }}>{student.firstName} {student.lastName}</h4>
              <p style={{ margin: '2px 0' }}>Admission: {student.admissionNumber}</p>
              <p style={{ margin: '2px 0' }}>Class: {student.studentClass?.name}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="eyebrow">RECEIPT INFO</p>
              <p style={{ margin: '5px 0' }}><strong>No:</strong> RCPT-2026-LIVE</p>
              <p style={{ margin: '2px 0' }}><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <table className="table" style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Description</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tuition and Academic Fees - Term 3</td>
                <td style={{ textAlign: 'right' }}>UGX 200,000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>TOTAL PAID</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }}>UGX 200,000</td>
              </tr>
            </tfoot>
          </table>

          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ borderTop: '1px solid #000', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              <p style={{ fontSize: '12px' }}>Accounts Office</p>
            </div>
            <div style={{ borderTop: '1px solid #000', width: '200px', textAlign: 'center', paddingTop: '5px' }}>
              <p style={{ fontSize: '12px' }}>School Stamp</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-shell { padding: 0 !important; }
          .print-card { box-shadow: none !important; border: none !important; margin: 0 !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
