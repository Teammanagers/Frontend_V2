import styled from 'styled-components';
import useTeamMutations from '@/entities/management/model/useTeamMutations.ts';
import { Member } from '@/entities/management/ui/Member.tsx';
import { InfoTitle } from '@/entities/management/ui/TeamInfo.tsx';
import Arrow from '@/shared/assets/common/arrow.svg?react';
import { IMemberResponse } from '@/shared/types/member.types.ts';

interface ITeamMemberProps {
  members: IMemberResponse[];
}

export const TeamMember = ({ members }: ITeamMemberProps) => {
  const { useCreateMemberTagMutation, useDeleteMemberTagMutation } =
    useTeamMutations();
  const { mutate: createMemberTag } = useCreateMemberTagMutation();
  const { mutate: deleteMemberTag } = useDeleteMemberTagMutation();

  const handleAddTag = async (memberId: number, tagName: string) => {
    await createMemberTag({ memberId, tagName });
  };

  const handleDeleteTag = async (memberId: number, tagId: number) => {
    await deleteMemberTag({ tagId, memberId });
  };
  return (
    <MemberContainer>
      <TitleContainer>
        <InfoTitle>Member</InfoTitle>
        <PaginationContainer>
          <ArrowBtn style={{ transform: 'scaleX(-1)', stroke: '#CCCCCC' }} />
          <PagText>1</PagText>
          <PagText style={{ color: '#5A5A5A' }}>/2</PagText>
          <ArrowBtn />
        </PaginationContainer>
      </TitleContainer>
      <MembersContainer>
        {members.map((member: IMemberResponse) => (
          <Member
            key={member.teamMemberId}
            member={member}
            onCreateRoleTag={(tagName) =>
              handleAddTag(member.member.id, tagName)
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

const ArrowBtn = styled(Arrow)`
  width: 24px;
  height: 24px;
  stroke-width: 2px;
  stroke: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

const PagText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  grid-auto-rows: 44px;
  column-gap: 20px;
  row-gap: 12px;
`;
