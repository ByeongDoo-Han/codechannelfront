'use client';

import axios from 'axios';
import React, { useState, ReactNode, useEffect } from 'react';
import { StudyContext, Study } from '../context/StudyContext';
import { useDarkMode } from '../context/DarkModeContext';
import useAuth from "../context/AuthContext";

export default function StudyProvider({ children }: { children: ReactNode }) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const [userSelections, setUserSelections] = useState<string>("");
  const { isDarkMode } = useDarkMode();
  const { isLoggedIn, joinedStudies, setJoinedStudies } = useAuth();

  useEffect(() => {
    const fetchStudies = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token || !isLoggedIn) return;

      try {
        const response = await axios.get('http://localhost:8080/api/v1/join/studies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setJoinedStudies(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('스터디 목록 불러오기 실패:', error);
      }
    };

    fetchStudies();
  }, [isLoggedIn]); // 로그인 상태 바뀌면 다시 fetch
  
  const updateStudy = (id: number, data: Partial<Study>) => {
    setStudies(prev => prev.map(study => 
      study.id === id ? { ...study, ...data } : study
    ));
  };

  const addStudy = (data: Study) => {
    setStudies(prev => [...prev, data]);
  };

  const removeStudy = (id: number) => {
    setStudies(prev => prev.filter(study => study.id !== id));
  };

  const openStudyDetailPopup = (studyId: number) => {
    setSelectedStudy(studyId);
  };
  const handleAttendance = (studyId: string, action: 'attend' | 'unattend') => {
    setUserSelections(action);
  };

  const value = {
    studies,
    isLoggedIn,
    joinedStudies,
    userSelections,
    isDarkMode,
    setSelectedStudy,
    updateStudy,
    addStudy,
    removeStudy,
    openStudyDetailPopup,
    handleAttendance,
  }

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}