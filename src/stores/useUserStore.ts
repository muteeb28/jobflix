import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import api from "@/lib/axios"; // Utilizing your shared Axios configuration instance
import { toast } from "sonner";

/* ==========================================================================
   1. Types Configuration (Aligned with structural payload expectations)
   ========================================================================== */
interface User {
  id: string;
  username: string;
  email: string;
  // Add other shared profile attributes here as your UI grows
}

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/* ==========================================================================
   2. Shared Development/Production Cookie Configuration
   ========================================================================== */
const COOKIE_CONFIG = {
  domain: process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? "localhost" : ".jobflix.in", 
  expires: 30,
  secure: true,          
  sameSite: "Lax" as const,
};

const crossSubdomainCookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, COOKIE_CONFIG);
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { domain: COOKIE_CONFIG.domain });
  },
};

/* ==========================================================================
   3. Persisted Store Implementation
   ========================================================================== */
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      checkingAuth: false,

      setUser: (user) => set({ user }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      logout: async () => {
        try {
          // Instantly clear local frontend state and remove the tracking cookie
          set({ user: null });

          const response = await api.post("/auth/logout");
          return;
        } catch (error: any) {
          const errMsg = error.response?.data?.message || "An error occurred during logout";
          toast.error(errMsg);
        }
      },

      checkAuth: async () => {
        set({ checkingAuth: true });
        try {
          const response = await api.get("/account/profile");
          
          // Triggers an auto-update write to the cookie due to the partialize configuration below
          set({ user: response.data.user });
        } catch {
          set({ user: null });
        } finally {
          set({ checkingAuth: false });
        }
      },
    }),
    {
      name: "jobflix_user_ui", // 👈 Must match the name parameter key utilized in your first store precisely
      storage: createJSONStorage(() => crossSubdomainCookieStorage),
      
      // ⚠️ Isolates the UI data layer from your runtime engine flags
      partialize: (state) => ({ user: state.user }),
    }
  )
);