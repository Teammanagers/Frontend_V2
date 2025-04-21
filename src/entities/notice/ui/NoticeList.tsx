import styled from 'styled-components';
import useNoticeQueries from '@/entities/notice/model/useNoticeQueries';
import { NoticeItem } from './NoticeItem';

function NoticeList({ isOpen }: { isOpen: boolean }) {
  const { useNoticeListQuery } = useNoticeQueries();
  const { data: noticeList, isPending, isSuccess } = useNoticeListQuery(isOpen); // 공지 리스트 불러오기

  return (
    <Container>
      {isSuccess &&
        noticeList.map((notice, idx) => (
          <NoticeItem
            key={`notice-${notice.notice.id}`}
            outDated={idx !== 0} // 0번 인덱스가 아닌 공지는 모두 만료된 공지로 간주
            notice={notice}
          />
        ))}
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
