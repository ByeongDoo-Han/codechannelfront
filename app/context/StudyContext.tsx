"use client";
import { createContext, useContext } from 'react';

export interface Study   {
  id: number;
  name: string;
  date: Date;
  location: string;
  memberCount: number;
  participants: string[];
  description: string;
  createdBy: string;
  status: 'active' | 'closed' | 'recruiting';
  participantCount: number;
  maxParticipants?: number;
  color: string;
  icon: string;
}

export interface StudyContextType {
  studies: Study[];
  selectedStudy: number | null;
  setSelectedStudy: (id: number) => void;
  updateStudy: (id: number, data: Partial<Study>) => void;
  addStudy: (data: Study) => void;
  removeStudy: (id: number) => void;
  openStudyDetailPopup: (studyId: number) => void;
}

export const StudyContext = createContext<StudyContextType | undefined>(undefined);

export default function useStudy() {
    const context = useContext(StudyContext);
    if (context === undefined) {
        throw new Error('useStudyContext must be used within a StudyProvider');
    }
    return context;
};