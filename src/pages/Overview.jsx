import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Overview() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch('/api/dashboard/overview', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [token]);

  if (loading) return <div className="animate-fade-in">Loading overview...</div>;
  if (error) return <div style={{ color: 'var(--error)' }}>{error}</div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Overview</h1>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Submissions</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{data.totals.totalSubmissions}</div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Spam Blocked</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>{data.totals.spamBlocked}</div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Active Widgets</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{data.perWidget.length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Geo Breakdown */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Top Countries</h2>
          {data.geoBreakdown.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No data yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.geoBreakdown.map((geo, i) => (
                <div key={i} className="flex justify-between items-center" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontWeight: 500 }}>{geo.country}</span>
                  <span style={{ color: 'var(--accent-primary)' }}>{geo.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Widgets Overview */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Recent Widgets</h2>
            <Link to="/dashboard/widgets" style={{ fontSize: '0.875rem' }}>View All →</Link>
          </div>
          {data.perWidget.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No widgets created yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.perWidget.slice(0, 5).map(widget => (
                <div key={widget.widgetId} className="flex justify-between items-center" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontWeight: 500 }}>{widget.title}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{widget.submissions} submissions</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
