import { useState } from 'react';
import styled from 'styled-components';
import { EndModal } from '@/entities/end/ui/EndModal.tsx';
import {
  BtnText,
  ContentText,
  EndBtn,
  QuitIcon,
  TitleText,
} from '@/entities/end/ui/EndProject.tsx';
import End from '@/shared/assets/end/end-member.svg?react';
import Modal from '@/shared/components/modal/Modal.tsx';

interface EndProps {
  teamName: string;
}

export const EndMember = ({ teamName }: EndProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <EndMemberContainer>
      <End />
      <TitleText>프로젝트가 완료되기 전에 팀을 나가시나요?</TitleText>
      <ContentText>팀장의 종료 이전에 팀을 나가면 포트폴리오에</ContentText>
      <ContentText>프로젝트 기록이 남지 않습니다.</ContentText>
      <EndBtn onClick={openModal}>
        <QuitIcon />
        <BtnText>팀 나가기</BtnText>
      </EndBtn>
      <Modal isOpen={showModal} toggle={closeModal}>
        <EndModal teamName={teamName} onClose={closeModal} />
      </Modal>
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
