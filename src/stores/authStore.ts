import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const isDummy = true;

const dummyUser = {
  id: 'dummyUser',
  email: 'dummy@example.com'
};

interface AuthState {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: isDummy ? dummyUser : null,
  loading: false,
  signIn: async (email, password) => {
    if (isDummy) {
      set({ user: dummyUser });
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
    }
  },
  signUp: async (email, password) => {
    if (isDummy) {
      set({ user: dummyUser });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
    }
  },
  signOut: async () => {
    if (isDummy) {
      set({ user: null });
    } else {
      await supabase.auth.signOut();
      set({ user: null });
    }
  },
}));