import styled from 'styled-components';
import logo from '@/shared/assets/common/logo.svg?url';
import plus from '@/shared/assets/common/plus-icon.svg?url';
import { Button } from '@/shared/components/button/Button';

export default function SelectTeamPage() {
  const DUMMYLIST = [
    {
      img: logo,
      title: 'UMC 6th 팀매니저',
      tags: ['기획자', '기획자'],
    },
    {
      img: logo,
      title: 'UMC 6th 팀매니저',
      tags: ['기획자', '기획자'],
    },
  ];
  return (
    <SelectTeamContainer>
      <PageTitle>{'000'}님이 현재 진행하고 있는 팀 프로젝트예요!</PageTitle>
      <TeamListContainer>
        {DUMMYLIST.map((team) => (
          <TeamContent>
            <ImgContainer>
              <img src={team.img} width={128} height={80} />
            </ImgContainer>
            <TeamName>{team.title}</TeamName>
            <Tags>
              {team.tags.map((tag) => (
                <Tag>{tag}</Tag>
              ))}
            </Tags>
          </TeamContent>
        ))}
        <TeamContent>
          <PlusImgContainer>
            <img src={plus} width={128} height={80} />
          </PlusImgContainer>
          <TeamName>새로운 팀 생성하기</TeamName>
          <PlusTags>
            <Tag>{null}</Tag>
          </PlusTags>
        </TeamContent>
      </TeamListContainer>
      <BtnContainer>
        <BtnSpan>다른 팀의 초대를 받았나요?</BtnSpan>
        <Button size="large" style="main">
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

const ImgContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 152px;
  border: solid 0.76px rgba(92, 158, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusImgContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 152px;
  border: solid 1px rgba(240, 240, 240, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 48px;
  padding-right: 48px;
`;

const TeamName = styled.span`
  margin-bottom: 6px;
  margin-top: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  background-color: white;
`;

const PlusTags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(92, 158, 255, 1);
  padding-right: 12px;
  padding-left: 12px;
  min-width: 63px;
  height: 36px;
  border-radius: 5px;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
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
