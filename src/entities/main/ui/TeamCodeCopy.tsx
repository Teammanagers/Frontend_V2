import styled from 'styled-components';
import { useTeamById } from '@/entities/team/model/useTeamQueries';

function TeamCodeCopy() {
  const { data } = useTeamById();

  const handleCopyClipBoard = () => {
    if (data?.team.code) {
      navigator.clipboard.writeText(data?.team.code);
      alert('팀 코드가 클립보드에 복사되었습니다.');
    } else {
      alert('팀 코드를 복사하는데 실패했습니다.');
    }
  };

  return (
    <Container>
      <TeamCode>{data?.team.code}</TeamCode>
      <Button onClick={handleCopyClipBoard}>팀 코드복사</Button>
    </Container>
  );
}

export { TeamCodeCopy };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  width: 163px;
  height: 76px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.subLightBlue};
`;

const TeamCode = styled.p`
  width: 89px;
  height: 27px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const Button = styled.button`
  width: 83px;
  height: 32px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainBlue};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3c8bff;
    transition: background-color 0.3s;
    box-shadow: 0 1px 4px 0 rgba(60, 139, 255, 0.06);
  }
`;
