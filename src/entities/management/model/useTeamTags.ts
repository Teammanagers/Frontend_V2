import { useTags } from '@/shared/hooks/useTags';

interface ITeamTagInput {
  initialTags: { name: string }[];
  onCreateTeamTag: (tagName: string) => void;
  onDeleteTeamTag: (tagId: number) => void;
  onEditTeamTag: (tagId: number, tagName: string) => void;
}

export const useTeamTags = ({
  initialTags,
  onCreateTeamTag,
  onDeleteTeamTag,
  onEditTeamTag,
}: ITeamTagInput) => {
  const {
    tags,
    showTagInput,
    newTag,
    editTagIndex,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    handleDeleteTag: baseDeleteTag,
    setTags,
    setShowTagInput,
    setEditTagIndex,
    setNewTag,
  } = useTags({
    initialTags,
    onCreateRoleTag: onCreateTeamTag,
    onEditTeamTag,
  });

  // tagId를 추출해서 외부로 넘기는 래퍼 함수
  const handleDeleteTag = (index: number) => {
    const tag = tags[index];
    if ('tagId' in tag && typeof tag.tagId === 'number') {
      onDeleteTeamTag(tag.tagId);
    }

    baseDeleteTag(index); // 내부 상태는 기존대로 index로 삭제
  };

  return {
    tags,
    showTagInput,
    newTag,
    editTagIndex,
    handleAddTag,
    handleEditTag,
    startEditingTag,
    handleDeleteTag,
    setTags,
    setShowTagInput,
    setEditTagIndex,
    setNewTag,
  };
};
