import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/dashboard'); // redirect after successful auth
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center animate-fade-in">
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', marginTop: '10vh' }}>
        <h1 className="text-center text-gradient" style={{ marginBottom: '2rem' }}>
          Lead Synch
        </h1>
        
        <h2 className="text-center" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>

        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)', color: 'var(--error)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label className="input-label" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center mt-4">
          <button 
            className="btn-secondary" 
            style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.875rem' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
