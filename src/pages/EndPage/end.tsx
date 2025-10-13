import { useState } from 'react';
import { EndMember } from '@/entities/end/ui/EndMember.tsx';
import { EndModal } from '@/entities/end/ui/EndModal.tsx';
import { EndProject } from '@/entities/end/ui/EndProject.tsx';
import Modal from '@/shared/components/modal/Modal.tsx';

export function EndPage() {
  // 팀 관리 PR 머지 후 API에서 teamName, isLeader 받아온 뒤 수정
  const teamName = '팀 매니저';
  const isLeader = false;

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const EndView = isLeader ? EndProject : EndMember;

  return (
    <>
      <EndView onOpenModal={openModal} />
      <Modal isOpen={showModal} toggle={closeModal}>
        <EndModal
          teamName={teamName}
          isLeader={isLeader}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}
