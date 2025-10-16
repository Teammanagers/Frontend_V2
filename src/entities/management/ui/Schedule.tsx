import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { transformScheduleRequest } from '@/entities/management/lib/transformScheduleData.ts';
import {
  ScheduleProps,
  TimeSlot,
  Weekday,
} from '@/entities/management/management.types.ts';
import useTeamMutations from '@/entities/management/model/useTeamMutations.ts';
import { TagBox, TagText } from '@/entities/management/ui/Member.tsx';
import { NoSchedule } from '@/entities/management/ui/NoSchedule.tsx';
import { RegisterSchedule } from '@/entities/management/ui/RegisterSchedule.tsx';
import { ShowSchedule } from '@/entities/management/ui/ShowSchedule.tsx';
import { InfoTitle } from '@/entities/management/ui/TeamInfo.tsx';
import { TeamMemberDropdown } from '@/entities/management/ui/TeamMemberDropdown.tsx';
import { useSchedule } from '@/features/management/model/useSchedule.ts';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import Plus from '@/shared/assets/common/plus.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';
import useToggle from '@/shared/hooks/action/useToggle.ts';
import { IMemberResponse } from '@/shared/types/member.types.ts';

interface IScheduleProps extends ScheduleProps {
  members: IMemberResponse[];
}

export const Schedule = ({ members, schedule, mySchedule }: IScheduleProps) => {
  console.log('멤버?: ', members);

  const { useRegisterScheduleMutation } = useTeamMutations();
  const { mutate: registerSchedule } = useRegisterScheduleMutation();

  const { isOpen, setIsOpen, toggle } = useToggle();

  const [selectedMembers, setSelectedMembers] = useState<IMemberResponse[]>([]);

  useEffect(() => {
    if (members?.length) {
      setSelectedMembers(members);
    }
  }, [members]);

  const handleAddMember = (member: IMemberResponse) => {
    setSelectedMembers((prev) => [...prev, member]);
    toggle();
  };

  const handleRemoveMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.teamMemberId !== id));
  };

  const handleSubmit = (weeklyTimes: Record<Weekday, TimeSlot[]>) => {
    const requestBody = transformScheduleRequest(weeklyTimes);
    console.log('스케줄 등록 요청: ', requestBody);
    registerSchedule(requestBody);
  };

  const {
    showRegister,
    weeklyTimes,
    changeTime,
    reset,
    submit,
    toggleRegister,
  } = useSchedule(mySchedule, handleSubmit);

  return (
    <Container>
      <InfoTitle>Schedule</InfoTitle>
      {showRegister ? (
        <RegisterSchedule
          weeklyTimes={weeklyTimes}
          onTimeChange={changeTime}
          onReset={reset}
          onSubmit={submit}
        />
      ) : (
        <>
          <ScheduleContainer>
            <PeopleContainer>
              <PeopleLabelContainer>
                <Text>현재 참여자들의 가능 시간: </Text>
                <TagContainer>
                  {selectedMembers.map((m) => (
                    <TagBox key={m.teamMemberId}>
                      <TagText>{m.member.name}</TagText>
                      <DeleteBtn
                        width={20}
                        height={20}
                        onClick={() => handleRemoveMember(m.teamMemberId)}
                      />
                    </TagBox>
                  ))}
                  <ButtonWrapper>
                    <AddBtn onClick={toggle}>
                      <Plus stroke="#5C9EFF" strokeWidth={1} />
                    </AddBtn>
                    {isOpen && (
                      <DropdownWrapper>
                        <TeamMemberDropdown
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          toggle={toggle}
                          members={members}
                          selectedMembers={selectedMembers}
                          onAddMember={handleAddMember}
                        />
                      </DropdownWrapper>
                    )}
                  </ButtonWrapper>
                </TagContainer>
              </PeopleLabelContainer>
            </PeopleContainer>
            <Button size="mini" style="main" onClick={toggleRegister}>
              내 스케줄 등록
            </Button>
          </ScheduleContainer>
          {Object.values(schedule).some((day) => day.value.length > 0) ? (
            <ShowSchedule schedule={schedule} />
          ) : (
            <NoSchedule />
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScheduleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const PeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PeopleLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Text = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.black};
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DeleteBtn = styled(Delete)`
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
`;

const AddBtn = styled.button`
  display: flex;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  background: white;
  justify-content: center;
  align-items: center;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  z-index: 20;
`;
