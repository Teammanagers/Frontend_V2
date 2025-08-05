import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';

export const EditMemo = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const navigate = useNavigate();

  const { useMemoDetailQuery } = useMemoQueries();
  const { useEditMemoMutation } = useMemoMutations();
  const { data: memoDetail, isLoading } = useMemoDetailQuery(Number(memoId));
  const editMemoMutation = useEditMemoMutation();

  // 추후 삭제
  useEffect(() => {
    console.log(memoDetail);
  }, [memoDetail]);

  if (isLoading || !memoDetail) return <div> 로딩 중....</div>;

  const { memoDto, memoTagList } = memoDetail;

  const onSubmit = async (
    title: string,
    content: string,
    tags: { name: string }[],
  ) => {
    // 추후 메모 수정 기능 구현
    console.log(title, content, tags);
    const tagNames = tags.map((tag) => tag.name);

    editMemoMutation.mutate(
      {
        memoId: Number(memoId),
        title,
        content,
        tags: tagNames,
      },
      {
        onSuccess: () => {
          navigate(`/memo`);
        },
        onError: (err) => {
          console.log('메모 수정 실패', err);
        },
      },
    );
  };

  const onDelete = async () => {
    // 추후 메모 삭제 기능 구현
    console.log('삭제 요청');
  };

  return (
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
  );
};
