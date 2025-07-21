"use client";
import React, { useState } from "react";
import { useDarkMode } from "../app/context/DarkModeContext";
import axios from "axios";
import useAuth from "../app/context/AuthContext";
import useStudy from "../app/context/StudyContext";
import StudyCard from "./StudyCard";
import { Study } from "../app/context/StudyContext";

interface UserSelections {
  [studyId: string]: 'attend' | 'unattend' | null;
}

interface StudySectionProps {
  studies: Study[];
  selectedStudyId?: number | null;
  userSelections: Record<string, 'attend' | 'unattend' | null>;
  isDarkMode: boolean;

  openAddStudyModal: () => void;
  openStudyDetailPopup?: (id: number) => void;
  setSelectedStudy: (id: number) => void;
  handleAttendance: (id: string, action: 'attend' | 'unattend') => void;
}



export default function StudySection({ studies, userSelections, isDarkMode }: StudySectionProps) {
    const [isAddStudyModalOpen, setIsAddStudyModalOpen] = useState(false);
    const [isStudyDetailPopupOpen, setIsStudyDetailPopupOpen] = useState(false);
    const [popupStudyId, setPopupStudyId] = useState<number | null>(null);
    const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
    const {isLoggedIn, logout } = useAuth();
    const { joinedStudies } = useStudy();

    //참석/불참석처리
    
    
    return (
        <section className={`backdrop-blur-sm rounded-xl shadow-sm border p-4 sm:p-6 hover:shadow-md transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <div className="flex justify-between items-center">
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>진행 중인 스터디</h2>
            <button 
                  // onClick={() => openAddStudyModal()}
                  className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  스터디 추가
                </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {studies.map((study: Study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  userSelections={userSelections[study.id.toString()] || 'attend'}
                />
              ))}
            </div>
          </section>
    );
}