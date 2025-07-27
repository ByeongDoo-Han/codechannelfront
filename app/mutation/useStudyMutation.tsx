import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

export const useJoinStudyMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().accessToken;

  return useMutation({
    mutationFn: async (studyId: number) => {
      const response = await axios.post(
        `https://api.dewdew.site/api/v1/join/studies/${studyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (_, studyId) => {
      queryClient.invalidateQueries({ queryKey: ['joinedStudies'] }); // 캐시 무효화 → 재요청
      queryClient.invalidateQueries({ queryKey: ['studies'] }); // 캐시 무효화 → 재요청
      queryClient.invalidateQueries({ queryKey: ['studyMemberNames', studyId] });

    },
  });
};

export const useUnjoinStudyMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().accessToken;

  return useMutation({
    mutationFn: async (studyId: number) => {
      const response = await axios.post(
        `https://api.dewdew.site/api/v1/unjoin/studies/${studyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (_, studyId) => {
      queryClient.invalidateQueries({ queryKey: ['joinedStudies'] });
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['studyMemberNames', studyId] });
    },
  });
};
