import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import LoadingSpinner from '@/shared/components/loadingSpinner/loadingSpinner.tsx';
import { MemoListContainer } from '@/widgets/memo/MemoListContainer';

export function MemoPage() {
  const { useRootFolderQuery } = useMemoQueries();
  const { data: rootFolder, isPending } = useRootFolderQuery();

  if (isPending) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <LoadingSpinner size={48} />
      </div>
    );
  }

  if (rootFolder) {
    return <MemoListContainer rootFolder={rootFolder} />;
  }

  return null;
}
