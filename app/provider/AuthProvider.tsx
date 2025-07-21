"use client";
import { AuthContext } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../context/AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const { joinedStudies } = useAuth();
    
    const getToken = () => localStorage.getItem('accessToken');
    
    const login = async (token: string) => {
      localStorage.setItem('accessToken', token);
      setIsLoggedIn(true);

    };

    const logout = () => {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setIsLoginModalOpen(false);
      setIsSignupModalOpen(false);
    };

    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
    const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);
    const openLoginModal = () => {
      setIsLoginModalOpen(true);
      setIsSignupModalOpen(false);
    }
    const openSignupModal = () => {
      setIsSignupModalOpen(true);
      setIsLoginModalOpen(false);
    }
    const closeLoginModal = () => setIsLoginModalOpen(false);
    const closeSignupModal = () => setIsSignupModalOpen(false);
  
    const value = {
      login,
      logout,
      getToken,
      isLoggedIn,
      setIsLoggedIn,
      isLoginModalOpen,
      isSignupModalOpen,
      openLoginModal,
      openSignupModal,
      closeLoginModal,
      closeSignupModal,
      selectedDate,
      selectedStudyId,
      selectedProjectId,
      setSelectedDate,
      setSelectedStudyId,
      setSelectedProjectId,
      openForgotPasswordModal,
      closeForgotPasswordModal,
      isForgotPasswordModalOpen,
    };
  
    return (  
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}