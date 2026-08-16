import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';
import useAuthStore from '../store/useAuthStore';

function Login() {
  const navigate = useNavigate();
  const { setAuthState, logout } = useAuthStore();
  const [checkingProfile, setCheckingProfile] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setCheckingProfile(true);
          setAuthState(session, session.user);
          
          // Check if user has a profile
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error || !profile) {
              // No profile found, redirect to onboarding
              navigate('/onboarding');
            } else {
              // Profile exists, redirect to dashboard
              navigate('/dashboard');
            }
          } catch (err) {
            console.error('Error checking profile:', err);
            navigate('/onboarding');
          } finally {
            setCheckingProfile(false);
          }
        } else if (event === 'SIGNED_OUT') {
          logout();
          navigate('/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, setAuthState, logout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to PathMate</h1>
          <p className="text-gray-600 mt-2">Your personalized learning companion</p>
        </div>
        
        {checkingProfile ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">Checking your profile...</span>
          </div>
        ) : (
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4F46E5',
                    brandAccent: '#4338CA',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/`}
          />
        )}
        
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Login;
