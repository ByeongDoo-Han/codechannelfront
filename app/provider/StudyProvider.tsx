'use client';

import axios from 'axios';
import React, { ReactNode, useEffect, useCallback } from 'react';
import { StudyContext, Study } from '../context/StudyContext';
import { useDarkMode } from '../context/DarkModeContext';
import useAuth from "../context/AuthContext";
import { useState } from 'react';

export default function StudyProvider({ children }: { children: ReactNode }) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const { isDarkMode } = useDarkMode();
  const { isLoggedIn, fetchJoinedStudies } = useAuth();
  const [userSelections, setUserSelections] = useState<{[studyId: string]: 'attend' | 'unattend' | null}>({});

  useEffect(() => {
    if (isLoggedIn) {
      fetchJoinedStudies();
    }
  }, [isLoggedIn, fetchJoinedStudies]);

  const updateStudy = useCallback((id: number, data: Partial<Study>) => {
    setStudies(prev => prev.map(study => 
      study.id === id ? { ...study, ...data } : study
    ));
  }, []);

  const addStudy = useCallback((data: Study) => {
    setStudies(prev => [...prev, data]);
  }, []);

  const removeStudy = useCallback((id: number) => {
    setStudies(prev => prev.filter(study => study.id !== id));
  }, []);

  const openStudyDetailPopup = useCallback((studyId: number) => {
    setSelectedStudy(studyId);
  }, []);

  const value = {
    studies,
    isDarkMode,
    setSelectedStudy,
    updateStudy,
    addStudy,
    removeStudy,
    openStudyDetailPopup,
    userSelections,
    handleAttendance,
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}
