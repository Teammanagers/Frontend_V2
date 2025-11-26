import styled from 'styled-components';
import { NoticeInputForm, NoticeList } from '@/entities/notice/ui';
import { useIsTeamLeader } from '@/entities/team/model/useIsTeamLeader';
import Modal from '@/shared/components/modal/Modal';
import { INoticeModalProps } from './notice-modal.types';

export default function NoticeModal({ isOpen, toggle }: INoticeModalProps) {
  const isTeamLeader = useIsTeamLeader();

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalWrapper>
        <ContentWrapper>
          <Title>공지사항</Title>
          <NoticeList isOpen={isOpen} />
        </ContentWrapper>

        {/* 공지 입력 폼 */}
        {isTeamLeader && <NoticeInputForm isOpen={isOpen} toggle={toggle} />}
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
  padding: 24px 18px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  border-radius: 9px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 0;
  gap: 18px;
`;

const Title = styled.h2`
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
