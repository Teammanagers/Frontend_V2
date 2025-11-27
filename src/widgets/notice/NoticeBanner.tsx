import styled from 'styled-components';
import useNoticeQueries from '@/entities/notice/model/useNoticeQueries';
import { useIsTeamLeader } from '@/entities/team/model/useIsTeamLeader';
import NoticeLoudSpeaker from '@/shared/assets/main/loud-speaker.svg?react';
import { Button } from '@/shared/components/button/Button';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import useToggle from '@/shared/hooks/action/useToggle';
import NoticeModal from '@/widgets/notice/NoticeModal';

function NoticeBanner() {
  const { isOpen, toggle } = useToggle();

  const { useRecentNoticeQuery } = useNoticeQueries();
  const {
    data: recentNotice,
    isPending,
    isError,
    isSuccess,
  } = useRecentNoticeQuery(); // 최신 공지 조회 API 호출

  const { isTeamLeader } = useIsTeamLeader();

  if (isPending) return <Skeleton width={876} height={76} />;

  return (
    <>
      <Container onClick={toggle}>
        <NoticeContent>
          <IconWrapper>
            <NoticeLoudSpeaker />
          </IconWrapper>

          <LatestNotice>
            {isSuccess
              ? recentNotice.notice.content
              : isError
                ? '공지 조회에 실패했습니다'
                : ''}
          </LatestNotice>
        </NoticeContent>

        {isTeamLeader && isSuccess ? (
          <Button size="mini" style="sub">
            공지 수정
          </Button>
        ) : null}
      </Container>

      <NoticeModal isOpen={isOpen} toggle={toggle} />
    </>
  );
}

export { NoticeBanner };

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  width: 876px;
  height: 76px;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const NoticeContent = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  height: 36px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LatestNotice = styled.p`
  max-width: 640px;
  height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
