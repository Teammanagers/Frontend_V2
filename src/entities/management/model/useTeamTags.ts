import { useTags } from '@/shared/hooks/useTags';

interface ITeamTagInput {
  initialTags: { name: string }[];
  onCreateTeamTag: (tagName: string) => void;
  // 필요시 onEditTeamTag, onDeleteTeamTag 도 추가
}

export const useTeamTags = ({
  initialTags,
  onCreateTeamTag,
}: ITeamTagInput) => {
  return useTags({
    initialTags,
    onCreateRoleTag: onCreateTeamTag, // 외부에서 주입
  });
};
