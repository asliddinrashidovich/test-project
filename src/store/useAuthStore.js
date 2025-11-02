import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),

      removeAccessToken: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);