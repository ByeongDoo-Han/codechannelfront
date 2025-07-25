import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
}

interface AuthState {
    accessToken: string | null;
    user: User | null;
    isLoggedIn: boolean;
    joinedStudies: number[];
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
    accessToken: null,
    user: null,
    login: (accessToken: string, user: User) => 
        set({ user, accessToken, isLoggedIn: true }),
    logout: () => set({ user: null, accessToken: null, isLoggedIn: false }),
    isLoggedIn: false,
    joinedStudies: [],
}),
{
    name: 'auth',
    partialize: (state) => ({
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
        joinedStudies: state.joinedStudies,
    }),
}));
