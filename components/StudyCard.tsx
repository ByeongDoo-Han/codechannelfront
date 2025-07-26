"use client";
import { useDarkMode } from "../app/context/DarkModeContext";
import { Study } from "../app/context/StudyContext";
import { useJoinStudyMutation, useUnjoinStudyMutation } from "../app/mutation/useStudyMutation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../app/stores/useAuthStore";
import { useState, useEffect } from "react";
export default function StudyCard({ study, isJoined }: { study: Study, isJoined: boolean }) {
    const { isDarkMode } = useDarkMode();
    const {mutate: joinStudyHandler} = useJoinStudyMutation();
    const {mutate: unjoinStudyHandler} = useUnjoinStudyMutation();
    const token = useAuthStore.getState().accessToken;
    
    const {
        data: studyMemberNames = [],
        isLoading,
        isError,
      } = useQuery({
        queryKey: ['studyMemberNames', study.id],
        queryFn: async () => {
          const res = await axios.get(
            `http://54.180.132.97:8080/api/v1/studies/${study.id}/members`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          return res.data;
        },
      });

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
              isJoined?unjoinStudyHandler(study.id):joinStudyHandler(study.id);
            }}
            className={`px-4 py-2 text-xs sm:px-3 sm:py-1 rounded-full border transition-colors ${
              isJoined
                ? isDarkMode
                  ? 'border-green-600 text-white bg-green-600 hover:bg-green-700 active:bg-green-800'
                  : 'border-green-500 text-white bg-green-500 hover:bg-green-600 active:bg-green-700'
                : isDarkMode
                ? 'border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white active:bg-green-700 active:text-white'
                : 'border-green-500 text-green-500 bg-transparent hover:bg-green-500 hover:text-white active:bg-green-600 active:text-white'
            }`}
          >
            {isJoined ? '참석중' : '참석하기'}
          </button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
        {studyMemberNames.map((member: string) => (
          <button
            key={member}
            className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
          >
            {member}
          </button>
        ))}
      </div>
                </div>
    );
}
