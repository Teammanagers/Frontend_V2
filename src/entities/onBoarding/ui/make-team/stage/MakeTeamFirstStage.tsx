import styled from 'styled-components';
import {
  MakeTeamFirstStageProps,
  MakeTeamStages,
} from '@/entities/onBoarding/lib/makeTeam/makeTeamStages';
import camera from '@/shared/assets/common/cam-plus.svg?url';
import arrow from '@/shared/assets/common/expand-right-arrow.svg?url';
import { Button } from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import TagForm from '../tag/TagForm';

export default function MakeTeamFirstStage({
  setStage,
}: MakeTeamFirstStageProps) {
  const { setTitle, title } = MakeTeamStages();

  return (
    <MakeTeamWrapper>
      <BackContainer>
        <img src={arrow} width={40} height={40} />
        <BackSpan>프로젝트를 위해 팀을 생성해주세요</BackSpan>
      </BackContainer>
      <TopContainer>
        <ImgContainer>
          <img src={camera} width={163} height={163} />
        </ImgContainer>
      </TopContainer>
      <BottomContainer>
        <Input
          title="Title"
          placeholder="팀명 또는 프로젝트명을 입력해 주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input title="Tag" subTitle="(최대 한글 5자 또는 영어 5글자)">
          <TagForm></TagForm>
        </Input>
        <Button
          size="xxl"
          style="main"
          disabled={title === ''}
          onClick={() => setStage(2)}
        >
          팀 생성 완료
        </Button>
      </BottomContainer>
    </MakeTeamWrapper>
  );
}

const MakeTeamWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 112px;
  display: flex;
`;

const BackSpan = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: black;
`;

const TopContainer = styled.div``;

const BottomContainer = styled.div`
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const ImgContainer = styled.div`
  width: 163px;
  height: 163px;
  border-radius: 38px;
  border: solid 1px rgba(240, 240, 240, 1);
  background-color: white;
`;
