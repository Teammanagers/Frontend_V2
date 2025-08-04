import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
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
  const { data: rootFolder } = useRootFolderQuery(3); // 팀 ID 동적으로 변경 필요
  const { folderId } = useParams<{ folderId: string }>();

  const [currentFolderId, setCurrentFolderId] = useState(
    folderId ? Number(folderId) : rootFolder?.id,
  );

  const { data: memos } = useMemoListQuery(currentFolderId ?? 0);
  // const { data: memos } = useMemoListQuery(3);
  const { data: folders } = useFolderListQuery(currentFolderId ?? 0);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(`폴더: ${folderId}, 루트: ${rootFolder?.id}`);
  }, [folderId, rootFolder]);

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

  const handleDepthClick = () => {
    if (rootFolder?.id) {
      setCurrentFolderId(rootFolder.id);
      navigate(`/memo/${rootFolder.id}`);
    }
  };

  const handleFolderClick = (folderId: number) => {
    navigate(`/memo/${folderId}`);
    setCurrentFolderId(folderId);
    console.log('폴더 클릭!!!!!!!!!!!!', folderId);
  };

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
      onDepthClick={handleDepthClick}
      onFolderClick={handleFolderClick}
    />
  );
};
