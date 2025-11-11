import { useState } from 'react';
import styled from 'styled-components';
import { MEMBERS_PER_PAGE } from '@/entities/management/management.constants.ts';
import useTeamMutations from '@/entities/management/model/useTeamMutations.ts';
import { Member } from '@/entities/management/ui/Member.tsx';
import { InfoTitle } from '@/entities/management/ui/TeamInfo.tsx';
import Arrow from '@/shared/assets/common/arrow.svg?react';
import { IMemberResponse } from '@/shared/types/member.types.ts';

interface ITeamMemberProps {
  members: IMemberResponse[];
}

export const TeamMember = ({ members }: ITeamMemberProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(members.length / MEMBERS_PER_PAGE);

  const {
    useCreateMemberTagMutation,
    useEditMemberTagMutation,
    useDeleteMemberTagMutation,
  } = useTeamMutations();
  const { mutate: createMemberTag } = useCreateMemberTagMutation();
  const { mutate: editMemberTag } = useEditMemberTagMutation();
  const { mutate: deleteMemberTag } = useDeleteMemberTagMutation();

  const handleAddTag = (memberId: number, tagName: string) => {
    createMemberTag({ memberId, tagName });
  };

  const handleEditTag = (tagId: number, memberId: number, tagName: string) => {
    editMemberTag({ tagId, memberId, tagName });
  };

  const handleDeleteTag = (memberId: number, tagId: number) => {
    deleteMemberTag({ tagId, memberId });
  };

  const paginatedMembers = members.slice(
    (currentPage - 1) * MEMBERS_PER_PAGE,
    currentPage * MEMBERS_PER_PAGE,
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <MemberContainer>
      <TitleContainer>
        <InfoTitle>Member</InfoTitle>
        <PaginationContainer>
          <ArrowBtn
            onClick={handlePrev}
            $disabled={currentPage === 1}
            style={{ transform: 'scaleX(-1)' }}
          />
          <PagText>{currentPage}</PagText>
          <TotalPageText>{`/${totalPages}`}</TotalPageText>
          <ArrowBtn
            onClick={handleNext}
            $disabled={currentPage === totalPages}
          />
        </PaginationContainer>
      </TitleContainer>
      <MembersContainer>
        {paginatedMembers.map((member: IMemberResponse) => (
          <Member
            key={member.teamMemberId}
            member={member}
            onCreateRoleTag={(tagName) =>
              handleAddTag(member.member.id, tagName)
            }
            onEditRoleTag={(tagId: number, tagName: string) =>
              handleEditTag(tagId, member.member.id, tagName)
            }
            onDeleteRoleTag={(tagId) =>
              handleDeleteTag(member.member.id, tagId)
            }
          />
        ))}
      </MembersContainer>
    </MemberContainer>
  );
};

const MemberContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  padding: 0 7px 0 7px;
`;

const ArrowBtn = styled(Arrow)<{ $disabled: boolean }>`
  width: 24px;
  height: 24px;
  stroke-width: 2px;
  stroke: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.silver : theme.colors.black};
  cursor: pointer;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const PagText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const TotalPageText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  grid-auto-rows: 44px;
  column-gap: 20px;
  row-gap: 12px;
  min-height: calc(44px * 3 + 12px * 2);
`;
