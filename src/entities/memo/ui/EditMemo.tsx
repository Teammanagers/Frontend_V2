import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { getMemoById, updateMemo, deleteMemo } from '@/apis/memo';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';

export const EditMemo = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const navigate = useNavigate();
  const [initialTitle, setInitialTitle] = useState('안녕');
  const [initialContent, setInitialContent] = useState('이건본문');
  const [initialTags, setInitialTags] = useState<{ name: string }[]>([
    { name: '기본태그' },
    { name: '안녕' },
  ]);

  // api 연동 후 삭제할 부분
  const isApi = false;

  useEffect(() => {
    const fetchMemo = async () => {
      // 메모 불러오기
      if (isApi) {
        setInitialTitle('하이');
        setInitialContent('나중에이거지우기');
        setInitialTags([{ name: '빌드' }, { name: '에러방지용' }]);
      }
      // if (memoId) {
      //   try {
      //     const response = await getMemoById(Number(memoId));
      //     const memo = response.result.memo;
      //     setInitialTitle(memo.title);
      //     setInitialContent(memo.content);
      //     // memo.tagList가 문자열 배열이 아니라 객체 배열이라면 아래처럼 변환
      //     setInitialTags(
      //       memo.tagList.map((tag: { name: string }) => ({ name: tag.name })),
      //     );
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    };
    fetchMemo();
  }, [memoId]);

  const onSubmit = async (
    title: string,
    content: string,
    tags: { name: string }[],
  ) => {
    // 추후 메모 등록 기능 구현
    if (isApi) console.log(title, content, tags);
    // if (memoId) {
    //   try {
    //     const tagNames = tags.map((tag) => tag.name);
    //     await updateMemo(Number(memoId), title, tagNames, content);
    //     navigate('/memo');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  const onDelete = async () => {
    // 추후 메모 삭제 기능 구현
    // if (memoId) {
    //   try {
    //     await deleteMemo(Number(memoId));
    //     navigate('/memo');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <MemoForm
      initialTitle={initialTitle}
      initialContent={initialContent}
      initialTags={initialTags}
      onSubmit={onSubmit}
      onBack={() => navigate(-1)}
      submitButtonText="메모 수정"
      onDelete={onDelete}
      showDeleteButton={true}
    />
  );
};
