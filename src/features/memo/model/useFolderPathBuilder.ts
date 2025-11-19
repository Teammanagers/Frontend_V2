import { useEffect } from 'react';
import apiRequest from '@/shared/api/apiRequest';
import { useFolderPathStore } from './folderStore';

export function useFolderPathBuilder(fid: number, ready: boolean) {
  const { setPath, resetPath } = useFolderPathStore();

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;

    async function buildPathFrom(id: number) {
      try {
        const chain: { id: number; name: string }[] = [];
        let curId: number | null = id;

        while (curId) {
          const res = await apiRequest({
            url: `/api/v2/folder/${curId}`,
            method: 'GET',
          });

          const dto = res?.result?.folderDto as
            | {
                id: number;
                name: string;
                parentId: number | null;
                depth: number;
              }
            | undefined;

          if (!dto) break;

          chain.unshift({
            id: dto.id,
            name: dto.depth === 1 ? '전체' : dto.name,
          });

          if (dto.depth === 1 || dto.parentId == null) break;
          curId = dto.parentId;
        }

        if (!cancelled) setPath(chain.slice(0, 3));
      } catch (e) {
        console.error('buildPathFrom 실패', e);
        if (!cancelled) resetPath();
      }
    }

    void buildPathFrom(fid);

    return () => {
      cancelled = true;
    };
  }, [fid, ready, setPath, resetPath]);
}
