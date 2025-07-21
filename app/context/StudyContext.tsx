"use client";
import { createContext, useContext } from 'react';
import useAuth from "./AuthContext";

type UserSelections = {
    [studyId: string]: 'attend' | 'unattend' | null;
}

export type UserSelectionsMap = Record<number, UserSelections>;

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
  joinedStudies: number[];
  // selectedStudy: number | null;
  userSelections: string;
  isDarkMode: boolean;
  setSelectedStudy: (id: number) => void;
  updateStudy: (id: number, data: Partial<Study>) => void;
  addStudy: (data: Study) => void;
  removeStudy: (id: number) => void;
  openStudyDetailPopup: (studyId: number) => void;
  handleAttendance: (studyId: string, action: 'attend' | 'unattend') => void;
}

export const StudyContext = createContext<StudyContextType | undefined>(undefined);

export default function useStudy() {
    const context = useContext(StudyContext);
    if (context === undefined) {
        throw new Error('useStudyContext must be used within a StudyProvider');
    }
    return context;
};