import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import pluxBtn from '@/shared/assets/common/add-tag.svg?url';
import removeBtn from '@/shared/assets/common/delete-tag.svg?url';
import { useTagContext } from '../MakeTeamTagProvider';

export default function TagForm() {
  const {
    isTagFull,
    tags,
    showTagInput,
    setShowTagInput,
    newTag,
    setNewTag,
    handleAddTag,
    handleRMTag,
    inputRef,
  } = useTagContext();

  const [inputWidth, setInputWidth] = useState(36);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      setInputWidth(Math.max(36, width + 24));
    }
  }, [newTag]);

  return (
    <TagFormContainer>
      <MeasureSpan ref={measureRef}>{newTag || ''}</MeasureSpan>
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
        {showTagInput && (
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            ref={inputRef}
            style={{ width: `${inputWidth}px` }}
          />
        )}
      </TagContainer>
      <OptionContainer>
        {!showTagInput && !isTagFull && (
          <PlusBtnContainer onClick={() => setShowTagInput(true)}>
            <img src={pluxBtn} width={24} height={24} alt="태그 추가" />
          </PlusBtnContainer>
        )}
      </OptionContainer>
    </TagFormContainer>
  );
}

const MeasureSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  color: rgba(92, 158, 255, 1);
  font-size: inherit;
  font-family: inherit;
`;

const Input = styled.input`
  height: 36px;
  background-color: rgba(249, 251, 255, 1);
  padding: 6px 12px;
  color: rgba(92, 158, 255, 1);
  border: none;
  outline: none;
  flex-shrink: 0;

  &::placeholder {
    color: rgba(92, 158, 255, 0.5);
  }
`;

const TagFormContainer = styled.div`
  min-height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 12px 18px;
  position: relative;
`;

const EachTag = styled.div`
  height: 36px;
  min-width: 36px;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  background-color: rgba(249, 251, 255, 1);
  padding: 6px 12px;
  color: rgba(92, 158, 255, 1);
  white-space: nowrap;
  flex-shrink: 0;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const OptionContainer = styled.div`
  margin-left: 8px;
  flex-shrink: 0;
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
