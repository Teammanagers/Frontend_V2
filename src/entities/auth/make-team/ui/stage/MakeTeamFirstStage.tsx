import styled from 'styled-components';
import { Button } from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

export default function MakeTeamFirstStage() {
  return (
    <MakeTeamWrapper>
      <TopContainer>
        <ImgContainer>
          <img />
        </ImgContainer>
        <span></span>
      </TopContainer>
      <div></div>
      <div>
        <Input
          title="Title"
          placeholder="팀명 또는 프로젝트명을 입력해 주세요"
        />
        <Input title="Tag" subTitle="(최대 한글 5자 또는 영어 5글자)">
          <div style={{ height: '200px' }}></div>
        </Input>
        <Button size="xxl" style="main">
          팀 생성 완료
        </Button>
      </div>
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

const TopContainer = styled.div``;

const ImgContainer = styled.div``;
