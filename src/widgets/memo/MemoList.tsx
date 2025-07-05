import { useEffect } from 'react';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import { MemoListView } from '@/widgets/memo/MemoListView.tsx';

export const MemoList = () => {
  const { deleteTarget, moveTarget, openAddModal, openFolderModal, handlers } =
    useMemoUIState();

  const { useMemoListQuery, useFolderListQuery } = useMemoQueries();

  const { data: memos } = useMemoListQuery(1);
  const { data: folders } = useFolderListQuery(3);

  useEffect(() => {
    console.log('메모 effect', memos);
  }, [memos]);

  useEffect(() => {
    console.log('폴더 effect', folders);
  }, [folders]);

  return (
    <MemoListView
      // 조건부 렌더링 스켈레톤 적용 필요
      folders={folders || []}
      memos={memos || []}
      uiState={{
        deleteTarget,
        moveTarget,
        openAddModal,
        openFolderModal,
      }}
      handlers={handlers}
    />
  );
};
