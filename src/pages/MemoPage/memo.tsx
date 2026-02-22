import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { PageWrapper } from '@/shared/ui/PageWrapper.tsx';
import { MemoListContainer } from '@/widgets/memo/MemoListContainer';

export function MemoPage() {
  const { useRootFolderQuery } = useMemoQueries();
  const { data: rootFolder } = useRootFolderQuery();

  if (!rootFolder) return null;

  return (
    <PageWrapper>
      <MemoListContainer rootFolder={rootFolder} />
    </PageWrapper>
  );
}
