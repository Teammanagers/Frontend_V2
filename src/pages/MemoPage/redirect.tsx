import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';

export const RedirectToRootFolder = () => {
  const navigate = useNavigate();
  const { useRootFolderQuery } = useMemoQueries();
  const { data: rootFolder, isPending } = useRootFolderQuery();

  useEffect(() => {
    if (!isPending && rootFolder?.id) {
      navigate(`/memo/${rootFolder?.id}`, { replace: true });
    }
  }, [rootFolder?.id, isPending, navigate]);

  return null;
};
