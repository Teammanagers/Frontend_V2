import { useEffect } from 'react';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useFolderStore } from '@/features/memo/model/folderStore.ts';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import { MemoListView } from '@/widgets/memo/MemoListView.tsx';

export const MemoList = () => {
  const {
    deleteTarget,
    moveTarget,
    openAddModal,
    openFolderModal,
    editFolder,
    handlers,
  } = useMemoUIState();

  const { useRootFolderQuery, useFolderListQuery, useMemoListQuery } =
    useMemoQueries();

  const { setCurrentFolderId, currentFolderId } = useFolderStore();

  const { data: rootFolder } = useRootFolderQuery(3); // 팀 ID 동적으로 변경 필요

  useEffect(() => {
    if (rootFolder?.id) {
      setCurrentFolderId(rootFolder.id);
    }
    console.log('폴더 아이디:', rootFolder?.id);
  }, [rootFolder]);

  const { data: memos } = useMemoListQuery(currentFolderId ?? 0);
  // const { data: memos } = useMemoListQuery(3);
  const { data: folders } = useFolderListQuery(currentFolderId ?? 0);

  useEffect(() => {
    console.log('메모 effect', memos);
  }, [memos]);

  useEffect(() => {
    console.log('폴더 effect', folders);
  }, [folders]);

  // 메모 고정에 따른 정렬
  const sortedMemos = [...(memos ?? [])].sort((a, b) => {
    if (a.isFixed === b.isFixed) return 0;
    return a.isFixed ? -1 : 1;
  });

  return (
    <MemoListView
      // 조건부 렌더링 스켈레톤 적용 필요
      folders={folders || []}
      memos={sortedMemos || []}
      uiState={{
        deleteTarget,
        moveTarget,
        openAddModal,
        openFolderModal,
        editFolder,
      }}
      handlers={handlers}
    />
  );
};
