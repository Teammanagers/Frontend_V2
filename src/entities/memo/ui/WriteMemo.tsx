import { useNavigate } from 'react-router-dom';
import { useSubmitMemo } from '@/entities/memo/model/useSubmitMemo';
import { MemoForm } from '@/entities/memo/ui/MemoForm.tsx';

export const WriteMemo = () => {
  const navigate = useNavigate();
  const teamId = Number(localStorage.getItem('teamId'));

  const { handleSubmit } = useSubmitMemo(teamId);

  const onSubmit = (
    title: string,
    content: string,
    tags: { name: string }[],
  ) => {
    handleSubmit(title, content, tags)
      .then(() => navigate('/memo'))
      .catch((error) => console.error('메모 생성 오류:', error));
  };

  return (
    <MemoForm
      onSubmit={onSubmit}
      onBack={() => navigate(-1)}
      submitButtonText="메모 등록"
    />
  );
};
