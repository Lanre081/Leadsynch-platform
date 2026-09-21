import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have a token, we could optionally verify it here, 
    // but for now we'll just rely on the API returning 401 if it's invalid.
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error(`API error (${res.status}). Is the backend server running on port 4000?`);
    }

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const signup = async (email, password) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error(`API error (${res.status}). Is the backend server running on port 4000?`);
    }

    if (!res.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    setToken(data.token);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
