import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useFolderPathStore } from '@/features/memo/model/folderStore';
import { useMemoUIState } from '@/features/memo/model/useMemoUIState.ts';
import { axiosInstance } from '@/shared/api/axiosInstance.ts';
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

  const resolvedFolderId = folderId ? Number(folderId) : (rootFolder?.id ?? 0);

  const { data: memos } = useMemoListQuery(resolvedFolderId);
  // const { data: memos } = useMemoListQuery(3);
  const { data: folders } = useFolderListQuery(resolvedFolderId);

  const navigate = useNavigate();
  const { setPath, resetPath } = useFolderPathStore();

  useEffect(() => {
    async function buildPathFrom(id: number) {
      if (!id) {
        resetPath();
        return;
      }
      const chain: { id: number; name: string }[] = [];
      let curId: number | null = id;

      while (curId) {
        // 폴더 단건 조회로 폴더명 BreadCrumb에 띄움
        const res = await axiosInstance.get(`/api/v2/folder/${curId}`);
        const dto = res.data.result.folderDto as {
          id: number;
          name: string;
          parentId: number | null;
          depth: number;
        };
        const displayName = dto.depth === 1 ? '전체' : dto.name;
        chain.unshift({ id: dto.id, name: displayName });
        if (dto.depth === 1 || dto.parentId == null) break;
        curId = dto.parentId;
      }
      // depth 3 제한 (root depth=1 기준으로 최대 3개)
      setPath(chain.slice(0, 3));
    }

    buildPathFrom(resolvedFolderId);
  }, [resolvedFolderId, setPath, resetPath]);

  useEffect(() => {
    console.log(`폴더: ${folderId}, 루트: ${rootFolder?.id}`);
  }, [folderId, rootFolder]);

  // 메모 고정에 따른 정렬
  const sortedMemos = [...(memos ?? [])].sort((a, b) => {
    if (a.isFixed === b.isFixed) return 0;
    return a.isFixed ? -1 : 1;
  });

  const handleFolderClick = async (folderId: number) => {
    navigate(`/memo/${folderId}`);
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
      onFolderClick={handleFolderClick}
    />
  );
};
