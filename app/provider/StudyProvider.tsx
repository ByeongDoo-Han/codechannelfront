'use client';

import axios from 'axios';
import React, { useState, ReactNode } from 'react';
import { StudyContext, Study } from '../context/StudyContext';
import { useDarkMode } from '../context/DarkModeContext';
import { UserSelectionsMap } from '../context/StudyContext';

export default function StudyProvider({ children }: { children: ReactNode }) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<number>(0);
  const [userSelections, setUserSelections] = useState<UserSelectionsMap>({});
  const { isDarkMode } = useDarkMode();

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
    setUserSelections(prev => ({
      ...prev,
      [studyId]: action,
    }));
  };

  const value = {
    studies,
    selectedStudy,
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