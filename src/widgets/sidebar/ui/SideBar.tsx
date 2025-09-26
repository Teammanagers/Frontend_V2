import styled from 'styled-components';

import BellSvg from '@/shared/assets/sidebar/bell.svg?react';
import CalendarSvg from '@/shared/assets/sidebar/calendar.svg?react';
import EndSvg from '@/shared/assets/sidebar/end.svg?react';
import FileSvg from '@/shared/assets/sidebar/file.svg?react';
import HomeFilledSvg from '@/shared/assets/sidebar/home-filled.svg?react';
import HomeOutlineSvg from '@/shared/assets/sidebar/home-outline.svg?react';
import TodoSvg from '@/shared/assets/sidebar/list.svg?react';
import MemoSvg from '@/shared/assets/sidebar/memo.svg?react';
import MyPageSvg from '@/shared/assets/sidebar/mypage.svg?react';
import TeamSvg from '@/shared/assets/sidebar/team.svg?react';
import { SideBarUIProps } from '@/widgets/sidebar';

const COLOR_DEFAULT = '#5A5A5A';
const COLOR_ACTIVE = '#1D1D1D';

export default function SideBar({
  expanded,
  activePath,
  isAlarmOpen,
  endSelected,
  team,
  onNavigate,
  onToggleAlarm,
  onEndClick,
}: SideBarUIProps) {
  const isActive = (path: string) => activePath === path;

  return (
    <SideBarContainer $isHovered={expanded}>
      <LogoContainer>
        {team?.imageUrl ? (
          <LogoImg src={team.imageUrl} alt={team.title} />
        ) : team ? (
          <FallbackLogo aria-label={team.title}>
            {team.title.slice(0, 1)}
          </FallbackLogo>
        ) : null}
        {expanded && team && (
          <LogoText title={team.title}>{team.title}</LogoText>
        )}
      </LogoContainer>

      <Hr style={{ margin: '11px 0 11px 0' }} />

      {/* 홈 */}
      <IconContainer
        $selected={isActive(`/`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/`)}
      >
        {isActive(`/`) ? (
          <StrokeIcon
            as={HomeFilledSvg}
            aria-hidden
            style={{ color: COLOR_ACTIVE }}
          />
        ) : (
          <StrokeIcon
            as={HomeOutlineSvg}
            aria-hidden
            style={{ color: COLOR_DEFAULT }}
          />
        )}
        {expanded && <SideBarText $selected={isActive(`/`)}>홈</SideBarText>}
      </IconContainer>

      {/* 알림 */}
      <IconContainer
        $selected={isAlarmOpen}
        $isHovered={expanded}
        onClick={onToggleAlarm}
      >
        <StrokeIcon
          as={BellSvg}
          aria-hidden
          style={{ color: isAlarmOpen ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {expanded && <SideBarText $selected={isAlarmOpen}>알림</SideBarText>}
      </IconContainer>

      {/* 투두리스트 */}
      <IconContainer
        $selected={isActive(`/todo-list`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/todo-list`)}
      >
        <StrokeIcon
          as={TodoSvg}
          aria-hidden
          style={{
            color: isActive(`/todo-list`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(`/todo-list`)}>
            투두리스트
          </SideBarText>
        )}
      </IconContainer>

      {/* 캘린더 */}
      <IconContainer
        $selected={isActive(`/calendar`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/calendar`)}
      >
        <StrokeIcon
          as={CalendarSvg}
          aria-hidden
          style={{
            color: isActive(`/calendar`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(`/calendar`)}>캘린더</SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 메모 */}
      <IconContainer
        $selected={isActive(`/memo`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/memo`)}
      >
        <StrokeIcon
          as={MemoSvg}
          aria-hidden
          style={{ color: isActive(`/memo`) ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {expanded && (
          <SideBarText $selected={isActive(`/memo`)}>메모</SideBarText>
        )}
      </IconContainer>

      {/* 자료실 */}
      <IconContainer
        $selected={isActive(`/resource`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/resource`)}
      >
        <StrokeIcon
          as={FileSvg}
          aria-hidden
          style={{
            color: isActive(`/resource`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(`/resource`)}>자료실</SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 팀 관리 */}
      <IconContainer
        $selected={isActive(`/management`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/management`)}
      >
        <StrokeIcon
          as={TeamSvg}
          aria-hidden
          style={{
            color: isActive(`/management`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(`/management`)}>팀 관리</SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 마이페이지 */}
      <IconContainer
        $selected={isActive(`/mypage`)}
        $isHovered={expanded}
        onClick={() => onNavigate(`/mypage`)}
      >
        <StrokeIcon
          as={MyPageSvg}
          aria-hidden
          style={{ color: isActive(`/mypage`) ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {expanded && (
          <SideBarText $selected={isActive(`/mypage`)}>마이페이지</SideBarText>
        )}
      </IconContainer>

      {/* 프로젝트 종료 */}
      <IconContainer
        $selected={endSelected}
        $isHovered={expanded}
        $danger
        onClick={onEndClick}
      >
        <StrokeIcon
          as={EndSvg}
          aria-hidden
          style={{ color: endSelected ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {expanded && (
          <SideBarText $selected={endSelected} $redText>
            프로젝트
            <br />
            종료
          </SideBarText>
        )}
      </IconContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div<{ $isHovered: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: ${({ $isHovered }) => ($isHovered ? '158px' : '73px')};
  height: 832px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  transition: width 0.3s ease;
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 49px;
  gap: 19px;
`;

const LogoText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40px;
`;

const LogoImg = styled.img`
  width: 37px;
  height: 37px;
  border-radius: 8px;
  object-fit: cover;
`;

const FallbackLogo = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

interface ItemProps {
  $selected?: boolean;
  $redText?: boolean;
  $isHovered?: boolean;
  $danger?: boolean;
}

const SideBarText = styled.p<ItemProps>`
  font-size: 12px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black : theme.colors.darkGray};
  margin-left: 16px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  ${({ $redText, theme }) =>
    $redText &&
    `
    color: ${theme.colors.red};
  `}
`;

const IconContainer = styled.div<ItemProps>`
  width: 100%;
  height: 50px;
  background-color: ${({ $selected, theme, $danger }) =>
    $selected ? ($danger ? '#FFE9E9' : theme.colors.background) : 'white'};
  display: flex;
  justify-content: ${({ $isHovered }) =>
    $isHovered ? 'flex-start' : 'center'};
  padding-left: ${({ $isHovered }) => ($isHovered ? '20px' : '0')};
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    margin-top: 18px;
  }
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.subLightBlue};
  margin: 11px 0 11px 0;
`;

// stroke 아이콘
const StrokeIcon = styled.svg`
  width: 37px;
  height: 37px;
  flex: 0 0 auto;
`;
