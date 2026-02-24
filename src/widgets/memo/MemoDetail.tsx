import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths.ts';
import useMemoQueries from '@/entities/memo/model/useMemoQueries.ts';
import { DeleteModal } from '@/entities/memo/ui/DeleteModal.tsx';
import { MemoFormContainer } from '@/entities/memo/ui/WriteMemo.tsx';
import { useTeamNavigate } from '@/shared/hooks/useTeamNavigate.ts';
import { MemoDetailView } from '@/widgets/memo/MemoDetailView.tsx';

export function MemoDetail() {
  const teamNavigate = useTeamNavigate();
  const { memoId } = useParams<{ memoId: string }>();

  const { useMemoDetailQuery } = useMemoQueries();
  const { data: memoDetail, isPending } = useMemoDetailQuery(Number(memoId));

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isPending || !memoDetail) return <div> 로딩 중....</div>;
  const { memoDto, memoTagList } = memoDetail;

  const handleBack = () => {
    teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/${memoDto.folderId}`);
  };

  const handleEdit = () => {
    teamNavigate((teamId) => `${PATHS.MEMO(teamId)}/edit/${memoDto.id}`);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };
  return (
    <MemoFormContainer>
      <MemoDetailView
        title={memoDto.title}
        content={memoDto.content}
        memoTagList={memoTagList.map((tag) => ({ name: tag.name }))}
        authorName={memoDto.createdByName}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
}
