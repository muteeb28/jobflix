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

    logout: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/logout`, {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/account/profile`, {
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