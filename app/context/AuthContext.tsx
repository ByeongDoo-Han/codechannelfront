"use client";
import { createContext, useContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    joinedStudies: number[];
    isLoginModalOpen: boolean;
    isSignupModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    openSignupModal: () => void;
    closeSignupModal: () => void;
    closeForgotPasswordModal: () => void;
    openForgotPasswordModal: () => void;
    openAddStudyModal: () => void;
    closeAddStudyModal: () => void;
    getToken: () => string | null;
  }

export const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    getToken: () => null,
    openLoginModal: () => {},
    openSignupModal: () => {},
    joinedStudies: [],
    isLoginModalOpen: false,
    isSignupModalOpen: false,   
    closeLoginModal: () => {},
    closeSignupModal: () => {},
    closeForgotPasswordModal: () => {},
    openForgotPasswordModal: () => {},
    openAddStudyModal: () => {},
    closeAddStudyModal: () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};