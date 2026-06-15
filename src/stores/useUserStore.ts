import { create } from "zustand";
import { toast } from "sonner";

interface User {
    id: string;
    username: string;
    email: string;
    // Add other user properties as needed
}

interface UserStore {
    user: User | null;
    loading: boolean;
    checkingAuth: boolean;
    login: (email: string, password: string, turnstileToken: string) => Promise<void>;
    signup: (name: string, email: string, phone: string, password: string, turnstileToken: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    updateUser: (data: Partial<User>) =>
        set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
    })),

    login: async (email: string, password: string, turnstileToken: string) => {
        set({ loading: true });
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_JOBFILX_APIURL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, token: turnstileToken }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Login failed");
            }
            set({ user: data.user, loading: false });
        } catch (error: any) {
            set({ loading: false });
            throw new Error(error.message || "Login failed");
        }
    },

    signup: async (name: string, email: string, phone: string, password: string, turnstileToken: string) => {
        set({ loading: true });
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_JOBFILX_APIURL}/auth/signup`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password, token: turnstileToken }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Signup failed");
            }
            set({ user: data.user ?? null, loading: false });
        } catch (error: any) {
            set({ loading: false });
            throw new Error(error.message || "Signup failed");
        }
    },

    logout: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_JOBFILX_APIURL_BASE}/api/auth/logout`, {
                method: "POST",
                credentials: "include", // include cookies if your auth uses them
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            set({user: null});
            window.location.href = data.next;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred during logout");
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_JOBFILX_APIURL_BASE}/api/account/profile`, {
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) throw new Error();
            set({ user: data.user, checkingAuth: false });
        } catch {
            set({ user: null, checkingAuth: false });
        }
    },
}));