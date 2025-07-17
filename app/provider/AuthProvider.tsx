"use client";
import { AuthContext } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [joinedStudies, setJoinedStudies] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  
    const getToken = () => localStorage.getItem('accessToken');
  
    const fetchJoinedStudies = async () => {
      const token = getToken();
      if (!token) {
        setIsLoggedIn(false);
        setJoinedStudies([]);
        return;
      }
      if(isLoggedIn){
        try {
          const response = await axios.get('http://localhost:8080/api/v1/join/studies', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJoinedStudies(response.data.map((study: any) => study.groupId));
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Failed to fetch joined studies:', error);
        }
      }
    };
  
    const login = async (token: string) => {
      localStorage.setItem('accessToken', token);
      await fetchJoinedStudies();
    };
  
    const logout = () => {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);
      setIsLoginModalOpen(false);
      setIsSignupModalOpen(false);
      setJoinedStudies([]);
    };
  
    const openLoginModal = () => setIsLoginModalOpen(true);
    const openSignupModal = () => setIsSignupModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);
    const closeSignupModal = () => setIsSignupModalOpen(false);
  
    useEffect(() => {
      fetchJoinedStudies();
    }, []);
  
    const value = {
      login,
      logout,
      getToken,
      isLoggedIn,
      joinedStudies,
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
    };
  
    return (  
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
}