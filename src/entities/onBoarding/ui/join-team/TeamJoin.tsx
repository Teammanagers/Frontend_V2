import { useState } from 'react';
import styled from 'styled-components';
import Input from '@/entities/onBoarding/lib/input/Input';
import { Button } from '@/shared/components/button/Button';
import TeamJoinModal from './TeamJoinModal';
import { JoinTeam } from '../../lib/joinTeam/teamJoin';
import useJoinTeam from '../../model/useJoinTeam';

export default function TeamJoin() {
  const { isOpen, toggle, isShowResult, setIsShowResult } = JoinTeam();

  const { useSearchTeamMutation } = useJoinTeam();
  const [inputValue, setInputValue] = useState<string>('');
  const [teamId, setTeamId] = useState<number | null>(null);
  const {
    data: teamData,
    isPending,
    isError,
    mutate: searchTeam,
  } = useSearchTeamMutation;

  const handleSearchTeam = () => {
    if (inputValue.trim()) {
      setIsShowResult(true);
      searchTeam(inputValue);
    }
  };

  const handleJoinBtn = () => {
    toggle();
    setTeamId(teamData?.team.id);
  };

  return (
    <PageContainer>
      <TeamJoinModal isOpen={isOpen} toggle={toggle} teamId={teamId} />
      <JoinContainer>
        <TopContainer>
          <Input
            title="Team Code"
            placeholder="참여하려는 팀 코드를 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            size="xxl"
            style="main"
            onClick={handleSearchTeam}
            disabled={!inputValue.trim() || isPending}
          >
            {isPending ? '검색 중...' : '팀 찾기'}
          </Button>
        </TopContainer>
        <ResultContainer>
          {isShowResult && (
            <ContentContainer>
              <ResultTItle>탐색결과</ResultTItle>
              {isPending ? (
                <div>검색 중...</div>
              ) : isError ? (
                <ResultNull>
                  <ResultNullSpan $textColor="red">
                    해당 코드와 일치하는 팀이 없습니다.
                  </ResultNullSpan>
                  <ResultNullSpan $textColor="black">
                    코드를 다시 한번 확인해 주세요.
                  </ResultNullSpan>
                </ResultNull>
              ) : teamData ? (
                <Result>
                  <Img src={teamData.imgUrl || '/default-team-image.png'} />
                  <ResultBody>
                    <TeamName>{teamData.team.title}</TeamName>
                    <Tags>
                      {teamData.teamTagList?.map((tag, index: number) => (
                        <TagEntity key={index}>{tag.name}</TagEntity>
                      ))}
                    </Tags>
                  </ResultBody>
                </Result>
              ) : null}
            </ContentContainer>
          )}
          {teamData && (
            <Button size="xxl" style="main" onClick={handleJoinBtn}>
              팀 참여하기
            </Button>
          )}
        </ResultContainer>
      </JoinContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 262px;
  gap: 50px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Img = styled.img`
  background-color: white;
  width: 74px;
  height: 74px;
  border-radius: 100px;
  border: 1px solid rgba(92, 158, 255, 1);
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 178px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ResultTItle = styled.span`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

const Result = styled.div`
  display: flex;
  gap: 23px;
  align-items: center;
  height: 82px;
  margin-bottom: 16px;
`;

const ResultNull = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 23px;
  align-items: center;
  margin-bottom: 16px;
  justify-content: center;
`;

const ResultNullSpan = styled.span<{ $textColor: string }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${(props) => props.$textColor};
`;

const ResultBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TeamName = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
`;

const Tags = styled.div`
  display: flex;
  gap: 13px;
`;

const TagEntity = styled.div`
  height: 28px;
  padding: 8px;
  background-color: white;
  text-align: center;
  color: rgba(92, 158, 255, 1);
  font-size: 12px;
  line-height: 150%;
  font-weight: 500;
  border-radius: 3px;
`;
