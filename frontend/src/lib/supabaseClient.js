import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// Replace these values with your actual Supabase project credentials
// You can find them in your Supabase project settings under "API"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://<your-project-ref>.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '<your-anon-key>';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Export helper functions for common operations
export const signUp = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export default supabase;
