import styled from 'styled-components';
import Modal from '@/shared/components/modal/Modal';
import { INoticeModalProps } from './notice-modal.types';
import { NoticeInputForm, NoticeItem } from '@/entities/notice/ui';

export default function NoticeModal({ isOpen, toggle }: INoticeModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <ContentWrapper>
          <Title>공지사항</Title>
          {Array.from({ length: 10 }).map((_, idx) => (
            <NoticeItem key={`notice-${idx}`} outDated={idx !== 0} />
          ))}
        </ContentWrapper>

        {/* 공지 입력 폼 */}
        <NoticeInputForm toggle={toggle} />
      </ModalWrapper>
    </Modal>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 534px;
  height: 558px;
  padding-top: 24px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  border-radius: 9px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 498px;
  max-height: 437px;
  overflow-y: auto;
`;

const Title = styled.h2`
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
