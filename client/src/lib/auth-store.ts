import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/shared/schema';

interface AuthState {
  user: User | null;
  isLoginOpen: boolean;
  isRegisterMode: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleLogin: () => void;
  setLoginOpen: (open: boolean) => void;
  toggleRegisterMode: () => void;
  setRegisterMode: (register: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoginOpen: false,
      isRegisterMode: false,

      login: (user: User) => {
        set({ user, isLoginOpen: false });
      },

      logout: () => {
        set({ user: null });
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
    }),
    {
      name: 'auth-storage',
    }
  )
);
