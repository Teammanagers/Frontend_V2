import styled from 'styled-components';
import pluxBtn from '@/shared/assets/common/add-tag.svg?url';
import removeBtn from '@/shared/assets/common/delete-tag.svg?url';
import { useTagContext } from '../MakeTeamTagProvider';

export default function TagForm() {
  const {
    tags,
    showTagInput,
    setShowTagInput,
    newTag,
    setNewTag,
    handleAddTag,
    handleRMTag,
    inputRef,
  } = useTagContext();

  return (
    <TagFormContainer>
      <TagContainer>
        {tags.map((tag, index) => (
          <EachTag key={tag.tagId}>
            {tag.name}
            <img
              src={removeBtn}
              width={23}
              height={23}
              onClick={() => handleRMTag(index)}
              alt="태그 삭제"
            />
          </EachTag>
        ))}
      </TagContainer>
      <OptionContainer>
        {showTagInput ? (
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            ref={inputRef}
            placeholder="Enter키를 누르면 태그가 등록됩니다."
          />
        ) : (
          <PlusBtnContainer onClick={() => setShowTagInput(true)}>
            <img src={pluxBtn} width={24} height={24} alt="태그 추가" />
          </PlusBtnContainer>
        )}
      </OptionContainer>
    </TagFormContainer>
  );
}

const TagFormContainer = styled.div`
  min-height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 12px 18px 12px 18px;
`;

const EachTag = styled.div`
  height: 36px;
  min-width: 36px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background-color: rgba(249, 251, 255, 1);
  padding: 6px 12px 6px 12px;
  color: rgba(92, 158, 255, 1);
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  flex: 1;
`;

const OptionContainer = styled.div`
  width: 100%;
  margin-left: 8px;
`;

const PlusBtnContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-color: rgba(249, 251, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
