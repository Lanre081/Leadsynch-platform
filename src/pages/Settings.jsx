import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { token } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = () => {
    setLoading(true);
    // Simulate Stripe Checkout Redirect
    setTimeout(() => {
      alert('Simulating Stripe Checkout...\n\nPayment successful! You are now on the PRO tier.');
      setIsPro(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Settings</h1>

      <div className="glass-panel flex-col gap-6" style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Subscription Plan</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Manage your billing and subscription tier.</p>
          
          <div className="flex justify-between items-center" style={{ padding: '1.5rem', border: '1px solid var(--border-highlight)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)' }}>
            <div>
              <h3 style={{ margin: 0, color: isPro ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                {isPro ? 'Pro Tier' : 'Free Tier'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {isPro ? 'You have unlimited widgets.' : 'You are limited to 1 widget.'}
              </p>
            </div>
            
            {!isPro ? (
              <button className="btn btn-primary" onClick={handleUpgrade} disabled={loading}>
                {loading ? 'Redirecting to Stripe...' : 'Upgrade to Pro - $19/mo'}
              </button>
            ) : (
              <button className="btn btn-secondary">Manage Billing via Stripe</button>
            )}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Profile Settings</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Update your account details.</p>
          
          <div className="flex-col gap-4" style={{ maxWidth: '400px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email Address</label>
              <input type="email" value="demo@leadsynch.dev" disabled style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }} />
            </div>
            <button className="btn btn-secondary" style={{ width: 'fit-content' }}>Change Password</button>
          </div>
        </div>

      </div>
    </div>
  );
}
