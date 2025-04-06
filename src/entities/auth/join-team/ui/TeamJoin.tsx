import { useState } from 'react';
import styled from 'styled-components';
import logo from '@/shared/assets/common/logo.svg?url';
import { Button } from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import { Tag } from '@/shared/types/tag.types';
import TeamJoinModal from './TeamJoinModal';
import useToggle from '@/shared/hooks/action/useToggle';

interface SearchResult {
  img: string;
  teamName: string;
  tags: Tag[];
}

export default function TeamJoin() {
  const [isShowResult, setIsShowResult] = useState<boolean>(false);
  const { isOpen, toggle } = useToggle();
  const MOCKTEAM: SearchResult = {
    img: logo,
    teamName: 'UMC 6th 팀매니저',
    tags: [{ name: '기획자' }, { name: '기획자' }],
  };
  return (
    <PageContainer>
      <TeamJoinModal isOpen={isOpen} toggle={toggle} />
      <JoinCotainer>
        <TopContainer>
          <Input
            title="Team Code"
            placeholder="참여하려는 팀 코드를 입력해주세요"
          />
          <Button size="xxl" style="main" onClick={() => setIsShowResult(true)}>
            팀 찾기
          </Button>
        </TopContainer>
        <ResultContainer>
          {isShowResult ? (
            <ContentContainer>
              <ResultTItle>탐색결과</ResultTItle>
              <Result>
                <Img src={MOCKTEAM.img} />
                <ResultBody>
                  <TeamName>{MOCKTEAM.teamName}</TeamName>
                  <Tags>
                    {MOCKTEAM.tags.map((tag) => (
                      <TagEntity>{tag.name}</TagEntity>
                    ))}
                  </Tags>
                </ResultBody>
              </Result>
              <Button size="xxl" style="main" onClick={toggle}>
                팀 참여하기
              </Button>
            </ContentContainer>
          ) : (
            <></>
          )}
        </ResultContainer>
      </JoinCotainer>
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

const JoinCotainer = styled.div`
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
