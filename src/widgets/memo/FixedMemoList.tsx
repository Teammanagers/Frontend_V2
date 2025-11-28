import styled from 'styled-components';
import { useFixedMemoList } from '@/entities/memo/model/useMemoQueries';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { Memo } from './Memo';

export default function FixedMemoList() {
  const { data: memos, isPending, isSuccess } = useFixedMemoList();
  const { handlers } = useMemoUIState();

  if (isPending) return <Skeleton width={518} height={222} />;

  return (
    <Container>
      {isSuccess &&
        //TODO: 임시로 2개만 고정메모 노출, 추후 캐러셀 형태로 변경 필요
        memos?.slice(0, 2).map((memo) => (
          <>
            <Memo
              key={memo.memoDto.id}
              size="small"
              memo={{
                id: memo.memoDto.id,
                title: memo.memoDto.title,
                content: memo.memoDto.content,
                tags: memo.memoTagList.map((t) => t.name),
                isFixed: memo.memoDto.isFixed,
              }}
              onDeleteRequest={(id) =>
                handlers.handleDeleteRequest({
                  type: 'memo',
                  id,
                  title: memo.memoDto.title,
                })
              }
              onMoveRequest={(id) =>
                handlers.handleMoveRequest({
                  type: 'memo',
                  id,
                  title: memo.memoDto.title,
                })
              }
            />
          </>
        ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  width: 518px;
  height: 210px;
`;
