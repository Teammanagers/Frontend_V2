import styled from 'styled-components';
import { EndProps } from '@/entities/end/end.types.ts';
import {
  BtnText,
  ContentText,
  EndBtn,
  QuitIcon,
  TitleText,
} from '@/entities/end/ui/EndProject.tsx';
import End from '@/shared/assets/end/end-member.svg?react';

export const EndMember = ({ onOpenModal }: EndProps) => {
  return (
    <EndMemberContainer>
      <End />
      <TitleText>프로젝트가 완료되기 전에 팀을 나가시나요?</TitleText>
      <ContentText>팀장의 종료 이전에 팀을 나가면 포트폴리오에</ContentText>
      <ContentText>프로젝트 기록이 남지 않습니다.</ContentText>
      <EndBtn onClick={onOpenModal}>
        <QuitIcon />
        <BtnText>팀 나가기</BtnText>
      </EndBtn>
    </EndMemberContainer>
  );
};

const EndMemberContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
