import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function FormBuilderDashboard() {
  const { token } = useAuth();
  const [widgets, setWidgets] = useState([]);
  const [activeWidget, setActiveWidget] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedScript, setEmbedScript] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Fetch initial data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/widgets', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      
      if (json.widgets.length > 0) {
        setWidgets(json.widgets);
        
        // If we don't have an active widget, or the active widget was deleted, pick the first one
        const newActive = activeWidget ? (json.widgets.find(w => w.id === activeWidget.id) || json.widgets[0]) : json.widgets[0];
        setActiveWidget(newActive);
        
        // Fetch leads for the selected widget
        fetchLeads(newActive.id);
      } else {
        setWidgets([]);
        setActiveWidget(null);
        setLeads([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async (widgetId) => {
    try {
      const subsRes = await fetch(`/api/dashboard/widgets/${widgetId}/submissions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const subsJson = await subsRes.json();
      setLeads(subsJson.submissions || []);
    } catch (err) {
      console.error('Failed to fetch leads', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Handle widget switching
  const handleWidgetChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId === 'NEW') {
      handleCreateWidget();
      return;
    }
    const selected = widgets.find(w => w.id === selectedId);
    if (selected) {
      setActiveWidget(selected);
      fetchLeads(selected.id);
    }
  };

  // Create a new widget
  const handleCreateWidget = async () => {
    // Phase 2 placeholder: Enforce 1-widget limit for free tier
    if (widgets.length >= 1) {
      const upgrade = window.confirm("Free tier is limited to 1 widget. Upgrade to Pro to create unlimited widgets! (Click OK to simulate upgrade)");
      if (!upgrade) return;
      // If upgraded, proceed
    }

    try {
      setIsCreating(true);
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'New Lead Form',
          type: 'signup_form',
          fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Work Email', type: 'email', required: true },
            { name: 'company', label: 'Company', type: 'text', required: false }
          ],
          buttonText: 'Get Demo',
          description: 'Get a Free Demo to see customized lead capture widget for that.'
        })
      });
      
      if (!res.ok) throw new Error('Failed to create widget');
      
      const newWidget = await res.json();
      await fetchDashboardData();
      setActiveWidget(newWidget); // set it as active
    } catch (err) {
      alert(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Save changes to existing widget
  const handleSaveWidget = async () => {
    if (!activeWidget) return;
    try {
      setIsSaving(true);
      const res = await fetch(`/api/widgets/${activeWidget.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: activeWidget.title,
          buttonText: activeWidget.buttonText,
          description: activeWidget.description
        })
      });
      
      if (!res.ok) throw new Error('Failed to update widget');
      
      // Update local state to reflect saved changes
      const updated = await res.json();
      setWidgets(widgets.map(w => w.id === updated.id ? updated : w));
      alert('Widget saved successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Get Embed Script
  const handleGetEmbed = () => {
    if (!activeWidget || !activeWidget.embed) {
      alert('Embed code is not available for this widget yet.');
      return;
    }
    setEmbedScript(activeWidget.embed.scriptTag);
    setShowEmbedModal(true);
  };

  // Update active widget state locally
  const updateActiveWidget = (field, value) => {
    setActiveWidget(prev => ({ ...prev, [field]: value }));
  };

  if (loading && widgets.length === 0) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="flex gap-6" style={{ height: 'calc(100vh - 120px)' }}>
      
      {/* LEFT PANE: Form Builder & Preview */}
      <div className="flex-col" style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        
        {/* Pane Header */}
        <div className="flex justify-between items-center" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-4">
            <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Form Builder</h2>
            {widgets.length > 0 && (
              <select 
                value={activeWidget?.id || ''} 
                onChange={handleWidgetChange}
                style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                {widgets.map(w => (
                  <option key={w.id} value={w.id}>{w.title}</option>
                ))}
                <option value="NEW">+ Create New Widget...</option>
              </select>
            )}
          </div>
          
          <div className="flex gap-2">
            <button className="btn btn-secondary" onClick={handleGetEmbed} disabled={!activeWidget} style={{ padding: '0.35rem 0.75rem', fontSize: '0.875rem' }}>
              &lt;/&gt; Embed
            </button>
            <button className="btn btn-primary" onClick={handleSaveWidget} disabled={!activeWidget || isSaving} style={{ padding: '0.35rem 0.75rem', fontSize: '0.875rem' }}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Empty State */}
        {!activeWidget && (
          <div className="flex items-center justify-center" style={{ flex: 1 }}>
             <div style={{ textAlign: 'center' }}>
               <h3 style={{ marginBottom: '1rem' }}>No widgets found</h3>
               <button className="btn btn-primary" onClick={handleCreateWidget} disabled={isCreating}>
                 {isCreating ? 'Creating...' : '+ Create Widget'}
               </button>
             </div>
          </div>
        )}

        {/* Builder Content */}
        {activeWidget && (
          <>
            {/* Tab Bar */}
            <div className="flex gap-6" style={{ padding: '0 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ padding: '0.75rem 0', color: 'var(--accent-primary)', borderBottom: '2px solid var(--accent-primary)', fontWeight: 600, fontSize: '0.875rem' }}>Form Fields</div>
              <div style={{ padding: '0.75rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Styling (Coming Soon)</div>
            </div>

            <div className="flex" style={{ flex: 1, overflow: 'hidden' }}>
              {/* Inner Sidebar: Field Editor */}
              <div style={{ width: '280px', borderRight: '1px solid var(--border-color)', padding: '1.5rem', backgroundColor: '#fff', overflowY: 'auto' }}>
                <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Edit Content</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Form Title</label>
                  <input 
                    type="text" 
                    value={activeWidget.title} 
                    onChange={(e) => updateActiveWidget('title', e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} 
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Description</label>
                  <textarea 
                    value={activeWidget.description || ''} 
                    onChange={(e) => updateActiveWidget('description', e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', resize: 'none' }} 
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Button Text</label>
                  <input 
                    type="text" 
                    value={activeWidget.buttonText || 'Submit'} 
                    onChange={(e) => updateActiveWidget('buttonText', e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} 
                  />
                </div>
              </div>

              {/* Preview Canvas */}
              <div className="flex items-center justify-center" style={{ flex: 1, backgroundColor: 'var(--bg-primary)', padding: '2rem', overflowY: 'auto' }}>
                <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#0f172a', borderRadius: '12px', padding: '2rem', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', borderTop: '4px solid var(--accent-primary)' }}>
                  <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '0.5rem' }}>{activeWidget.title || 'Get a Free Demo!'}</h2>
                  <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{activeWidget.description}</p>
                  
                  <div className="flex-col gap-4">
                    {activeWidget.fields?.map((field, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#cbd5e1' }}>{field.label}</label>
                        <input type="text" placeholder={`Input: ${field.name}`} style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} />
                      </div>
                    ))}
                    <button onClick={() => alert("This is just a visual preview! To submit a real lead, grab the Embed code and test it on your website.")} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, marginTop: '0.5rem', cursor: 'pointer' }}>
                      {activeWidget.buttonText || 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>


      {/* RIGHT PANE: Incoming Lead Records */}
      <div className="flex-col" style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', overflow: 'hidden' }}>
        
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Incoming Lead Records</h2>
          <div className="flex gap-2">
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Search (Leads)" style={{ padding: '0.35rem 0.75rem 0.35rem 2rem', border: '1px solid var(--border-highlight)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }} />
              <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.875rem' }}>
              Export CSV
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Lead Records <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>({leads.length} Leads)</span></span>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.5rem' }}>Contact Name</th>
                <th style={{ padding: '0.5rem' }}>Company</th>
                <th style={{ padding: '0.5rem' }}>Email</th>
                <th style={{ padding: '0.5rem' }}>API Key Origin</th>
                <th style={{ padding: '0.5rem' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No leads found for this widget.</td></tr>
              ) : leads.map((lead, i) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{lead.data.name || lead.data.fullName || `Lead #${i+1}`}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{lead.data.company || '-'}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{lead.data.email || '-'}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-secondary)' }}>{activeWidget?.title || 'Unknown'}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-secondary)' }}>{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '600px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Widget Embed Code</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Copy and paste this snippet into your website's HTML body where you want the widget to appear.
            </p>
            <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '6px', color: '#a78bfa', fontFamily: 'monospace', wordBreak: 'break-all', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {embedScript}
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn btn-secondary" onClick={() => setShowEmbedModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => navigator.clipboard.writeText(embedScript).then(() => alert('Copied!'))}>
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
