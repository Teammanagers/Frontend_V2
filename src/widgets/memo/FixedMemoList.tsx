import styled from 'styled-components';
import { PATHS } from '@/app/routes/paths.ts';
import FallbackCard from '@/entities/main/ui/FallbackCard';
import { useFixedMemoList } from '@/entities/memo/model/useMemoQueries';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';
import { Memo } from './Memo';

export default function FixedMemoList() {
  const teamNavigate = useTeamNavigate();
  const { data: memos, isPending, isSuccess, isError } = useFixedMemoList();
  const { handlers } = useMemoUIState();

  if (isPending) return <Skeleton width="518px" height="222px" />;
  if (isError) return <FallbackCard>메모를 불러올 수 없습니다.</FallbackCard>;
  if (isSuccess && memos.length === 0)
    return <FallbackCard>고정된 메모가 없습니다.</FallbackCard>;

  return (
    <Container>
      {isSuccess &&
        //TODO: 임시로 2개만 고정메모 노출, 추후 캐러셀 형태로 변경 필요
        memos?.slice(0, 2).map((memo) => (
          <Memo
            key={memo.memoDto.id}
            size="small"
            memo={{
              id: memo.memoDto.id,
              title: memo.memoDto.title,
              content: memo.memoDto.content,
              tags: memo.memoTagList.map((t) => t.name),
              isFixed: memo.memoDto.isFixed,
              createdBy: memo.memoDto.createdBy,
              createdByName: memo.memoDto.createdByName,
            }}
            onMemoClick={() =>
              teamNavigate(
                (teamId) =>
                  `${PATHS.MEMO(teamId)}/${memo.memoDto.folderId}/${memo.memoDto.id}`,
              )
            }
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
