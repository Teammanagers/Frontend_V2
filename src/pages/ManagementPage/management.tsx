import { useState } from 'react';
import styled from 'styled-components';
import { transformScheduleData } from '@/entities/management/lib/transformScheduleData.ts';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import { Schedule } from '@/entities/management/ui/Schedule.tsx';
import { TeamInfo } from '@/entities/management/ui/TeamInfo.tsx';
import { TeamMember } from '@/entities/management/ui/TeamMember.tsx';
import { useIsTeamLeader } from '@/entities/team/model/useIsTeamLeader.ts';
import { useTeamById } from '@/entities/team/model/useTeamQueries';
import { IMemberResponse } from '@/shared/types/member.types.ts';
import { PageWrapper } from '@/shared/ui/PageWrapper.tsx';
import {
  ScheduleSkeleton,
  TeamInfoSkeleton,
  TeamMemberSkeleton,
} from '@/widgets/management/ui/ManagementSkeleton.tsx';

export function ManagementPage() {
  const [selectedMembers, setSelectedMembers] = useState<IMemberResponse[]>([]);

  const {
    useScheduleQuery,
    useMyScheduleQuery,
    usePartialScheduleQuery,
    useTeamMemberQuery,
  } = useTeamQueries();
  const { data: schedule, isPending: isScheduleLoading } = useScheduleQuery();
  const { data: members, isPending: isMembersLoading } = useTeamMemberQuery();
  const { data: team, isPending: isTeamLoading } = useTeamById();
  const { data: mySchedule, isPending: isMyScheduleLoading } =
    useMyScheduleQuery();

  const transformedMembers = members?.leader
    ? [members.leader, ...members.members]
    : (members?.members ?? []);

  const teamMemberIds = selectedMembers.map((m) => m.teamMemberId);

  const { data: partialSchedule, isFetching: isPartialScheduleFetching } =
    usePartialScheduleQuery(teamMemberIds);

  const isLoading =
    isScheduleLoading ||
    isTeamLoading ||
    isMembersLoading ||
    isMyScheduleLoading;
  const isReady = !!schedule && !!team && !!members && !!mySchedule;

  const { isTeamLeader } = useIsTeamLeader();

  if (!isReady || isLoading) {
    return (
      <PageWrapper>
        <ManagementContainer>
          <TeamInfoSkeleton />
          <TeamMemberSkeleton />
          <ScheduleSkeleton />
        </ManagementContainer>
      </PageWrapper>
    );
  }
  const transformedMySchedule = transformScheduleData(mySchedule);
  const transformedPartialSchedule = transformScheduleData(partialSchedule);

  return (
    <PageWrapper>
      <ManagementContainer>
        <TeamInfo
          title={team.team.title}
          imageUrl={team.imgUrl}
          teamCode={team.team.code}
          tagList={team.teamTagList}
          isTeamLeader={isTeamLeader}
        />
        <TeamMember members={transformedMembers} />
        <Schedule
          members={transformedMembers}
          schedule={schedule}
          isScheduleLoading={isScheduleLoading}
          partialSchedule={transformedPartialSchedule}
          isPartialScheduleFetching={isPartialScheduleFetching}
          mySchedule={transformedMySchedule}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </ManagementContainer>
    </PageWrapper>
  );
}

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1088px;
  gap: 20px;
`;
