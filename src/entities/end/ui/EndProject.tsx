import { useState } from 'react';
import styled from 'styled-components';
import { EndModal } from '@/entities/end/ui/EndModal.tsx';
import End from '@/shared/assets/end/end.svg?react';
import Quit from '@/shared/assets/end/quit.svg?react';
import Modal from '@/shared/components/modal/Modal.tsx';

interface EndProps {
  teamName: string;
}

export const EndProject = ({ teamName }: EndProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <EndProjectContainer>
      <End />
      <TitleText>프로젝트가 완료되었나요?</TitleText>
      <ContentText>
        프로젝트 종료시, 그동안 고생한 팀원들에게 코멘트를 남길 수 있어요.
      </ContentText>
      <ContentText>이 프로젝트는 내 포트폴리오에 저장돼요.</ContentText>
      <EndBtn onClick={openModal}>
        <QuitIcon />
        <BtnText>프로젝트 종료</BtnText>
      </EndBtn>
      <Modal isOpen={showModal} toggle={closeModal}>
        <EndModal teamName={teamName} onClose={closeModal} />
      </Modal>
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

const TitleText = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 32px 0 10px 0;
`;

const ContentText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 0;
`;

const EndBtn = styled.div`
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

const QuitIcon = styled(Quit)`
  width: 37px;
  height: 37px;
`;

const BtnText = styled(ContentText)`
  color: ${({ theme }) => theme.colors.red};
`;
