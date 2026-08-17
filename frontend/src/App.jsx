import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import useAuthStore from './store/useAuthStore';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

function App() {
  const { setAuthState, logout, setLoading } = useAuthStore();

  useEffect(() => {
    // Set initial loading state
    setLoading(true);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthState(session, session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setAuthState(session, session.user);
        } else if (event === 'SIGNED_OUT') {
          logout();
          setLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setAuthState(session, session.user);
        } else if (event === 'USER_UPDATED' && session) {
          setAuthState(session, session.user);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuthState, logout, setLoading]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public route - redirect to login if not authenticated */}
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />
          
          {/* Login page */}
          <Route 
            path="/login" 
            element={<Login />} 
          />
          
          {/* Onboarding - protected route */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } 
          />
          
          {/* Dashboard - protected route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
