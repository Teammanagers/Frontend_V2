import { create } from 'zustand';

// interface FolderState {
//   currentFolderId: number | null;
//   setCurrentFolderId: (id: number) => void;
// }

type FolderPath = { id: number; name: string };

interface FolderPathState {
  path: FolderPath[];
  setPath: (newPath: FolderPath[]) => void;
  pushPath: (folder: FolderPath) => void;
  popPath: () => void;
  resetPath: () => void;
}

// export const useFolderStore = create<FolderState>((set) => ({
//   currentFolderId: null,
//   setCurrentFolderId: (id) => set({ currentFolderId: id }),
// }));

export const useFolderPathStore = create<FolderPathState>((set) => ({
  path: [],
  setPath: (newPath) => set({ path: newPath }),
  pushPath: (folder) =>
    set((state) => {
      if (state.path.length >= 3) return state; // depth 제한
      return { path: [...state.path, folder] };
    }),
  popPath: () =>
    set((state) => ({
      path: state.path.slice(0, -1),
    })),
  resetPath: () => set({ path: [] }),
}));
