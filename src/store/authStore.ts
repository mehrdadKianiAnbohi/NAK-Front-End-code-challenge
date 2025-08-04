import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect } from "react";
import apiClient from "@/config/axios";
import { User } from "@/types";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoggedIn: false,
      login: async (token: string) => {
        set({ token, isLoggedIn: true });
        await get().fetchUser();
      },
      logout: () => {
        set({ token: null, user: null, isLoggedIn: false });
      },
      fetchUser: async () => {
        try {
          const response = await apiClient.get("/auth/me");
          if (response.data) {
            set({ user: response.data });
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useInitializeAuth = () => {
  const { token, isLoggedIn, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      if (token && !isLoggedIn) {
        useAuthStore.setState({ isLoggedIn: true });
        await fetchUser();
      } else if (!token) {
        logout();
      }
    };
    initialize();
  }, [token, isLoggedIn, fetchUser, logout]);
};
