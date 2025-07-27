"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import StudySection from "../../components/StudySection";
import { useDarkMode } from "../context/DarkModeContext";
import { Study, UserSelectionsMap } from "../context/StudyContext";
import AddStudyModal from "../../components/modal/AddStudyModal";
import useAuth from "../context/AuthContext";
import axios from "axios";
import useStudy from "../context/StudyContext";
import AuthModals from "../../components/modal/AuthModal";

export default function Body({ studies }: { studies: Study[] }) {
    const { isDarkMode } = useDarkMode();
    const [isAddStudyModalOpen, setIsAddStudyModalOpen] = useState(false);
    const closeAddStudyModal = () => setIsAddStudyModalOpen(false);
    const handleAddStudy = () => setIsAddStudyModalOpen(true);
    const [isClient, setIsClient] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStudyDetailPopupOpen, setIsStudyDetailPopupOpen] = useState(false);
    const [isProjectDetailPopupOpen, setIsProjectDetailPopupOpen] = useState(false);
    const [popupStudyId, setPopupStudyId] = useState<number | null>(null);
    const [popupProjectId, setPopupProjectId] = useState<string | null>(null);
    const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [userSelections, setUserSelections] = useState<{[studyId: string]: 'attend' | 'unattend' | null}>({});
    const {isLoggedIn, logout, joinedStudies, setJoinedStudies } = useAuth();
    const { updateStudy, setSelectedStudy } = useStudy();
  // 참석/불참석 처리 (on/off 방식)
    const handleAttendance = (studyId: string, action: 'attend' | 'unattend') => {
      const study = studies.find(s => s.id === Number(studyId));
      if (!study) return;

      const currentSelection = userSelections[studyId];
      let newSelection: 'attend' | 'unattend' | null = null;
      let newCount = study.participantCount;

      if (currentSelection === action) {
        // 같은 버튼을 다시 누르면 선택 해제 (off)
        newSelection = null;
        if (action === 'attend') {
          newCount = Math.max(study.participantCount - 1, 0);
          handleUnjoin(Number(study.id));
        }
      } else {
        // 다른 버튼을 누르거나 처음 누르는 경우 (on)
        newSelection = action;
        if (action === 'attend') {
          if (currentSelection !== 'unattend') {
            newCount = Math.min(study.participantCount + 1, study.maxParticipants || 50);
          }
          handleJoin(Number(study.id));
        } else { // action === 'unattend'
          if (currentSelection === 'attend') {
            newCount = Math.max(study.participantCount - 1, 0);
          }
          handleUnjoin(Number(study.id));
        }
      }

      // 사용자 선택 상태 업데이트
      setUserSelections(prev => ({
        ...prev,
        [studyId]: newSelection
      }));

      updateStudy(Number(studyId), { participantCount: newCount });
    };
    // 클라이언트에서만 실행되도록 보장
    useEffect(() => {
    setIsClient(true);
    if (isLoggedIn) {
        const initialSelections: {[studyId: string]: 'attend' | 'unattend' | null} = {};
        setUserSelections(initialSelections);
        }
    }, []);
    
  
    useEffect(() => {
    if (isLoggedIn) {
        const newSelections: { [studyId: string]: 'attend' | 'unattend' | null } = {};
        setUserSelections(newSelections);
    }
    }, []);

    const handleJoin = async(id: number) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('요청 id:', id);
        await axios.post(`https://api.dewdew.site/api/v1/join/studies/${id}`,
          {
            
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
          }
        )
        .then(response => {
          console.log('참석 성공:', response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
      }
      const handleUnjoin = async(id: number) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('요청 id:', id);
        await axios.post(`https://api.dewdew.site/api/v1/unjoin/studies/${id}`,
          {
            
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
          }
        )
        .then(response => {
          console.log('불참석 성공:', response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
      }
    return (
      <>
                {/* <Header darkMode={isDarkMode} /> */}
                <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            <StudySection 
                                studies={studies}
                                joinedStudies={joinedStudies}
                                userSelections={userSelections}
                                isDarkMode={isDarkMode}
                                setSelectedStudy={setSelectedStudy}
                            />
                            <AddStudyModal
                              isDarkMode={isDarkMode}
                            />
                            <AuthModals />
                        </div>
                    </div>
                </main>
                </>

    );
}