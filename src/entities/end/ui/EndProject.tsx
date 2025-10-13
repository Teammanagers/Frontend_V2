import styled from 'styled-components';
import { EndProps } from '@/entities/end/end.types.ts';
import End from '@/shared/assets/end/end-team.svg?react';
import Quit from '@/shared/assets/end/quit.svg?react';

export const EndProject = ({ onOpenModal }: EndProps) => {
  return (
    <EndProjectContainer>
      <End />
      <TitleText>프로젝트가 완료되었나요?</TitleText>
      <ContentText>
        프로젝트 종료시, 그동안 고생한 팀원들에게 코멘트를 남길 수 있어요.
      </ContentText>
      <ContentText>이 프로젝트는 내 포트폴리오에 저장돼요.</ContentText>
      <EndBtn onClick={onOpenModal}>
        <QuitIcon />
        <BtnText>프로젝트 종료</BtnText>
      </EndBtn>
    </EndProjectContainer>
  );
};

const EndProjectContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 32px 0 10px 0;
`;

export const ContentText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0;
`;

export const EndBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 118px;
  height: 95px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.red};
  margin-top: 19px;
  cursor: pointer;
  background: white;
`;

export const QuitIcon = styled(Quit)`
  width: 37px;
  height: 37px;
`;

export const BtnText = styled(ContentText)`
  color: ${({ theme }) => theme.colors.red};
`;
