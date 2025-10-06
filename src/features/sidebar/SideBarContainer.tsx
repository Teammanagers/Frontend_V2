import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import SideBar from '@/widgets/sidebar/ui/SideBar';

export default function SideBarContainer() {
  const [hover, setHover] = useState<boolean>(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const [isTeamListOpen, setIsTeamListOpen] = useState<boolean>(false);
  const [endSelected, setEndSelected] = useState<boolean>(false);

  const { useTeamByIdQuery } = useTeamQueries();
  const { data: team, isPending: isTeamLoading } = useTeamByIdQuery();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (path: string) => {
    setEndSelected(false);
    navigate(path);
  };

  const handleToggleTeamList = () => setIsTeamListOpen((prev) => !prev);

  const teamData = isTeamLoading
    ? { title: '로딩 중..', imageUrl: null }
    : {
        title: team?.team?.title ?? '',
        imageUrl: team?.imgUrl ?? null,
      };

  console.log('드롭다운 오픈? ', isTeamListOpen);

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
        team={teamData}
        onNavigate={handleNavigate}
        onToggleAlarm={() => setIsAlarmOpen((v) => !v)}
        onToggleTeamList={handleToggleTeamList}
        onEndClick={() => {
          setEndSelected(true);
          navigate('/management'); // / end로 분리되면 교체
        }}
      />
    </div>
  );
}
