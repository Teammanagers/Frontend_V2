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

  const { useMyScheduleQuery, usePartialScheduleQuery, useTeamMemberQuery } =
    useTeamQueries();
  const { data: members, isPending: isMembersLoading } = useTeamMemberQuery();
  const { data: team, isPending: isTeamLoading } = useTeamById();
  const { data: mySchedule, isPending: isMyScheduleLoading } =
    useMyScheduleQuery();

  const transformedMembers = members?.leader
    ? [members.leader, ...members.members]
    : (members?.members ?? []);

  const teamMemberIds = selectedMembers.map((m) => m.teamMemberId);

  const { data: schedule, isFetching: isScheduleFetching } =
    usePartialScheduleQuery(teamMemberIds);

  const isLoading = isTeamLoading || isMembersLoading || isMyScheduleLoading;
  const isReady = !!team && !!members && !!mySchedule;

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
  const transformedPartialSchedule = transformScheduleData(schedule);

  return (
    <PageWrapper>
      <ManagementContainer>
        <TeamInfo
          title={team.team.title}
          imageUrl={team.imgUrl}
          teamCode={team.team.code}
          tagList={team.teamTagList}
          isLeader={isTeamLeader}
        />
        <TeamMember members={transformedMembers} />
        <Schedule
          members={transformedMembers}
          schedule={transformedPartialSchedule}
          isScheduleFetching={isScheduleFetching}
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
