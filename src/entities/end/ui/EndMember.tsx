import styled from 'styled-components';
import { END_TEXT } from '@/entities/end/end.constants.ts';
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
  const text = END_TEXT.MEMBER;
  return (
    <EndMemberContainer>
      <End />
      <TitleText>{text.TITLE}</TitleText>
      <ContentText>{text.LINE_1}</ContentText>
      <ContentText>{text.LINE_2}</ContentText>
      <EndBtn onClick={onOpenModal}>
        <QuitIcon />
        <BtnText>{text.BUTTON}</BtnText>
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
