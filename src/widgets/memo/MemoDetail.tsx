import { useParams } from 'react-router-dom';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { PageWrapper } from '@/shared/ui/PageWrapper.tsx';
import { MemoDetailView } from '@/widgets/memo/MemoDetailView.tsx';

export function MemoDetail() {
  const { memoId } = useParams<{ memoId: string }>();

  const { useMemoDetailQuery } = useMemoQueries();
  const { data: memoDetail, isPending } = useMemoDetailQuery(Number(memoId));
  console.log(memoDetail);

  if (isPending) return null;
  if (!memoDetail) return null;

  return (
    <PageWrapper>
      <MemoDetailView
        title={memoDetail.memoDto.title}
        content={memoDetail.memoDto.content}
        memoTagList={memoDetail.memoTagList.map((tag) => ({ name: tag.name }))}
        authorName={memoDetail.memoDto.createdByName}
      />
    </PageWrapper>
  );
}
