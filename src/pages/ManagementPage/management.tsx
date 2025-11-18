import { useState } from 'react';
import styled from 'styled-components';
import { transformScheduleData } from '@/entities/management/lib/transformScheduleData.ts';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import { Schedule } from '@/entities/management/ui/Schedule.tsx';
import { TeamInfo } from '@/entities/management/ui/TeamInfo.tsx';
import { TeamMember } from '@/entities/management/ui/TeamMember.tsx';
import { IMemberResponse } from '@/shared/types/member.types.ts';

export function ManagementPage() {
  const [selectedMembers, setSelectedMembers] = useState<IMemberResponse[]>([]);

  const {
    useTeamByIdQuery,
    useMyScheduleQuery,
    usePartialScheduleQuery,
    useTeamMemberQuery,
  } = useTeamQueries();
  const { data: members, isPending: isMembersLoading } = useTeamMemberQuery();
  const { data: team, isPending: isTeamLoading } = useTeamByIdQuery();
  const { data: mySchedule, isPending: isMyScheduleLoading } =
    useMyScheduleQuery();

  const transformedMembers = members?.leader
    ? [members.leader, ...members.members]
    : (members?.members ?? []);

  const teamMemberIds = selectedMembers.map((m) => m.teamMemberId);

  const { data: schedule } = usePartialScheduleQuery(teamMemberIds);

  // 추후 스켈레톤 적용
  if (isTeamLoading || !team) return <div>로딩중..</div>;
  if (isMyScheduleLoading || !mySchedule) return <div>로딩중...</div>;
  if (isMembersLoading || !members) return <div>로딩중...</div>;

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
