import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function ProtectedRoute({ children }) {
  const { session, loading } = useAuthStore();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return children;
}

export default ProtectedRoute;
