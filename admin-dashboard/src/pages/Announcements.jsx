import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingState from '../components/ui/LoadingState';

export default function Announcements() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await api.get('/announcements');
      setNews(res.data.announcements || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState message="Accessing announcements..." />;

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Communication</p>
          <h2>General Announcements</h2>
        </div>
        <button className="btn btn-primary">Post New Announcement</button>
      </div>

      <div style={{ display: 'grid', gap: 15 }}>
        {news.map(item => (
          <div key={item._id} className="panel-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{item.title}</h3>
              <span className="badge badge-info">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{ marginTop: 15, lineHeight: 1.6, color: '#475569' }}>{item.content}</p>
            <div style={{ marginTop: 20, paddingTop: 15, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Target: <strong>{item.targetAudience}</strong></span>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 13 }}>Edit</button>
                <button className="btn btn-warning" style={{ padding: '6px 12px', fontSize: 13 }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div className="panel-card" style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
             <div style={{ fontSize: 40, marginBottom: 15 }}>📢</div>
             <strong>No announcements posted.</strong>
          </div>
        )}
      </div>
    </div>
  );
}
