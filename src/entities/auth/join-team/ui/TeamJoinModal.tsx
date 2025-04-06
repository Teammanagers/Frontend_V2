import styled from 'styled-components';
import Modal from '@/shared/components/modal/Modal';
interface TeamJoinModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TeamJoinModal({ isOpen, toggle }: TeamJoinModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>모달</ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  width: 552px;
  height: 223px;
  padding: 24px 40px 24px 40px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
