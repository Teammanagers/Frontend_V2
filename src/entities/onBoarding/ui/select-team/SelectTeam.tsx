import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/shared/components/button/Button';
import { AddTeamCard, TeamCard } from './TeamContent';
import { useGetTeamList } from '../../model/selectTeam/useGetTeamList';

export default function SelectTeam() {
  const { teamList } = useGetTeamList();
  const navigate = useNavigate();

  return (
    <SelectTeamContainer>
      {/* TODO 유저 이름 받아오기 */}
      <PageTitle>{'000'}님이 현재 진행하고 있는 팀 프로젝트예요!</PageTitle>
      <TeamListContainer>
        {teamList &&
          teamList.map((team) => <TeamCard key={team.id} team={team} />)}
        <AddTeamCard />
      </TeamListContainer>
      <BtnContainer>
        <BtnSpan>다른 팀의 초대를 받았나요?</BtnSpan>
        <Button
          size="large"
          style="main"
          onClick={() => navigate('/team-join')}
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
