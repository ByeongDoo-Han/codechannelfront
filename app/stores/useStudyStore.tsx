import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

interface StudyState {
  joinStudy: (studyId: number) => Promise<void>;
  leaveStudy: (studyId: number) => Promise<void>;
  joinedStudies: number[];
  isJoined: (studyId: number) => boolean;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  joinStudy: async (studyId: number) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      throw new Error('로그인이 필요합니다.');
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/studies/${studyId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '스터디 참가에 실패했습니다.');
      }

      console.log('스터디 참가 성공!');
    } catch (err) {
      console.error('Join Study Error:', err);
      throw err;
    }
  }
}));