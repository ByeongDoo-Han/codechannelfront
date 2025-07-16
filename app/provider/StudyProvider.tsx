'use client';

import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StudyContextType, StudyContext, Study } from '../context/StudyContext';

export default function StudyProvider({ children }: { children: ReactNode }) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<number>(0);

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

  const value: StudyContextType = {
    studies,
    selectedStudy,
    setSelectedStudy,
    updateStudy,
    addStudy,
    removeStudy,
    openStudyDetailPopup,
  }

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}