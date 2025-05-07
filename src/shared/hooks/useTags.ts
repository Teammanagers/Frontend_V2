import { KeyboardEvent, useEffect, useState } from 'react';
import { TagsProps, TeamTag } from '@/shared/types/tag.types.ts';

/**
 * 태그 생성, 수정, 삭제 할 수 있는 훅입니다.
 * 주로 메모 태그 / 팀 관리 멤버 이름 태그에 사용됩니다.
 * **리턴 값을 집중해서 봐주세요!**
 *
 * @param {object} options - 태그 관련 옵션 객체
 * @param {TeamTag[]} [options.initialTags = []] - 초기 태그 배열
 * @param {(tagId: number, newName: string) => void} [options.onEditTeamTag] - 팀 태그 수정 시 호출되는 콜백 함수
 * @param {(name: string) => void} [options.onCreateRoleTag] - 역할 태그 생성 시 호출되는 콜백 함수
 * @param {(tagId: number, newName: string) => void} [options.onEditRoleTag] - 역할 태그 수정 시 호출되는 콜백 함수
 * @param {(tagId: number) => void} [options.onDeleteRoleTag] - 역할 태그 삭제 시 호출되는 콜백 함수
 *
 * @returns {object} - useTags 훅이 반환하는 객체
 * @returns {TeamTag[]} tags - 현재 태그 목록
 * @returns {boolean} showTagInput - 태그 입력창의 노출 여부
 * @returns {string} newTag - 현재 입력 중인 태그 값
 * @returns {number|null} editTagIndex - 수정 중인 태그의 인덱스 (수정 모드가 아닐 경우 null)
 * @returns {(e: KeyboardEvent<HTMLInputElement>) => Promise<void>} handleAddTag - 태그 추가 핸들러
 * @returns {(e: KeyboardEvent<HTMLInputElement>, index: number) => Promise<void>} handleEditTag - 태그 수정 핸들러
 * @returns {(index: number) => void} startEditingTag - 태그 수정 모드로 전환하는 함수
 * @returns {(index: number) => Promise<void>} handleDeleteTag - 태그 삭제 핸들러
 * @returns {(tags: TeamTag[]) => void} setTags - 태그 배열을 업데이트하는 함수
 * @returns {(show: boolean) => void} setShowTagInput - 태그 입력창 노출 여부를 업데이트하는 함수
 * @returns {(index: number | null) => void} setEditTagIndex - 수정 중인 태그 인덱스를 업데이트하는 함수
 * @returns {(tag: string) => void} setNewTag - 입력 중인 태그 값을 업데이트하는 함수
 *
 */

export const useTags = ({
  initialTags = [],
  onEditTeamTag,
  onCreateRoleTag,
  onEditRoleTag,
  onDeleteRoleTag,
}: TagsProps) => {
  const [tags, setTags] = useState<TeamTag[]>(initialTags); // 태그 업데이트
  const [showTagInput, setShowTagInput] = useState<boolean>(false); // 태그 입력 인풋창 보여줄지
  const [newTag, setNewTag] = useState<string>(''); // 새로운 태그 입력값
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null); // 태그 수정시 인덱스값

  const handleAddTag = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      // 태그 중복 체크
      const isDuplicated = tags.some((tag) => tag.name === newTag.trim());
      if (isDuplicated) {
        alert('이미 존재하는 태그입니다!');
        return;
      }

      if (onCreateRoleTag) {
        await onCreateRoleTag(newTag.trim());
      }
      setTags([...tags, { tagId: Date.now(), name: newTag.trim() }]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleEditTag = async (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' && newTag.trim() !== '') {
      // 태그 중복 체크, 편집 중인 태그 제외
      const isDuplicated = tags.some(
        (tag, i) => i !== index && tag.name === newTag.trim(),
      );
      if (isDuplicated) {
        alert('이미 존재하는 태그입니다!');
        return;
      }
      const updatedTags = [...tags];
      const tagId = updatedTags[index].tagId; // 기존 태그의 ID를 유지
      updatedTags[index] = { tagId, name: newTag.trim() };

      setTags(updatedTags);
      setEditTagIndex(null);
      setNewTag('');
      setShowTagInput(false);

      // 팀 태그와 역할 태그에 따라 다른 콜백 호출
      if (tagId !== undefined) {
        if (onEditTeamTag) {
          await onEditTeamTag(tagId, newTag.trim());
        } else if (onEditRoleTag) {
          await onEditRoleTag(tagId, newTag.trim());
        }
      }
    }
  };

  const startEditingTag = (index: number) => {
    setEditTagIndex(index);
    setNewTag(tags[index].name);
    setShowTagInput(true);
  };

  const handleDeleteTag = async (index: number) => {
    const tagId = tags[index]?.tagId;
    if (tagId !== undefined && onDeleteRoleTag) {
      await onDeleteRoleTag(tagId);
    }
    setTags((prevTags) => {
      const updatedTags = prevTags.filter((_, i) => i !== index);
      setEditTagIndex(null);
      setNewTag('');
      return updatedTags;
    });
  };

  useEffect(() => {
    if (tags.length < 3) {
      setShowTagInput(false);
    }
  }, [tags]);

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
