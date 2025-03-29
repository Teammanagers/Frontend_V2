import { ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
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

export const Memo = ({ size }: { size: keyof typeof memoSizes }) => {
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const { isOpen, setIsOpen, toggle } = useToggle();
  // const navigate = useNavigate();

  const selectedSize = memoSizes[size];

  const handleMenuAction = (menu: string) => {
    if (menu === '수정') {
      console.log('수정페이지로 이동!');
      // navigate(`/memo/${해당메모아이디}`);
      setIsOpen(false);
    }
    toggle();
  };

  return (
    <MemoContainer $size={selectedSize} $pinned={isPinned}>
      <MemoTitleContainer>
        <MemoTitle>제목</MemoTitle>
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
            menus={['수정', '삭제']}
          />
        </MenuContainer>
      </MemoTitleContainer>
      <TagContainer>
        {/*{tagList.map((tag: TagProps) => (*/}
        <TagBox>태그</TagBox>
        <TagBox>하이루</TagBox>
      </TagContainer>
      <MemoContentContainer>
        <Content>
          내용길어지면어디까지뜨지흠냘ㅇ너ㅏㅁㄹㄴㅇ아러아러아러ㅏㅇ러ㅏ
        </Content>
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
