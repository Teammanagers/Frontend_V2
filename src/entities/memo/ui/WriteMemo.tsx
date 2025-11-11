import { useParams } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths.ts';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';

export const WriteMemo = () => {
  const teamNavigate = useTeamNavigate();
  const { folderId } = useParams<{ folderId?: string }>();
  const currentFolderId = Number(folderId);

  const { useCreateMemoMutation } = useMemoMutations();
  const { mutate: createMemo } = useCreateMemoMutation();

  const onSubmit = (
    title: string,
    content: string,
    tags: { name: string }[],
  ) => {
    if (Number.isNaN(currentFolderId)) {
      console.error('폴더 id 설정되지 않음');
      return;
    }
    createMemo(
      {
        title,
        content,
        tags: tags.map((tag) => tag.name),
        folderId: currentFolderId,
      },
      {
        onSuccess: () =>
          teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${currentFolderId}`),
        onError: (err) => console.error('메모 생성 오류 ', err),
      },
    );
  };

  return (
    <MemoForm
      onSubmit={onSubmit}
      onBack={() =>
        teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${currentFolderId}`)
      }
      submitButtonText="메모 등록"
    />
  );
};
