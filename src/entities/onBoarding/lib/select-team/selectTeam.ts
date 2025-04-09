import { useNavigate } from 'react-router-dom';
import logo from '@/shared/assets/common/logo.svg?url';

export interface TeamInfo {
  img: string;
  title: string;
  tags: string[];
  id: number;
}

export const UseSelectTeam = () => {
  const navigate = useNavigate();

  // 더미 데이터
  const teamList: TeamInfo[] = [
    {
      img: logo,
      title: 'UMC 6th 팀매니저',
      tags: ['기획자', '기획자'],
      id: 1,
    },
    {
      img: logo,
      title: 'UMC 6th 팀매니저',
      tags: ['기획자', '기획자'],
      id: 2,
    },
  ];

  // 팀 선택 핸들러
  const handleTeamSelect = (teamId: number) => {
    // console.log(`팀 ${teamId} 선택됨`);
    // navigate(`/team/${teamId}`);
  };

  // 새 팀 생성 핸들러
  const handleCreateTeam = () => {
    // console.log('새 팀 생성');
    // navigate('/team/create');
  };

  // 팀 찾기 핸들러
  const handleFindTeam = () => {
    navigate('/team-join');
  };

  return {
    teamList,
    handleTeamSelect,
    handleCreateTeam,
    handleFindTeam,
  };
};
