"use client";
import { createContext, useContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    joinedStudies: number[];
    getToken: () => string | null;
    isLoginModalOpen: boolean;
    isSignupModalOpen: boolean;
    openLoginModal: () => void;
    openSignupModal: () => void;
    closeLoginModal: () => void;
    closeSignupModal: () => void;
  }

export const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    getToken: () => null,
    joinedStudies: [],
    isLoginModalOpen: false,
    isSignupModalOpen: false,
    openLoginModal: () => {},
    openSignupModal: () => {},
    closeLoginModal: () => {},
    closeSignupModal: () => {},
});

export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};