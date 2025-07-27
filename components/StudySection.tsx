"use client";
import React, { useState } from "react";
import { useDarkMode } from "../app/context/DarkModeContext";
import axios from "axios";
import useAuth from "../app/context/AuthContext";
import useStudy from "../app/context/StudyContext";
import StudyCard from "./StudyCard";
import { Study } from "../app/context/StudyContext";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useAddStudyModalStore } from "@/app/stores/useAddStudyModalStore";

interface UserSelections {
  [studyId: string]: 'attend' | 'unattend' | null;
}

interface StudySectionProps {
  studies: Study[];
  selectedStudyId?: number | null;
  userSelections: Record<string, 'attend' | 'unattend' | null>;
  isDarkMode: boolean;
  joinedStudies: number[];
  openStudyDetailPopup?: (id: number) => void;
  setSelectedStudy: (id: number) => void;
}



export default function StudySection({isDarkMode }: StudySectionProps) {
    const [isAddStudyModalOpen, setIsAddStudyModalOpen] = useState(false);
    const [isStudyDetailPopupOpen, setIsStudyDetailPopupOpen] = useState(false);
    const [popupStudyId, setPopupStudyId] = useState<number | null>(null);
    const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
    const {isLoggedIn, logout } = useAuth();
    const [userSelections, setUserSelections] = useState<{[studyId: string]: 'attend' | 'unattend' | null}>({});
    const {openModal, closeModal} = useAddStudyModalStore();
    //참석/불참석처리
    const token = useAuthStore((state) => state.accessToken);
    const {data: studies, isLoading, error} = useQuery({
        queryKey: ['studies'],
        queryFn: ()=>axios.get("https://api.dewdew.site:8080/api/v1/studies")
        .then(response => response.data),
    });

    const fetchJoinedStudies = async (token: string) => {
        const response = await axios.get("https://api.dewdew.site:8080/api/v1/join/studies", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        if(!response){
            throw new Error("Failed to fetch joined studies");
        }
        return response.data;
    }

    const {data: joinedStudies, isLoading: joinedStudiesLoading, error: joinedStudiesError} = useQuery({
            queryKey: ['joinedStudies'],
            queryFn: ()=>fetchJoinedStudies(token!),
            enabled: !!token,
    });

    if(isLoading) return <p>로딩중...</p>
    const isJoined = (studyId: number) => joinedStudies?.some((joinedStudy: any) => joinedStudy.groupId === studyId);
    return (
        <section className={`backdrop-blur-sm rounded-xl shadow-sm border p-4 sm:p-6 hover:shadow-md transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <div className="flex justify-between items-center">
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>진행 중인 스터디</h2>
            <button 
                  onClick={() => openModal()}
                  className={`transition-colors font-medium text-base ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  스터디 추가
                </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {studies?.length!==0?studies?.map((study: Study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  isJoined={isJoined(study.id)}
                />
              )):<p>스터디가 없습니다.</p>}
            </div>
          </section>
    );
}