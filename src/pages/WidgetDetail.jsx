import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function WidgetDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [widget, setWidget] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWidgetData = async () => {
      try {
        const [widgetRes, subsRes] = await Promise.all([
          fetch(`/api/widgets/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`/api/dashboard/widgets/${id}/submissions`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (!widgetRes.ok) throw new Error('Failed to fetch widget');
        
        const widgetJson = await widgetRes.json();
        const subsJson = await subsRes.json();

        setWidget(widgetJson);
        setSubmissions(subsJson.submissions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetData();
  }, [id, token]);

  if (loading) return <div>Loading widget...</div>;
  if (error) return <div style={{ color: 'var(--error)' }}>{error}</div>;
  if (!widget) return null;

  return (
    <div className="animate-fade-in">
      <Link to="/dashboard/widgets" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'inline-block', marginBottom: '1.5rem' }}>
        ← Back to Widgets
      </Link>
      
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>{widget.title}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>ID: {widget.id}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Left Column: Embed Code & Settings */}
        <div className="flex-col gap-4">
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Embed Code</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Copy and paste this snippet anywhere in your website's HTML.
            </p>
            <div style={{ 
              backgroundColor: 'rgba(0,0,0,0.4)', 
              padding: '1rem', 
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: 'var(--accent-primary)',
              wordBreak: 'break-all'
            }}>
              {widget.embed.scriptTag}
            </div>
          </div>
        </div>

        {/* Right Column: Submissions */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Submissions</h3>
          
          {submissions.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No submissions yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <th style={{ padding: '0.75rem 0' }}>Data</th>
                    <th style={{ padding: '0.75rem 0' }}>Location</th>
                    <th style={{ padding: '0.75rem 0' }}>Date</th>
                    <th style={{ padding: '0.75rem 0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(sub => (
                    <tr key={sub.id} style={{ borderBottom: '1px solid var(--border-highlight)' }}>
                      <td style={{ padding: '1rem 0' }}>
                        <pre style={{ margin: 0, fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}>
                          {JSON.stringify(sub.data, null, 2)}
                        </pre>
                      </td>
                      <td style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {sub.geo.city ? `${sub.geo.city}, ` : ''}{sub.geo.country || 'Unknown'}
                      </td>
                      <td style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem 0' }}>
                        {sub.isSpam ? (
                          <span style={{ color: 'var(--error)', fontSize: '0.875rem' }}>Spam</span>
                        ) : (
                          <span style={{ color: 'var(--success)', fontSize: '0.875rem' }}>Valid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
