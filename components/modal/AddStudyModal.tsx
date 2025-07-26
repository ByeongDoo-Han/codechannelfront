'use client';

import React from 'react';
import axios from 'axios';
import { useAddStudyModalStore } from '@/app/stores/useAddStudyModalStore';
import { useAddStudyMutation } from '@/app/mutation/useAddStudyMutation';

export default function AddStudyModal({ isDarkMode }: { isDarkMode: boolean }) {
  const { isOpen, closeModal } = useAddStudyModalStore();
  const { mutateAsync: addStudy } = useAddStudyMutation();
  const [studyForm, setStudyForm] = React.useState({
    studyName: '',
    studyDate: '',
    location: '',
  });
  if(!isOpen) return null;

  const handleAddStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await addStudy(
        {
          studyName: studyForm.studyName,
          studyDate: studyForm.studyDate,
          location: studyForm.location,
        }
      );
      console.log('스터디 추가 성공:', response);
      // window.location.reload();
    } catch (err) {
      console.error('스터디 추가 실패:', err);
    }

    console.log('스터디 추가 시도:', studyForm);
    closeModal();
    setStudyForm({ studyName: '', studyDate: '', location: '' });
  };

  const handleCloseStudy = () => {
    closeModal();
    setStudyForm({ studyName: '', studyDate: '', location: '' });
  };


  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={handleCloseStudy}
    >
      <div
        className={`rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            스터디 추가
          </h2>
          <button
            onClick={handleCloseStudy}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleAddStudySubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              스터디 이름
            </label>
            <input
              type="text"
              required
              value={studyForm.studyName}
              onChange={(e) => setStudyForm({ ...studyForm, studyName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="스터디 이름을 입력하세요"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              스터디 시간
            </label>
            <input
              type="date"
              required
              value={studyForm.studyDate}
              onChange={(e) => setStudyForm({ ...studyForm, studyDate: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="날짜를 선택하세요"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              스터디 위치
            </label>
            <input
              type="text"
              required
              value={studyForm.location}
              onChange={(e) => setStudyForm({ ...studyForm, location: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="스터디 위치를 입력하세요"
            />
          </div>

          {/* <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              스터디 내용
            </label>
            <input
              type="text"
              required
              value={studyForm.description}
              onChange={(e) => setStudyForm({ ...studyForm, description: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="스터디 내용을 입력하세요"
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
            onClick={handleAddStudySubmit}
          >
            스터디 추가
          </button>
        </form>
      </div>
    </div>
  )
}
