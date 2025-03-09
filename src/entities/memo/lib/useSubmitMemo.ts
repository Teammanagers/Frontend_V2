import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMemo } from '@/shared/api/memo.ts';

export const useSubmitMemo = (
  teamId: number,
  title: string,
  content: string,
  tags: { name: string }[],
  navigate: ReturnType<typeof useNavigate>,
) => {
  const handleSubmit = useCallback(async () => {
    try {
      const tagNames = tags.map((tag) => tag.name);
      const createMemoResult = await createMemo(
        teamId,
        title,
        tagNames,
        content,
      );
      console.log('메모: ', createMemoResult);
      navigate(`/memo`);
      console.log(title, tags, content);
    } catch (error) {
      console.error('메모 생성 오류: ', error);
    }
  }, [teamId, title, content, navigate]);

  return { handleSubmit };
};
