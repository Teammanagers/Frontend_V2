// 기본 태그
export interface Tag {
  name: string;
}

export interface TeamTag extends Tag {
  tagId?: number;
}

// useTags 훅 태그
export interface TagsProps {
  initialTags?: TeamTag[];
  onEditTeamTag?: (tagId: number, newName: string) => void;
  onCreateRoleTag?: (name: string) => void;
  onEditRoleTag?: (tagId: number, newName: string) => void;
  onDeleteRoleTag?: (tagId: number) => void;
}
