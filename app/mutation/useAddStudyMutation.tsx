import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

interface AddStudyRequest {
  studyName: string,
  studyDate: string,
  location: string,
}

export const useAddStudyMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().accessToken;

  return useMutation({
    mutationFn: async (studyData: AddStudyRequest) => {
      const response = await axios.post(
        'http://54.180.132.97:8080/api/v1/studies',
        studyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // 스터디 목록 refetch
      queryClient.invalidateQueries({ queryKey: ['studies'] });
    },
    onError: (error) => {
      console.error('스터디 추가 실패', error);
    },
  });
};