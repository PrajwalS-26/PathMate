import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // State
  session: null,
  user: null,
  profile: null,
  loading: true,

  // Actions
  setSession: (session) => set({ session }),
  
  setUser: (user) => set({ user }),
  
  setProfile: (profile) => set({ profile }),
  
  setLoading: (loading) => set({ loading }),
  
  logout: () => set({ session: null, user: null, profile: null }),

  // Combined action to set auth state
  setAuthState: (session, user) => set({ session, user, loading: false }),
}));

export default useAuthStore;
