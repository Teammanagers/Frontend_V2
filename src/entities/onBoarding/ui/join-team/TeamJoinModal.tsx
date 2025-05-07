import { useState } from 'react';
import styled from 'styled-components';
import Input from '@/entities/onBoarding/lib/input/Input';
import { Button } from '@/shared/components/button/Button';
import Modal from '@/shared/components/modal/Modal';

interface TeamJoinModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TeamJoinModal({ isOpen, toggle }: TeamJoinModalProps) {
  const [showHelperMessage, setShowHelperMessage] = useState<boolean>(false);
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <Input
          title="비밀번호"
          placeholder="참가를 위한 비밀번호를 입력해 주세요."
          inputSize="small"
          helperMessage="비밀번호가 일치하지 않습니다."
          helperMessageColor="red"
          showHelperMessage={showHelperMessage}
        ></Input>
        <Button
          size="xl"
          style="main"
          onClick={() => setShowHelperMessage(true)}
        >
          팀 참가하기
        </Button>
      </ModalWrapper>
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
  gap: 54px;
`;
