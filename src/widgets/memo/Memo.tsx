import { ButtonHTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MemoProps } from '@/entities/memo/memo.type.ts';
import Next from '@/shared/assets/memo/next-button.svg?react';
import PinIcon from '@/shared/assets/memo/pin.svg?react';
import { ActionDropdown } from '@/shared/components/dropdown';
import useToggle from '@/shared/hooks/action/useToggle.ts';
import { memoSizes } from '@/widgets/memo/memo.constants.ts';

/**
 * @example
 * ```tsx
 *    <Memo size="small" />
 *   ```
 *
 * @param {'small' | 'large'} size - small은 메인에서, large는 메모에서 사용됩니다.
 */

export const Memo = ({
  size,
  memo,
  onDeleteRequest,
  onMoveRequest,
}: MemoProps) => {
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isOpen, setIsOpen, toggle } = useToggle();

  const { id, title, tags, content } = memo;
  const navigate = useNavigate();

  const selectedSize = memoSizes[size];

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      console.log('수정페이지로 이동!');
      navigate(`/memo/edit/${id}`);
      setIsOpen(true);
    } else if (menu === '이동') {
      console.log('메모 이동 모달 띄우기!!!');
      onMoveRequest(id);
    } else if (menu === '삭제') {
      console.log('메모 삭제!');
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
            <PinBtn
              onClick={() => setIsPinned((prev) => !prev)}
              $pinned={isPinned}
            />
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
  max-width: 50px;
  padding: 0 6px 0 6px;
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
