"use client";
import { useDarkMode } from "../app/context/DarkModeContext";
import axios from "axios";
import useStudy from "../app/context/StudyContext";
import { Study } from "../app/context/StudyContext";
import useAuth from "../app/context/AuthContext";
import { useEffect, useState } from "react";

export default function StudyCard({ study }: { study: Study }) {
    const { isDarkMode } = useDarkMode();
    const {isLoggedIn, joinedStudies} = useAuth();
    const { setSelectedStudy } = useStudy();
    const [userSelections, setUserSelections] = useState<string>("");
    const handleJoin = async(id: number) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('요청 id:', id);
        await axios.post(`http://localhost:8080/api/v1/join/studies/${id}`,
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
            
        })
        .catch(error => {
            console.error(error);
        });
    }
        
    const handleUnjoin = async(id: number) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('요청 id:', id);
        await axios.post(`http://localhost:8080/api/v1/unjoin/studies/${id}`,
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
            setUserSelections('unattend');
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    const handleAttendance = async(studyId: number, action: 'attend' | 'unattend') => {
        let newCount = study.participantCount;
    
        if (userSelections === action) {
          // 같은 버튼을 다시 누르면 선택 해제 (off)
          if (action === 'attend') {
            newCount = Math.max(study.participantCount - 1, 0);
            handleUnjoin(Number(study.id));
          }
        } else {
          // 다른 버튼을 누르거나 처음 누르는 경우 (on)
          if (action === 'attend') {
            if (userSelections !== 'unattend') {
              newCount = Math.min(study.participantCount + 1, study.maxParticipants || 50);
            }
            handleJoin(Number(study.id));
          } else { // action === 'skip'
            if (userSelections === 'attend') {
              newCount = Math.max(study.participantCount - 1, 0);
            }
            handleUnjoin(Number(study.id));
          }
        }

      };
    return (
        <div 
                  key={study.id}
                  className={`group p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'border-gray-700 hover:border-blue-600 hover:bg-blue-900/20' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                  // onClick={() => openStudyDetailPopup(study.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${study.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-xs sm:text-sm">{study.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold group-hover:text-blue-700 text-sm sm:text-base ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{study.name}</h3>
                        <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {study.date.toString()} • {study.memberCount}명 참여
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">진행중</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAttendance(study.id, 'attend');
                        }}
                        className={`px-4 py-2 text-xs sm:px-3 sm:py-1 rounded-full border transition-colors ${
                          userSelections === 'attend'
                            ? (isDarkMode 
                                ? 'border-green-600 text-white bg-green-600 hover:bg-green-700 active:bg-green-800' 
                                : 'border-green-500 text-white bg-green-500 hover:bg-green-600 active:bg-green-700')
                            : (isDarkMode 
                                ? 'border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white active:bg-green-700 active:text-white' 
                                : 'border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white active:bg-green-600 active:text-white')
                        }`}>{userSelections === 'attend' ? '참석중' : '참석하기'}</button>
                    
                    </div>
                  </div>
                </div>
    );
}