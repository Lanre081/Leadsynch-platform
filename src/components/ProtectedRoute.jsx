import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="container flex items-center justify-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
