import styled from 'styled-components';
import { TagBox, TagText } from '@/entities/management/ui/Member.tsx';
import { InfoTitle } from '@/entities/management/ui/TeamInfo.tsx';
import Delete from '@/shared/assets/common/delete-tag.svg?react';
import Plus from '@/shared/assets/common/plus.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';

export const Schedule = () => {
  return (
    <Container>
      <ScheduleContainer>
        <InfoTitle>Schedule</InfoTitle>
        <PeopleContainer>
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
        </PeopleContainer>
      </ScheduleContainer>
      <Button size="mini" style="main">
        내 스케줄 등록
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: blanchedalmond;
`;
const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: darkseagreen;
`;

const PeopleContainer = styled.div`
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
  background: cornflowerblue;
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
