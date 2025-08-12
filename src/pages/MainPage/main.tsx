import { TeamCodeCopy } from '@/entities/main/ui';
import { TodoList } from '@/widgets/main';
import { NoticeBanner } from '@/widgets/notice/NoticeBanner';
import RecentResourceList from '@/widgets/resource/RecentResourceList';
import { UpcomingEventList } from '@/widgets/upcoming-event';
import styled from 'styled-components';

export function MainPage() {
  return (
    <Container>
      <MainHeader>
        {/* 공지 사항 배너 */}
        <NoticeBanner />
        {/* 팀 코드 복사 */}
        <TeamCodeCopy />
      </MainHeader>

      <SectionWrapper>
        <UpcomingScheduleListWrapper>
          <UpcomingEventList />
        </UpcomingScheduleListWrapper>
        <TodoList />
        <RecentResourceList />
      </SectionWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 74px;
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 32px;
  width: 1056px;
`;

const UpcomingScheduleListWrapper = styled.div`
  width: 518px;
`;
