import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths.ts';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal.tsx';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';
import { MemoFormContainer } from '@/entities/memo/ui/WriteMemo.tsx';
import { useGetName } from '@/entities/onBoarding/model/selectTeam/useGetName.ts';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';

export const EditMemo = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const teamNavigate = useTeamNavigate();

  const { useMemoDetailQuery } = useMemoQueries();
  const { useEditMemoMutation } = useMemoMutations();
  const { data: memoDetail, isPending } = useMemoDetailQuery(Number(memoId));
  const { mutate: editMemo } = useEditMemoMutation();
  const { name } = useGetName();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isPending || !memoDetail) return <div> 로딩 중....</div>;
  const { memoDto, memoTagList } = memoDetail;

  const onSubmit = async (
    title: string,
    content: string,
    tags: { name: string }[],
  ) => {
    const tagNames = tags.map((tag) => tag.name);

    editMemo(
      {
        memoId: Number(memoId),
        title,
        content,
        tags: tagNames,
      },
      {
        onSuccess: () => {
          teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${memoDto.folderId}`);
        },
        onError: (err) => {
          console.log('메모 수정 실패', err);
        },
      },
    );
  };

  const onDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <MemoFormContainer>
      <MemoForm
        authorName={name}
        initialTitle={memoDto.title}
        initialContent={memoDto.content}
        initialTags={memoTagList.map((tag) => ({ name: tag.name }))}
        onSubmit={onSubmit}
        onBack={() =>
          teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${memoDto.folderId}`)
        }
        submitButtonText="메모 수정"
        onDelete={onDelete}
        showDeleteButton={true}
      />

      <DeleteModal
        type="memo"
        id={Number(memoId)}
        name={memoDto.title}
        isOpen={isDeleteOpen}
        toggle={() => setIsDeleteOpen(false)}
        parentId={memoDto.folderId} // 폴더 삭제일 때만 쓰이지만 prop 형태 맞춰 전달
        onAfterDelete={() => {
          teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${memoDto.folderId}`);
        }}
      />
    </MemoFormContainer>
  );
};
