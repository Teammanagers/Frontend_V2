import { useNavigate, useParams } from 'react-router-dom';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
// import { useSubmitMemo } from '@/entities/memo/model/useSubmitMemo';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';

export const WriteMemo = () => {
  const navigate = useNavigate();
  const { folderId } = useParams<{ folderId: string }>();
  const currentFolderId = folderId ? Number(folderId) : null;
  const teamId = 3; // 임시

  const { useCreateMemoMutation } = useMemoMutations();
  const { mutate: createMemo } = useCreateMemoMutation();

  console.log('WriteMemo에서의 forderId', currentFolderId);
  // const { handleSubmit } = useSubmitMemo(teamId);

  const onSubmit = async (
    title: string,
    content: string,
    tags: { name: string }[],
  ) => {
    if (!currentFolderId) {
      console.error('폴더 id 설정되지 않음');
      return;
    }
    try {
      await createMemo({
        title,
        content,
        tags: tags.map((tag) => tag.name),
        folderId: currentFolderId,
        teamId: teamId,
      });
      navigate(`/memo`);
    } catch (err) {
      console.error('메모 생성 오류', err);
    }
  };

  return (
    <MemoForm
      onSubmit={onSubmit}
      onBack={() => navigate(-1)}
      submitButtonText="메모 등록"
    />
  );
};
