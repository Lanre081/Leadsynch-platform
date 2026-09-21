import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  
  const navItemStyle = (path) => ({
    padding: '0.5rem 0',
    color: isActive(path) ? 'var(--text-primary)' : 'var(--text-secondary)',
    fontWeight: isActive(path) ? 600 : 500,
    borderBottom: isActive(path) ? '2px solid var(--accent-primary)' : '2px solid transparent',
    transition: 'all var(--transition-fast)'
  });

  return (
    <div className="flex-col" style={{ minHeight: '100vh' }}>
      {/* Top Navigation */}
      <header style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderBottom: '1px solid var(--border-color)', 
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--accent-primary)', borderRadius: '4px', transform: 'rotate(45deg)' }}></div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Lead Synch</span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '1.5rem', height: '70px', alignItems: 'center', paddingTop: '2px' }}>
            <Link to="/dashboard" style={navItemStyle('/dashboard')}>Dashboard</Link>
            <Link to="/dashboard/forms" style={navItemStyle('/dashboard/forms')}>Forms</Link>
            <Link to="/dashboard/leads" style={navItemStyle('/dashboard/leads')}>Leads</Link>
            <Link to="/dashboard/integrations" style={navItemStyle('/dashboard/integrations')}>Integrations</Link>
            <Link to="/dashboard/settings" style={navItemStyle('/dashboard/settings')}>Settings</Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            {/* Bell Icon Placeholder */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout} title="Click to log out">
            <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--border-highlight)', borderRadius: '50%', overflow: 'hidden' }}>
              <img src="https://ui-avatars.com/api/?name=Demo+User&background=cbd5e1" alt="Avatar" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="flex-col" style={{ lineHeight: '1.2' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Demo User</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin</span>
            </div>
            <svg width="16" height="16" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
        <Outlet />
      </main>
    </div>
  );
}
