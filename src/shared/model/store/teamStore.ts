import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TeamStoreState {
  teamId: number | null;
  setTeamId: (id: number) => void;
  clearTeamId: () => void;
}

export const useTeamStore = create(
  persist<TeamStoreState>(
    (set) => ({
      teamId: null,
      setTeamId: (id) => set({ teamId: id }),
      clearTeamId: () => set({ teamId: null }),
    }),
    {
      name: 'team-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
