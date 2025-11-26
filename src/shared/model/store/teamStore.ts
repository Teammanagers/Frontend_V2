import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TeamStoreState {
  teamId: number | null; // 현재 선택된 팀 아이디
  teamMemberId: number | null; // 내 팀 멤버 아이디

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
