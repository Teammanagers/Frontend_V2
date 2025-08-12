import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal.tsx';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';

export const EditMemo = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const navigate = useNavigate();

  const { useMemoDetailQuery } = useMemoQueries();
  const { useEditMemoMutation } = useMemoMutations();
  const { data: memoDetail, isLoading } = useMemoDetailQuery(Number(memoId));
  const { mutate: editMemo } = useEditMemoMutation();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading || !memoDetail) return <div> 로딩 중....</div>;
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
          navigate(`/memo/${memoDto.folderId}`);
        },
        onError: (err) => {
          console.log('메모 수정 실패', err);
        },
      },
    );
  };

  const onDelete = async () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <MemoForm
        initialTitle={memoDto.title}
        initialContent={memoDto.content}
        initialTags={memoTagList.map((tag) => ({ name: tag.name }))}
        onSubmit={onSubmit}
        onBack={() => navigate(-1)}
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
          navigate(`/memo/${memoDto.folderId}`);
        }}
      />
    </>
  );
};
