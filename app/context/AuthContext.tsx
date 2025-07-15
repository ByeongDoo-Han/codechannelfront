"use client";
import { createContext, useContext } from "react";

interface AuthContextType {
    login: (token: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    openLoginModal: () => void;
    openSignupModal: () => void;
    joinedStudies: number[];
}

export const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    openLoginModal: () => {},
    openSignupModal: () => {},
    joinedStudies: [],
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};