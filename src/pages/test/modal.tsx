import Modal from '@/shared/components/modal/Modal';
import useToggle from '@/shared/hooks/useToggle';
import styled from 'styled-components';

export function ModalTestPage() {
  const { isOpen, toggle } = useToggle();

  return (
    <div>
      <button onClick={toggle}>Modal Open</button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalWrapper>
          <p>hi</p>
          <ClosedBtn onClick={toggle}>close</ClosedBtn>
        </ModalWrapper>
      </Modal>
    </div>
  );
}

const ModalWrapper = styled.div`
  position: relative;
  width: 552px;
  height: 168px;
`;

const ClosedBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;
