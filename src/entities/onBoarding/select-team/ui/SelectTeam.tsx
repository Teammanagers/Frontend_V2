import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '@/shared/assets/common/logo.svg?url';
import { Button } from '@/shared/components/button/Button';
import { AddTeamCard, TeamCard } from './TeamContent';

interface TeamInfo {
  img: string;
  title: string;
  tags: string[];
  id: number;
}

export default function SelectTeam() {
  const navigate = useNavigate();

  // 팀 선택 핸들러
  const handleTeamSelect = (/*teamId: number*/) => {
    // navigate(`/team/${teamId}`);
  };

  // 새 팀 생성 핸들러
  const handleCreateTeam = () => {
    // navigate('/team/create');
  };

  const DUMMYLIST: TeamInfo[] = [
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

  return (
    <SelectTeamContainer>
      <PageTitle>{'000'}님이 현재 진행하고 있는 팀 프로젝트예요!</PageTitle>
      <TeamListContainer>
        {DUMMYLIST.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onClick={() => team.id && handleTeamSelect(/*team.id*/)}
          />
        ))}
        <AddTeamCard onClick={handleCreateTeam} />
      </TeamListContainer>
      <BtnContainer>
        <BtnSpan>다른 팀의 초대를 받았나요?</BtnSpan>
        <Button
          size="large"
          style="main"
          onClick={() => navigate('/team/search')}
        >
          팀 찾으러 가기
        </Button>
      </BtnContainer>
    </SelectTeamContainer>
  );
}

const SelectTeamContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 139px;
`;

const PageTitle = styled.span`
  position: absolute;
  top: 100px;
  left: 112px;
  display: flex;
  color: black;
  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
`;

const TeamListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

const BtnSpan = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
`;
