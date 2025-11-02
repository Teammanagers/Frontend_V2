import styled from 'styled-components';
import { END_TEXT } from '@/entities/end/end.constants.ts';
import { EndProps } from '@/entities/end/end.types.ts';
import End from '@/shared/assets/end/end-team.svg?react';
import Quit from '@/shared/assets/end/quit.svg?react';

export const EndProject = ({ onOpenModal }: EndProps) => {
  const text = END_TEXT.PROJECT;

  return (
    <EndProjectContainer>
      <End />
      <TitleText>{text.TITLE}</TitleText>
      <ContentText>{text.LINE_1}</ContentText>
      <ContentText>{text.LINE_2}</ContentText>
      <EndBtn onClick={onOpenModal}>
        <QuitIcon />
        <BtnText>{text.BUTTON}</BtnText>
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
