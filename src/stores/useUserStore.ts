import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import api from "@/lib/axios"; // Utilizing your shared Axios configuration instance
import { toast } from "sonner";

/* ==========================================================================
   1. Types Configuration (Aligned with structural payload expectations)
   ========================================================================== */
interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  address?: any;
  phone?: string;
  role?: string;
  jobseekerOnboarding?: boolean;
  // Add other shared profile attributes here as your UI grows
}

type SignupPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  token: string | null;
};

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  signup: (data: SignupPayload) => Promise<{ redirectTo: string } | void>;
  login: (email: string, password: string, token: string | null) => Promise<any>;
  refreshToken: () => Promise<any>;
  addBillingAddress: (form: any) => Promise<void>;
  changeEmail: (form: any) => Promise<void>;
  verifyEmail: (otp: string, newEmail: string) => Promise<any>;
  jobseekerOnboarding: (onboardingData: any) => Promise<any>;
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
    (set, get) => ({
      user: null,
      loading: false,
      checkingAuth: false,

      setUser: (user) => set({ user }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      signup: async ({ name, email, phone, password, confirmPassword, token }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
          set({ loading: false });
          toast.error("Passwords do not match");
          return;
        }

        try {
          const response = await api.post("/auth/signup", {
            name,
            email,
            phone,
            password,
            token,
          });

          const data = response.data;
          if (data.success) {
            toast.success(data.message || "Signup successful! Redirecting...");
            return { redirectTo: "/login" };
          }
          toast.error(data.message || "Signup error at the moment.");
        } catch (error: any) {
          const errMsg = error.response?.data?.message || "An error occurred";
          toast.error(errMsg);
        } finally {
          set({ loading: false });
        }
      },

      login: async (email, password, token) => {
        set({ loading: true });

        try {
          const response = await api.post("/auth/login", {
            email,
            password,
            token,
          });

          const data = response.data;

          // State triggers auto-sync to cookie thanks to 'persist' + 'partialize'
          set({ user: data.user });

          let next = typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("next") || process.env.NEXT_PUBLIC_ROOT_URL
            : process.env.NEXT_PUBLIC_ROOT_URL;

          if (data.user && data.user?.jobseekerOnboarding === "pending" && next === process.env.NEXT_PUBLIC_RESUMEASSIST_VIEW) {
            next = "/onboarding/jobseeker";
          }
          return { success: true, next };
        } catch (error: any) {
          const errMsg = error.response?.data?.message || "An error occurred";
          toast.error(errMsg);
        } finally {
          set({ loading: false });
        }
      },

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

      refreshToken: async () => {
        try {
          const response = await api.post("/auth/refresh-token");
          return response.data;
        } catch (error) {
          set({ user: null });
          throw error;
        }
      },

      addBillingAddress: async (form) => {
        set({ loading: true });
        try {
          const response = await api.post("/cart/billing-address", form);

          set((state) => ({
            user: state.user ? { ...state.user, address: form } : null,
          }));

          toast.success("Address updated successfully!");
        } catch (error: any) {
          const errMsg = error.response?.data?.message || "Some unexpected error occurred.";
          toast.error(errMsg);
        } finally {
          set({ loading: false });
        }
      },

      changeEmail: async (form) => {
        set({ loading: true });
        try {
          const response = await api.post('/account/profile/me/change-email', form);
          if (response.data && response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'some error occured. Try again later.');
        } finally {
          set({ loading: false });
        }
      },

      verifyEmail: async (otp: string, newEmail: string) => {
        set({ loading: true });
        try {
          const response = await api.put('/account/profile/me/email-verifyotp', { otp, newEmail });
          if (response.data && response.data.success) {
            get().updateUser({ email: newEmail });
            toast.success(response.data.message);
            return {
              success: true,
            }
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'some error occured. Try again later.');
        } finally {
          set({ loading: false });
        }
      },

      jobseekerOnboarding: async (onboardingData: any) => {
        set({ loading: true });
        try {
          const { data } = await api.put('/account/profile/onboarding/jobseeker', onboardingData);

          if (data.success) {
            get().updateUser({ jobseekerOnboarding: true });
            const params = new URLSearchParams(window.location.search);
            const nextPath = params.get("next") || data.next || '/';
            return { success: true, next: nextPath };
          }

          return { success: false, message: data.message };
        } catch (error: any) {
          const msg = error.response?.data?.message || "Onboarding failed";
          return { success: false, message: msg };
        } finally {
          // Ensure loading is always turned off
          set({ loading: false });
        }
      }
    }),
    {
      name: "jobflix_user_ui", // 👈 Must match the name parameter key utilized in your first store precisely
      storage: createJSONStorage(() => crossSubdomainCookieStorage),

      // ⚠️ Isolates the UI data layer from your runtime engine flags
      partialize: (state) => ({ user: state.user }),
    }
  )
);