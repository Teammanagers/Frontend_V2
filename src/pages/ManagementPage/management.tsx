import { useState } from 'react';
import styled from 'styled-components';
import { transformScheduleData } from '@/entities/management/lib/transformScheduleData.ts';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import { Schedule } from '@/entities/management/ui/Schedule.tsx';
import { TeamInfo } from '@/entities/management/ui/TeamInfo.tsx';
import { TeamMember } from '@/entities/management/ui/TeamMember.tsx';
import { useTeamById } from '@/entities/team/model/useTeamQueries';
import { IMemberResponse } from '@/shared/types/member.types.ts';
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

  if (!isReady || isLoading) {
    return (
      <Wrapper>
        <ManagementContainer>
          <TeamInfoSkeleton />
          <TeamMemberSkeleton />
          <ScheduleSkeleton />
        </ManagementContainer>
      </Wrapper>
    );
  }
  const transformedMySchedule = transformScheduleData(mySchedule);
  const transformedPartialSchedule = transformScheduleData(schedule);

  return (
    <Wrapper>
      <ManagementContainer>
        <TeamInfo
          title={team.team.title}
          imageUrl={team.imgUrl}
          teamCode={team.team.code}
          tagList={team.teamTagList}
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1088px;
  gap: 20px;
`;
