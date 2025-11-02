import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMeStore = create()(
    persist(
        (set) => ({
            userId: null,
            setUserId: (userId) => set({userId}),
            removeUserId: () => set({userId: null})
        }),
        {name: "userMe-storage"}
    )
)