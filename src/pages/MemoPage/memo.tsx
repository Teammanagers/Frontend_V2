import styled from 'styled-components';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import LoadingSpinner from '@/shared/components/loadingSpinner/loadingSpinner.tsx';
import { PageWrapper } from '@/shared/ui/PageWrapper.tsx';
import { MemoListContainer } from '@/widgets/memo/MemoListContainer';

export function MemoPage() {
  const { useRootFolderQuery } = useMemoQueries();
  const { data: rootFolder, isPending } = useRootFolderQuery();

  if (isPending) {
    return (
      <Wrapper>
        <LoadingSpinner size={48} />
      </Wrapper>
    );
  }

  if (!rootFolder) return null;

  return (
    <PageWrapper>
      <MemoListContainer rootFolder={rootFolder} />
    </PageWrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 74px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
