"use client";
import { createContext, useContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    fetchJoinedStudies: () => void;
    joinedStudies: number[];
    setJoinedStudies: (studies: number[]) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    getToken: () => string | null;
    isLoginModalOpen: boolean;
    isSignupModalOpen: boolean;
    openLoginModal: () => void;
    openSignupModal: () => void;
    closeLoginModal: () => void;
    closeSignupModal: () => void;
    handleJoinStudy: (studyId: number) => void;
    openForgotPasswordModal: () => void;
    closeForgotPasswordModal: () => void;
    isForgotPasswordModalOpen: boolean;
  }

export const AuthContext = createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
    fetchJoinedStudies: () => {},
    joinedStudies: [],
    setJoinedStudies: () => {},
    setIsLoggedIn: () => {},
    getToken: () => null,
    isLoginModalOpen: false,
    isSignupModalOpen: false,
    openLoginModal: () => {},
    openSignupModal: () => {},
    closeLoginModal: () => {},
    closeSignupModal: () => {},
    handleJoinStudy: (studyId: number) => {},
    openForgotPasswordModal: () => {},
    closeForgotPasswordModal: () => {},
    isForgotPasswordModalOpen: false,
});

export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};