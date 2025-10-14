import styled from 'styled-components';
import { Button } from '@/shared/components/button/Button.tsx';

interface ModalStateProps {
  teamName: string;
  isLeader: boolean;
  onClose: () => void;
  onEnd: () => void;
}

export const EndModal = ({
  teamName,
  isLeader,
  onClose,
  onEnd,
}: ModalStateProps) => {
  return (
    <ModalContainer>
      {isLeader ? (
        <>
          <TitleText>
            <TeamName>'{teamName}'</TeamName>를 정말 종료하실건가요?
          </TitleText>
          <ContentText>
            종료된 프로젝트는 마이페이지에서 확인 가능합니다
          </ContentText>
          <BtnContainer>
            <Button size="small" style="main" onClick={onClose}>
              유지하기
            </Button>
            <Button size="small" style="red">
              종료하기
            </Button>
          </BtnContainer>
        </>
      ) : (
        <>
          <TitleText>
            <TeamName>'{teamName}'</TeamName>를 정말 나가실건가요?
          </TitleText>
          <ContentText>
            팀에서 나가기 전, 다시 한 번 확인 해 주세요.
          </ContentText>
          <BtnContainer>
            <Button size="small" style="main" onClick={onClose}>
              유지하기
            </Button>
            <Button size="small" style="red" onClick={onEnd}>
              나가기
            </Button>
          </BtnContainer>
        </>
      )}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 352px;
  height: 162px;
  background: white;
  border-radius: 6px;
  gap: 4px;
  box-shadow: 1.52px 3.04px 9.12px rgba(0, 0, 0 0.08);
`;

const TitleText = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  line-height: 150%;
  margin-top: 32px;
`;

const TeamName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  line-height: 150%;
`;

const ContentText = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const BtnContainer = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 4px;
`;
