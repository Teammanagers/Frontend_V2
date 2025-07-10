import { create } from 'zustand';

interface FolderState {
  currentFolderId: number | null;
  setCurrentFolderId: (id: number) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  currentFolderId: null,
  setCurrentFolderId: (id) => set({ currentFolderId: id }),
}));
