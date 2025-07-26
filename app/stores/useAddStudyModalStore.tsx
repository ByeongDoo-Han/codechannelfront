// stores/useStudyModalStore.ts
import { create } from 'zustand';

interface AddStudyModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useAddStudyModalStore = create<AddStudyModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));