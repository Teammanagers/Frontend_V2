export interface TeamProps {
  teamId: number | null;
  title: string | '';
  imageUrl?: string | null;
}

export interface SideBarProps {
  expanded: boolean; // hover 등으로 펼침 여부
  activePath: string; // 현재 경로
  isAlarmOpen: boolean;
  endSelected: boolean;
  team: TeamProps | null;

  onNavigate: (path: (teamId: number) => string) => void;
  onToggleAlarm: () => void;
  onToggleTeamList: () => void;
  onEndClick: () => void;
}
