
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { type User } from "shared/schema";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  actions: {
    setUser: (user: User | null) => void;
    openLogin: () => void;
    closeLogin: () => void;
    openRegister: () => void;
    closeRegister: () => void;
  };
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoginOpen: false,
  isRegisterOpen: false,
  actions: {
    setUser: (user) => set({ user }),
    openLogin: () => set({ isLoginOpen: true }),
    closeLogin: () => set({ isLoginOpen: false }),
    openRegister: () => set({ isRegisterOpen: true }),
    closeRegister: () => set({ isRegisterOpen: false }),
  },
}));

export const useAuthUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/auth/me");
      return response.json();
    },
  });

  const setUser = useAuthStore((state) => state.actions.setUser);
  setUser(data);

  return { user: data, isLoading, isError };
};

export const useAuthActions = () => useAuthStore((state) => state.actions);

export const useIsLoginOpen = () => useAuthStore((state) => state.isLoginOpen);

export const useIsRegisterOpen = () =>
  useAuthStore((state) => state.isRegisterOpen);
