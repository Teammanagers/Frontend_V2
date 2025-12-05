import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ROUTE_SEGMENTS } from '@/app/routes/paths';
import useSideBarQueries from '@/features/sidebar/model/useSideBarQueries';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate';
import { TeamProps } from '@/widgets/sidebar';

export default function useSideBarState() {
  const [hover, setHover] = useState(false);
  // const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isTeamListOpen, setIsTeamListOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<TeamProps | null>(null);

  const { pathname } = useLocation();
  const { teamId } = useParams<{ teamId?: string }>();
  const parsedTeamId = Number(teamId);

  const navigate = useNavigate();
  const teamNavigate = useTeamNavigate();

  const { useMyTeamListQuery } = useSideBarQueries();
  const { data: myTeams } = useMyTeamListQuery();

  const teamList: TeamProps[] = useMemo(
    () =>
      myTeams?.map((item) => ({
        teamId: item.team.id,
        title: item.team.title,
        imageUrl: item.imgUrl ?? null,
      })) ?? [],
    [myTeams],
  );

  useEffect(() => {
    if (!parsedTeamId || teamList.length === 0) return;

    const matched = teamList.find((t) => t.teamId === parsedTeamId);
    if (matched) setCurrentTeam(matched);
  }, [parsedTeamId, teamList]);

  const handleTeamSelected = (team: TeamProps) => {
    setCurrentTeam(team);
    setIsTeamListOpen(false);
    teamNavigate(() => `/team/${team.teamId}`);
  };

  const handleModalOpen = () => setIsAddTeamModalOpen(true);
  const handleModalClose = () => {
    setIsAddTeamModalOpen(false);
    setHover(false);
    setIsTeamListOpen(false);
  };

  const handleCreateTeam = () => {
    handleModalClose();
    navigate(`/${ROUTE_SEGMENTS.MAKE_TEAM}`);
  };

  const handleJoinTeam = () => {
    handleModalClose();
    navigate(`/${ROUTE_SEGMENTS.TEAM_JOIN}`);
  };

  const handleNavigate = (path: (teamId: number) => string) => {
    teamNavigate(path);
  };

  return {
    hover,
    // isAlarmOpen,
    isTeamListOpen,
    isAddTeamModalOpen,
    currentTeam,
    teamList,
    pathname,

    setHover,
    // setIsAlarmOpen,
    setIsTeamListOpen,

    handleNavigate,
    handleTeamSelected,
    handleModalOpen,
    handleModalClose,
    handleCreateTeam,
    handleJoinTeam,
  };
}
