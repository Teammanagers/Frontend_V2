import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEndMutations from '@/entities/end/model/useEndMutations.ts';
import { EndMember } from '@/entities/end/ui/EndMember.tsx';
import { EndModal } from '@/entities/end/ui/EndModal.tsx';
import { EndProject } from '@/entities/end/ui/EndProject.tsx';
import Modal from '@/shared/components/modal/Modal.tsx';

export function EndPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 팀 관리 PR 머지 후 API에서 teamName, isLeader 받아온 뒤 수정
  const teamName = '팀 매니저';
  const isLeader = true;

  const { useWithdrawTeamMutation, useCompleteTeamMutation } =
    useEndMutations();
  const { mutate: withdrawTeam } = useWithdrawTeamMutation();
  const { mutate: completeTeam } = useCompleteTeamMutation();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleEnd = () => {
    if (isLeader) {
      completeTeam(undefined, {
        onSuccess: () => navigate(`/select-team`, { replace: true }),
      });
    } else {
      withdrawTeam(undefined, {
        onSuccess: () => {
          navigate(`/select-team`, { replace: true });
        },
      });
    }
    handleCloseModal();
  };

  return (
    <>
      {isLeader ? (
        <EndProject onOpenModal={handleOpenModal} />
      ) : (
        <EndMember onOpenModal={handleOpenModal} />
      )}
      <Modal isOpen={showModal} toggle={handleCloseModal}>
        <EndModal
          teamName={teamName}
          isLeader={isLeader}
          onClose={handleCloseModal}
          onEnd={handleEnd}
        />
      </Modal>
    </>
  );
}
