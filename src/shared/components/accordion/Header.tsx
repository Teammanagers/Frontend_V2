import styled from 'styled-components';
import chevronIcon from '@/shared/assets/common/rotating-chevron.svg';
import { useTeamStore } from '@/shared/model/store/teamStore.ts';
import { IAccordionHeaderProps } from '@/shared/types';

/**
 * AccordionHeader 컴포넌트는 아코디언의 헤더를 제공합니다.
 *
 * @param {boolean} isOpen - 아코디언의 열림/닫힘 상태.
 * @param {() => void} onClick - 헤더를 클릭했을 때 호출되는 함수.
 * @param {string} title - 아코디언의 제목 (예: 팀원 이름)
 * @param {Tag[]} tagList - 아코디언의 태그 리스트.
 */

function AccordionHeader({
  isOpen,
  onClick,
  title,
  tagList = [],
  teamMemberId,
}: IAccordionHeaderProps) {
  const myTeamMemberId = useTeamStore((state) => state.teamMemberId);

  return (
    <Container
      onClick={onClick}
      $isOpen={isOpen}
      $isMe={teamMemberId === myTeamMemberId} // 내 투두인지
    >
      <TitleWrapper>
        <h3>{title}</h3>
        <TagList>
          {tagList.length > 0
            ? tagList.map((tag) => (
                <Tag $isOpen={isOpen} key={`tag-${tag.id}`}>
                  {tag.name}
                </Tag>
              ))
            : null}
        </TagList>
      </TitleWrapper>

      <IconWrapper $isOpen={isOpen}>
        <img src={chevronIcon} alt="rotating-chevron-icon" />
      </IconWrapper>
    </Container>
  );
}

export { AccordionHeader };

const Container = styled.div<{ $isOpen: boolean; $isMe: boolean }>`
  box-sizing: border-box;
  width: inherit;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 15px;
  border: 1px solid
    ${({ $isMe, theme }) =>
      $isMe ? theme.colors.mainBlue : theme.colors.lightGray};
  border-radius: 6px;
  background-color: ${({ $isOpen }) => ($isOpen ? '#F9FBFF' : '#ffffff')};
  cursor: pointer;
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '0px 3px 9px rgba(0, 0, 0, 0.08)' : 'none'};

  h3 {
    font-size: 14px;
    font-weight: 500;
    color: #1d1d1d;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TagList = styled.ul`
  display: flex;
  gap: 8px;
`;

const Tag = styled.li<{ $isOpen: boolean }>`
  padding: 5px 8px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  color: #5c9eff;
  background-color: ${({ $isOpen }) => ($isOpen ? '#ffffff' : '#F9FBFF')};
`;

const IconWrapper = styled.button<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.5s;
  cursor: pointer;
`;
