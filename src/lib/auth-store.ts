import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/shared/schema';
import { apiRequest } from './queryClient';

interface AuthState {
  user: User | null;
  isLoginOpen: boolean;
  isRegisterMode: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleLogin: () => void;
  setLoginOpen: (open: boolean) => void;
  toggleRegisterMode: () => void;
  setRegisterMode: (register: boolean) => void;
  checkAuthStatus: () => Promise<void>;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoginOpen: false,
      isRegisterMode: false,
      isLoading: true,

      login: (user: User) => {
        set({ user, isLoginOpen: false });
      },

      logout: async () => {
        try {
          // Call logout endpoint to clear session on server
          const response = await apiRequest("POST", "/auth/logout", {});
          await response.json();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null });
        }
      },

      toggleLogin: () => {
        set((state) => ({ isLoginOpen: !state.isLoginOpen }));
      },

      setLoginOpen: (open: boolean) => {
        set({ isLoginOpen: open });
      },

      toggleRegisterMode: () => {
        set((state) => ({ isRegisterMode: !state.isRegisterMode }));
      },

      setRegisterMode: (register: boolean) => {
        set({ isRegisterMode: register });
      },

      checkAuthStatus: async () => {
        try {
          set({ isLoading: true });
          const response = await apiRequest("GET", "/auth/me");
          const userData = await response.json();
          set({ user: userData, isLoading: false });
        } catch (error) {
          // If checking auth status fails, ensure user is logged out
          set({ user: null, isLoading: false });
        }
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist the user, not UI state
    }
  )
);