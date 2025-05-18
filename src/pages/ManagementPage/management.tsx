import styled from 'styled-components';
import { Schedule } from '@/entities/management/ui/Schedule.tsx';
import { TeamInfo } from '@/entities/management/ui/TeamInfo.tsx';
import { TeamMember } from '@/entities/management/ui/TeamMember.tsx';

export function ManagementPage() {
  return (
    <Container>
      <TeamInfo
        id={1}
        title="팀매니저"
        // imageUrl=
        teamCode="ABCD1234"
        // tagList={[
        //   { id: 1, name: '기획' },
        //   { id: 2, name: '디자인' },
        //   { id: 3, name: '개발' },
        // ]}
        onTeamNameChange={(newName) => console.log('팀명 변경:', newName)}
        refreshTeamData={() => console.log('팀 데이터 새로고침')}
      />
      <TeamMember />
      <Schedule />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1088px;
  gap: 20px;
`;
