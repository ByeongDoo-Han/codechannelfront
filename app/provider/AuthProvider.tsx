"use client";
import { AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [joinedStudies, setJoinedStudies] = useState<number[]>([]);

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

    const getToken = () => localStorage.getItem('accessToken');
    
    const login = useCallback(async (token: string) => {
      localStorage.setItem('accessToken', token);
      setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
      localStorage.removeItem('accessToken');
      setJoinedStudies([]);
      setIsLoggedIn(false);
      setIsLoginModalOpen(false);
      setIsSignupModalOpen(false);
    }, []);

    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const openForgotPasswordModal = useCallback(() => setIsForgotPasswordModalOpen(true), []);
    const closeForgotPasswordModal = useCallback(() => setIsForgotPasswordModalOpen(false), []);
    const openLoginModal = useCallback(() => {
      setIsLoginModalOpen(true);
      setIsSignupModalOpen(false);
    }, []);
    const openSignupModal = useCallback(() => {
      setIsSignupModalOpen(true);
      setIsLoginModalOpen(false);
    }, []);
    const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);
    const closeSignupModal = useCallback(() => setIsSignupModalOpen(false), []);
  
    const fetchJoinedStudies = useCallback(async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
    
      try {
        const response = await axios.get('https://api.dewdew.site/api/v1/join/studies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
    
        setJoinedStudies(response.data.map((study: any) => study.groupId));
        console.log(response.data)
      } catch (error) {
        console.error('스터디 목록 불러오기 실패:', error);
      }
    }, []);

    const handleJoinStudy = useCallback(async (studyId: number) => {
      const token = useAuthStore((state) => state.accessToken);
      if (!token) {
        openLoginModal();
        return;
      }

      try {
        await axios.post(`https://api.dewdew.site/api/v1/join/${studyId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        fetchJoinedStudies();
      } catch (error) {
        console.error('스터디 참여 실패:', error);
      }
    }, [fetchJoinedStudies, openLoginModal]);
    
    const value = {
      login,
      logout,
      getToken,
      isLoggedIn,
      joinedStudies,
      setJoinedStudies,
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
      fetchJoinedStudies,
      openForgotPasswordModal,
      closeForgotPasswordModal,
      isForgotPasswordModalOpen,
      handleJoinStudy,
    };
  
    return (  
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}