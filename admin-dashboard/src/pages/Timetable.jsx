import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Timetable() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get('/academic/classes');
        setClasses(res.data.classes || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, []);

  const fetchTimetable = async () => {
    if (!selectedClass) return;
    setLoading(true);
    try {
      const res = await api.get(`/timetable?studentClass=${selectedClass}`);
      setEntries(res.data.entries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTimetable(); }, [selectedClass]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Academic Planning</p>
          <h2>Class Timetable</h2>
        </div>
        <button className="btn btn-primary">Add Time Slot</button>
      </div>

      <div className="panel-card" style={{ marginBottom: 20 }}>
         <label className="eyebrow">Select Class to View Timetable</label>
         <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ width: '100%', maxWidth: 300, padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 5 }}>
            <option value="">-- Choose Class --</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
         </select>
      </div>

      {!selectedClass ? (
        <div className="panel-card" style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
           Select a class above to view the schedule.
        </div>
      ) : loading ? <LoadingState /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {days.map(day => {
            const dayEntries = entries.filter(e => e.day === day);
            return (
              <div key={day} className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 700 }}>{day}</div>
                <div style={{ padding: 15, display: 'grid', gap: 10 }}>
                  {dayEntries.map(e => (
                    <div key={e._id} style={{ padding: 12, background: '#eff6ff', borderRadius: 10, border: '1px solid #dbeafe' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <strong style={{ color: '#1e3a8a' }}>{e.startTime} - {e.endTime}</strong>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{e.subject?.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Teacher: {e.teacher?.name || 'TBA'}</div>
                    </div>
                  ))}
                  {dayEntries.length === 0 && <p style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>No lessons scheduled.</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
