import styled from 'styled-components';
import { ScheduleProps } from '@/entities/management/management.types.ts';
import { TagBox, TagText } from '@/entities/management/ui/Member.tsx';
import { NoSchedule } from '@/entities/management/ui/NoSchedule.tsx';
import { ShowSchedule } from '@/entities/management/ui/ShowSchedule.tsx';
import { InfoTitle } from '@/entities/management/ui/TeamInfo.tsx';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import Plus from '@/shared/assets/common/plus.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';

export const Schedule = ({ schedule }: ScheduleProps) => {
  console.log(schedule);
  return (
    <Container>
      <InfoTitle>Schedule</InfoTitle>
      <ScheduleContainer>
        <PeopleContainer>
          <PeopleLabelContainer>
            <Text>현재 참여자들의 가능 시간: </Text>
            <TagContainer>
              {/* 사람 태그 부분 */}
              <TagBox>
                <TagText>기획자</TagText>
                <DeleteBtn width={20} height={20} />
              </TagBox>
              <TagBox>
                <TagText>기획자</TagText>
                <DeleteBtn width={20} height={20} />
              </TagBox>
              <TagBox>
                <TagText>기획자</TagText>
                <DeleteBtn width={20} height={20} />
              </TagBox>
              <TagBox>
                <TagText>기획자</TagText>
                <DeleteBtn width={20} height={20} />
              </TagBox>
              <AddBtn>
                <Plus stroke="#5C9EFF" strokeWidth={1} />
              </AddBtn>
            </TagContainer>
          </PeopleLabelContainer>
        </PeopleContainer>
        <Button size="mini" style="main">
          내 스케줄 등록
        </Button>
      </ScheduleContainer>
      {Object.values(schedule).some((day) => day.value.length > 0) ? (
        <ShowSchedule schedule={schedule} />
      ) : (
        <NoSchedule />
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

const AddBtn = styled.button`
  display: flex;
  width: 28px;
  height: 28px;
  border-radius: 3px;
  background: white;
  justify-content: center;
  align-items: center;
`;
