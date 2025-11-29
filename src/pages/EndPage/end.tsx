import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEndMutations from '@/entities/end/model/useEndMutations.ts';
import { EndMember } from '@/entities/end/ui/EndMember.tsx';
import { EndModal } from '@/entities/end/ui/EndModal.tsx';
import { EndProject } from '@/entities/end/ui/EndProject.tsx';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import { useTeamById } from '@/entities/team/model/useTeamQueries';
import Modal from '@/shared/components/modal/Modal.tsx';
import { getMemberIdFromToken } from '@/shared/lib/utils/getMemberIdFromToken.ts';

export function EndPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const memberId = getMemberIdFromToken();

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
  const leaderId = members?.leader.member.id;
  const isLeader = memberId === leaderId;

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
