import styled from 'styled-components';
import { transformScheduleData } from '@/entities/management/lib/transformScheduleData.ts';
import useTeamQueries from '@/entities/management/model/useTeamQueries.ts';
import { Schedule } from '@/entities/management/ui/Schedule.tsx';
import { TeamInfo } from '@/entities/management/ui/TeamInfo.tsx';
import { TeamMember } from '@/entities/management/ui/TeamMember.tsx';

export function ManagementPage() {
  const {
    useTeamByIdQuery,
    useTeamScheduleQuery,
    useMyScheduleQuery,
    useTeamMemberQuery,
  } = useTeamQueries();
  const { data: team, isPending: isTeamLoading } = useTeamByIdQuery();
  const { data: schedule, isPending: isScheduleLoading } =
    useTeamScheduleQuery();
  const { data: mySchedule, isPending: isMyScheduleLoading } =
    useMyScheduleQuery();
  const { data: members, isPending: isMembersLoading } = useTeamMemberQuery();

  if (isScheduleLoading || !schedule) return <div>로딩중...</div>; // 추후 스켈레톤 적용
  const transformedSchedule = transformScheduleData(schedule);
  // console.log('스케줄: ', transformedSchedule);

  if (isMyScheduleLoading || !mySchedule) return <div>로딩중...</div>; // 추후 스켈레톤 적용
  const transformedMySchedule = transformScheduleData(mySchedule);

  if (isMembersLoading || !members) return <div>로딩중...</div>;
  // console.log('팀 멤버:', members);

  console.log('팀 조회:', team?.team, team?.teamTagList);
  if (isTeamLoading || !team) return <div>로딩중..</div>; // 추후 스켈레톤 적용

  return (
    <Container>
      <TeamInfo
        // id={team.team.id}
        title={team.team.title}
        imageUrl={team.imgUrl}
        teamCode={team.team.code}
        tagList={team.teamTagList}
      />
      <TeamMember members={members} />
      <Schedule
        schedule={transformedSchedule}
        mySchedule={transformedMySchedule}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1088px;
  gap: 20px;
`;
