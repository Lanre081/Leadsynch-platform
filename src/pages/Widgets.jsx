import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Widgets() {
  const { token } = useAuth();
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWidgetTitle, setNewWidgetTitle] = useState('');

  const fetchWidgets = async () => {
    try {
      const res = await fetch('/api/widgets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch widgets');
      const json = await res.json();
      setWidgets(json.widgets);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newWidgetTitle,
          type: 'signup_form',
          fields: [{ name: 'email', label: 'Email Address', type: 'email', required: true }]
        })
      });
      
      if (!res.ok) throw new Error('Failed to create widget');
      
      setNewWidgetTitle('');
      setIsCreating(false);
      fetchWidgets(); // reload
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading widgets...</div>;
  if (error) return <div style={{ color: 'var(--error)' }}>{error}</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1>Widgets</h1>
        <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
          + Create Widget
        </button>
      </div>

      {isCreating && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3>Create New Widget</h3>
          <form onSubmit={handleCreate} className="flex gap-4 mt-4 items-center">
            <input 
              type="text" 
              className="input-field" 
              placeholder="Widget Title (e.g. Newsletter Signup)" 
              value={newWidgetTitle}
              onChange={(e) => setNewWidgetTitle(e.target.value)}
              required
              autoFocus
              style={{ margin: 0, flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreating(false)}>Cancel</button>
          </form>
        </div>
      )}

      {widgets.length === 0 && !isCreating ? (
        <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>You don't have any widgets yet.</h3>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Create one to start capturing leads.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {widgets.map(widget => (
            <Link key={widget.id} to={`/dashboard/widgets/${widget.id}`} className="glass-panel" style={{ padding: '1.5rem', display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>{widget.title}</h3>
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-glass-hover)', borderRadius: 'var(--radius-sm)' }}>
                  {widget.type}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                ID: {widget.id.slice(0, 8)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
