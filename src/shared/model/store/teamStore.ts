import { create } from 'zustand';

interface TeamStoreState {
  teamId: number | null;
  setTeamId: (id: number) => void;
  clearTeamId: () => void;
}

export const useTeamStore = create<TeamStoreState>((set) => ({
  teamId: null,
  setTeamId: (id) => set({ teamId: id }),
  clearTeamId: () => set({ teamId: null }),
}));
