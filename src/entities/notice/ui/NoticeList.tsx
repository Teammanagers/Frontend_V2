import styled from 'styled-components';
import useNoticeQueries from '@/entities/notice/model/useNoticeQueries';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { NoticeItem } from './NoticeItem';

function NoticeList({ isOpen }: { isOpen: boolean }) {
  const { useNoticeListQuery } = useNoticeQueries();
  const {
    data: noticeList,
    isPending,
    isError,
    isSuccess,
  } = useNoticeListQuery(isOpen); // 공지 리스트 불러오기

  return (
    <Container>
      {isPending &&
        Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={`notice-skeleton-${idx}`} width={498} height={58} />
        ))}

      {isSuccess &&
        noticeList.map((notice, idx) => (
          <NoticeItem
            key={`notice-${notice.notice.id}`}
            outDated={idx !== 0} // 0번 인덱스가 아닌 공지는 모두 만료된 공지로 간주
            notice={notice}
          />
        ))}

      {isError && <p>공지 조회에 실패했습니다</p>}
    </Container>
  );
}

export { NoticeList };

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 498px;
  min-height: 390px;
  overflow-y: auto;
`;
