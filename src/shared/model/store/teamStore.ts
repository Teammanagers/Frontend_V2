import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TeamStoreState {
  teamId: number | null;
  teamMemberId: number | null;

  setTeamId: (id: number) => void;
  setTeamMemberId: (id: number) => void;

  setTeamIds: (teamId: number, teamMemberId: number) => void;
  clearTeamIds: () => void;
}

export const useTeamStore = create(
  persist<TeamStoreState>(
    (set) => ({
      teamId: null,
      teamMemberId: null,

      setTeamId: (id) => set({ teamId: id }),
      setTeamMemberId: (id) => set({ teamMemberId: id }),

      setTeamIds: (teamId, teamMemberId) => set({ teamId, teamMemberId }),
      clearTeamIds: () => set({ teamId: null, teamMemberId: null }),
    }),
    {
      name: 'team-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
