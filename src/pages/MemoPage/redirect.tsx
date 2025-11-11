import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { useTeamStore } from '@/shared/model/store/teamStore.ts';

export const RedirectToRootFolder = () => {
  const teamId = useTeamStore((state) => state.teamId);

  const navigate = useNavigate();
  const { useRootFolderQuery } = useMemoQueries();
  const { data: rootFolder, isPending } = useRootFolderQuery();

  useEffect(() => {
    if (!isPending && rootFolder?.id) {
      navigate(`/team/${teamId}/memo/${rootFolder?.id}`, { replace: true });
    }
  }, [rootFolder?.id, isPending, navigate, teamId]);

  return null;
};
