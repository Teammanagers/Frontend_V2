import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/shared/components/button/Button';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { AddTeamCard, TeamCard } from './TeamContent';
import { useGetName } from '../../model/selectTeam/useGetName';
import { useGetTeamList } from '../../model/selectTeam/useGetTeamList';

export default function SelectTeam() {
  const { teamList, isLoading } = useGetTeamList();
  const navigate = useNavigate();
  const { name } = useGetName();
  return (
    <SelectTeamContainer>
      {name ? (
        <PageTitle>{name}님이 현재 진행하고 있는 팀 프로젝트예요!</PageTitle>
      ) : (
        <PageTitle>팀 정보를 불러오고 있습니다..</PageTitle>
      )}

      <TeamListContainer>
        {isLoading &&
          Array.from({ length: 3 }).map(() => (
            <SkeletonWrapper>
              <Skeleton width="160px" height="160px" variant="circle" />
              <Skeleton width="140px" height="43px" />
              <SkeletonTags>
                <Skeleton width="60px" height="36px" />
                <Skeleton width="60px" height="36px" />
              </SkeletonTags>
            </SkeletonWrapper>
          ))}

        {teamList &&
          teamList.map((team) => <TeamCard key={team.id} team={team} />)}
        {!isLoading && teamList.length < 4 && <AddTeamCard />}
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
  margin-top: 23.04vh;
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

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 257px;
`;

const SkeletonTags = styled.div`
  display: flex;
  items-center: center;
  gap: 8px;
`;
