import { ButtonHTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMemoMutations from '@/entities/memo/model/useMemoMutations.ts';
import Next from '@/shared/assets/memo/next-button.svg?react';
import PinIcon from '@/shared/assets/memo/pin.svg?react';
import { ActionDropdown } from '@/shared/components/dropdown';
import useToggle from '@/shared/hooks/action/useToggle.ts';
import { MemoProps } from '@/shared/types/memo.types.ts';
import { memoSizes } from '@/widgets/memo/memo.constants.ts';

/**
 * Memo 컴포넌트는 단일 메모를 렌더링하며, 수정, 이동, 삭제 등의 동작을 제공합니다.
 *
 * @param {'small' | 'large'} size - small은 메인에서, large는 메모에서 사용됩니다.
 * @param memo - 렌더링할 메모 데이터 객체입니다. (예: { id, title, tags, content })
 * @param onDeleteRequest - 드롭다운 메뉴에서 "삭제"를 선택했을 때 호출되며, 해당 메모의 id를 전달합니다.
 * @param onMoveRequest - 드롭다운 메뉴에서 "이동"을 선택했을 때 호출되며, 해당 메모의 id를 전달합니다.
 *
 * @example
 * ```tsx
 * // memo는 API로 불러와서 사용, 현재는 목업데이터 형태로
 * `{ id: 1, title: '회의록', tags: ['기획', '디자인'], content: '메모 내용입니다.' }` 구조로 이루어져 있습니다.
 *    {memoData.map((memo) => (
 *             <Memo
 *               key={memo.id}
 *               size="large"
 *               memo={memo}
 *               onDeleteRequest={(id: number) =>
 *                 handleDeleteRequest({ type: 'memo', id, title: memo.title })
 *               }
 *               onMoveRequest={(id: number) =>
 *                 handleMoveRequest({ type: 'memo', id, title: memo.title })
 *               }
 *             />
 *           ))}
 *   ```
 */

export const Memo = ({
  size,
  memo,
  onDeleteRequest,
  onMoveRequest,
}: MemoProps) => {
  const { id, title, tags, content, isFixed } = memo;

  const [isPinned, setIsPinned] = useState<boolean>(isFixed);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isOpen, setIsOpen, toggle } = useToggle();

  const { useTogglePinMemoMutations } = useMemoMutations();
  const { mutate: togglePinMemo } = useTogglePinMemoMutations();

  const navigate = useNavigate();
  const selectedSize = memoSizes[size];

  const handlePinToggle = () => {
    togglePinMemo(id, {
      onSuccess: () => {
        setIsPinned((prev) => !prev);
      },
    });
  };

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      navigate(`/memo/edit/${id}`);
      setIsOpen(true);
    } else if (menu === '이동') {
      onMoveRequest(id);
    } else if (menu === '삭제') {
      setIsOpen(true);
      onDeleteRequest(id);
    }
    toggle();
  };

  return (
    <MemoContainer $size={selectedSize} $pinned={isPinned}>
      <MemoTitleContainer>
        <MemoTitle>{title}</MemoTitle>
        <MenuContainer>
          {size === 'large' && (
            <PinBtn onClick={handlePinToggle} $pinned={isPinned} />
          )}
          <ActionDropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            toggle={toggle}
            action={handleMenuAction}
            menus={['수정', '이동', '삭제']}
          />
        </MenuContainer>
      </MemoTitleContainer>
      <TagContainer>
        {tags.map((tag: string, index) => (
          <TagBox key={index}>{tag}</TagBox>
        ))}
      </TagContainer>
      <MemoContentContainer>
        <Content>{content}</Content>
      </MemoContentContainer>
      {size === 'small' && (
        <NextBtn
          $active={isActive}
          onMouseLeave={() => setIsActive(false)}
          onMouseDown={() => setIsActive(true)}
        />
      )}
    </MemoContainer>
  );
};

const MemoContainer = styled.div<{
  $size: (typeof memoSizes)[keyof typeof memoSizes];
  $pinned: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ $size }) => $size.width}px;
  height: ${({ $size }) => $size.height}px;
  border-radius: 6px;
  outline: ${({ theme, $pinned }) =>
    $pinned ? `2px solid ${theme.colors.subLightBlue}` : 'none'};
  box-shadow: ${({ $pinned }) =>
    $pinned ? `0 4px 12px rgba(0, 0, 0, 0.08)` : 'none'};
  gap: 8px;
  background: white;
  padding: 16px 18px;
`;

const MemoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 21px;
`;

const PinBtn = styled(PinIcon)<
  ButtonHTMLAttributes<HTMLButtonElement> & { $pinned: boolean }
>`
  cursor: pointer;
  margin-right: 8px;
  fill: ${({ theme, $pinned }) => ($pinned ? theme.colors.subBlue : 'white')};
  stroke: ${({ theme, $pinned }) =>
    $pinned ? theme.colors.mainBlue : theme.colors.darkGray};
`;

const MemoTitle = styled.h1`
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  gap: 6px;
`;

const TagBox = styled.div`
  width: auto;
  padding: 5px 8px;
  height: 28px;
  border: 3px;
  border-radius: 3px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme.colors.mainBlue};
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
`;

const MemoContentContainer = styled.div`
  width: 100%;
  height: 115px;
`;

const Content = styled.p`
  font-size: 10px;
  line-height: 150%;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NextBtn = styled(Next)<
  ButtonHTMLAttributes<HTMLButtonElement> & { $active: boolean }
>`
  position: absolute;
  right: 0;
  top: 50%;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
  stroke: ${({ theme, $active }) =>
    $active ? theme.colors.mainBlue : '#999999'};

  ${MemoContainer}:hover & {
    opacity: 1;
  }
`;
