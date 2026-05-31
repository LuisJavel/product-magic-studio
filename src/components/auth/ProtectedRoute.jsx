export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/?auth=login';
    return null;
  }

  return children;
}

import { useAuth } from '../../contexts/AuthContext';