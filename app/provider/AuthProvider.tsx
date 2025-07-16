"use client";
import { AuthContext } from "../context/AuthContext";
import React, { useState } from "react";
import axios from "axios";
import { get } from "http";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [joinedStudies, setJoinedStudies] = useState<number[]>([]);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isAddStudyModalOpen, setIsAddStudyModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
        fetchJoinedStudies();
        window.location.reload();
    }

    const getToken = () => {
        return localStorage.getItem('accessToken');
    }

    const closeForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(false);
    };

    const openForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(true);
    };

    const fetchJoinedStudies = async () => {
        const token = getToken();
        if (!token) return;
    
        try {
          const response = await axios.get('http://localhost:8080/api/v1/join/studies', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setJoinedStudies(response.data.map((study: any) => study.groupId));
        } catch (error) {
          console.error('Failed to fetch joined studies:', error);
        }
    };
      
    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        setJoinedStudies([]);
        window.location.reload();
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const openSignupModal = () => {
        setIsSignupModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const closeSignupModal = () => {
        setIsSignupModalOpen(false);
    };

    const closeAddStudyModal = () => {
        setIsAddStudyModalOpen(false);
    };

    const openAddStudyModal = () => {
        setIsAddStudyModalOpen(true);
    };

    const value = {
        login,
        getToken,
        logout,
        isLoggedIn,
        joinedStudies,
        isLoginModalOpen,
        isSignupModalOpen,
        isAddStudyModalOpen,
        closeForgotPasswordModal,
        openForgotPasswordModal,
        openLoginModal,
        openSignupModal,
        closeLoginModal,
        closeSignupModal,
        openAddStudyModal,
        closeAddStudyModal,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};