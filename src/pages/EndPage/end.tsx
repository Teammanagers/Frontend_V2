import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEndMutations from '@/entities/end/model/useEndMutations.ts';
import { EndMember } from '@/entities/end/ui/EndMember.tsx';
import { EndModal } from '@/entities/end/ui/EndModal.tsx';
import { EndProject } from '@/entities/end/ui/EndProject.tsx';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import { useIsTeamLeader } from '@/entities/team/model/useIsTeamLeader.ts';
import { useTeamById } from '@/entities/team/model/useTeamQueries';
import Modal from '@/shared/components/modal/Modal.tsx';

export function EndPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isTeamLeader } = useIsTeamLeader();

  const { useTeamMemberQuery } = useTeamQueries();
  const { data: team, isPending: isTeamLoading } = useTeamById();
  const { data: members, isPending: isMembersLoading } = useTeamMemberQuery();

  const { useWithdrawTeamMutation, useCompleteTeamMutation } =
    useEndMutations();
  const { mutate: withdrawTeam } = useWithdrawTeamMutation();
  const { mutate: completeTeam } = useCompleteTeamMutation();

  if (isTeamLoading || isMembersLoading || !team || !members)
    return <div>로딩중..</div>;
  const teamName = team?.team?.title ?? '';

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleEnd = () => {
    if (isTeamLeader) {
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
      {isTeamLeader ? (
        <EndProject onOpenModal={handleOpenModal} />
      ) : (
        <EndMember onOpenModal={handleOpenModal} />
      )}
      <Modal isOpen={showModal} toggle={handleCloseModal}>
        <EndModal
          teamName={teamName}
          isTeamLeader={isTeamLeader}
          onClose={handleCloseModal}
          onEnd={handleEnd}
        />
      </Modal>
    </>
  );
}
