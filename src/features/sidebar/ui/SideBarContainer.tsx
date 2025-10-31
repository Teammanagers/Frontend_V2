import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate';
import SideBar from '@/widgets/sidebar/ui/SideBar';

export default function SideBarContainer() {
  const [hover, setHover] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [endSelected, setEndSelected] = useState(false);

  const navigate = useNavigate();
  const teamNavigate = useTeamNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (path: (teamId: number) => string) => {
    setEndSelected(false);
    teamNavigate(path);
  };

  const team = { title: '테수투', imageUrl: null }; // API 연동 필요

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <SideBar
        expanded={hover /* 알림 패널 붙이면 hover || isAlarmOpen */}
        activePath={pathname}
        isAlarmOpen={isAlarmOpen}
        endSelected={endSelected}
        team={team}
        onNavigate={handleNavigate}
        onToggleAlarm={() => setIsAlarmOpen((v) => !v)}
        onEndClick={() => {
          setEndSelected(true);
          navigate('/management'); // /end로 분리되면 교체
        }}
      />
    </div>
  );
}
