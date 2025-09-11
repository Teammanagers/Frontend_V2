import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BellSvg from '@/shared/assets/sidebar/bell.svg?react';
import CalendarSvg from '@/shared/assets/sidebar/calendar.svg?react';
import EndSvg from '@/shared/assets/sidebar/end.svg?react';
import FileSvg from '@/shared/assets/sidebar/file.svg?react';
import HomeSvg from '@/shared/assets/sidebar/home.svg?react'; // outline/filled 포함
import TodoSvg from '@/shared/assets/sidebar/list.svg?react';
import MemoSvg from '@/shared/assets/sidebar/memo.svg?react';
import MyPageSvg from '@/shared/assets/sidebar/mypage.svg?react';
import TeamSvg from '@/shared/assets/sidebar/team.svg?react';

const COLOR_DEFAULT = '#5A5A5A';
const COLOR_ACTIVE = '#1D1D1D';

export const SideBar = () => {
  const [hover, setHover] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const handleNavigate = (path: string) => navigate(path);

  // 더미 팀(이미지 없으면 이니셜 렌더)
  const currentTeam: { title: string; imageUrl?: string | null } = {
    title: '테수투',
    imageUrl: null,
  };

  return (
    <SideBarContainer
      isHovered={hover || isAlarmOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 상단 로고, 팀명 등 */}
      <LogoContainer>
        {currentTeam?.imageUrl ? (
          <LogoImg src={currentTeam.imageUrl} alt={currentTeam.title} />
        ) : (
          <FallbackLogo aria-label={currentTeam.title}>
            {currentTeam.title.slice(0, 1)}
          </FallbackLogo>
        )}
        {hover && (
          <LogoText title={currentTeam.title}>{currentTeam.title}</LogoText>
        )}
      </LogoContainer>

      <Hr style={{ margin: '11px 0 11px 0' }} />

      {/* 메인 홈*/}
      <IconContainer
        selected={isActive(`/`)}
        isHovered={hover}
        onClick={() => handleNavigate(`/`)}
      >
        <HomeIcon
          $active={isActive(`/`)}
          aria-hidden
          style={{ color: isActive(`/`) ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {hover && <SideBarText selected={isActive(`/`)}>홈</SideBarText>}
      </IconContainer>

      {/* 알림 */}
      <IconContainer
        selected={isAlarmOpen}
        isHovered={hover}
        onClick={() => setIsAlarmOpen((v) => !v)}
      >
        <StrokeIcon
          as={BellSvg}
          aria-hidden
          style={{ color: isAlarmOpen ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {hover && <SideBarText selected={isAlarmOpen}>알림</SideBarText>}
        {/* 알림 패널은 API 연동 후 여기에 붙이면 됨 */}
      </IconContainer>

      {/* 투두리스트 */}
      <IconContainer
        selected={isActive(`/todo-list`)}
        isHovered={hover}
        onClick={() => handleNavigate(`/todo-list`)}
      >
        <StrokeIcon
          as={TodoSvg}
          aria-hidden
          style={{
            color: isActive(`/todo-list`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {hover && (
          <SideBarText selected={isActive(`/todo-list`)}>
            투두리스트
          </SideBarText>
        )}
      </IconContainer>

      {/* 캘린더 */}
      <IconContainer
        selected={isActive(`/calendar`)}
        isHovered={hover}
        onClick={() => handleNavigate(`/calendar`)}
      >
        <StrokeIcon
          as={CalendarSvg}
          aria-hidden
          style={{
            color: isActive(`/calendar`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {hover && (
          <SideBarText selected={isActive(`/calendar`)}>캘린더</SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 메모 */}
      <IconContainer
        selected={isActive(`/memo`)}
        isHovered={hover}
        onClick={() => navigate(`/memo`)}
      >
        <StrokeIcon
          as={MemoSvg}
          aria-hidden
          style={{ color: isActive(`/memo`) ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {hover && <SideBarText selected={isActive(`/memo`)}>메모</SideBarText>}
      </IconContainer>

      {/* 자료실 */}
      <IconContainer
        selected={isActive(`/share`)}
        isHovered={hover}
        onClick={() => handleNavigate(`/share`)}
      >
        <StrokeIcon
          as={FileSvg}
          aria-hidden
          style={{ color: isActive(`/share`) ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {hover && (
          <SideBarText selected={isActive(`/share`)}>자료실</SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 팀 관리 */}
      <IconContainer
        selected={isActive(`/management`)}
        isHovered={hover}
        onClick={() => handleNavigate(`/management`)}
      >
        <StrokeIcon
          as={TeamSvg}
          aria-hidden
          style={{
            color: isActive(`/management`) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {hover && (
          <SideBarText selected={isActive(`/management`)}>팀 관리</SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 마이페이지 */}
      <IconContainer
        selected={isActive(`/mypage`)}
        isHovered={hover}
        onClick={() => handleNavigate(`/mypage`)}
      >
        <StrokeIcon
          as={MyPageSvg}
          aria-hidden
          style={{ color: isActive(`/mypage`) ? COLOR_ACTIVE : COLOR_DEFAULT }}
        />
        {hover && (
          <SideBarText selected={isActive(`/mypage`)}>마이페이지</SideBarText>
        )}
      </IconContainer>

      {/* 프로젝트 종료 */}
      <IconContainer
        isHovered={hover}
        $danger
        onClick={() => handleNavigate(`/management`)}
      >
        <StrokeIcon as={EndSvg} aria-hidden style={{ color: COLOR_DEFAULT }} />
        {hover && (
          <SideBarText selected={isActive(`/management`)} redText>
            프로젝트
            <br />
            종료
          </SideBarText>
        )}
      </IconContainer>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div<{ isHovered: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: ${({ isHovered }) => (isHovered ? '158px' : '73px')};
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

interface SelectedProps {
  selected?: boolean;
  redText?: boolean;
  isHovered?: boolean;
  $danger?: boolean;
}

const SideBarText = styled.p<SelectedProps>`
  font-size: 12px;
  font-weight: ${({ selected }) => (selected ? 700 : 400)}; /* ✅ 버그픽스 */
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.darkGray};
  margin-left: 18px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  ${({ redText, theme }) =>
    redText &&
    `
    color: ${theme.colors.red};
  `}
`;

const IconContainer = styled.div<SelectedProps>`
  width: 100%;
  height: 50px;
  background-color: ${({ selected, theme, $danger }) =>
    selected ? ($danger ? '#FFE9E9' : theme.colors.background) : 'white'};
  display: flex;
  justify-content: ${({ isHovered }) => (isHovered ? 'flex-start' : 'center')};
  padding-left: ${({ isHovered }) => (isHovered ? '19px' : '0')};
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

// home 아이콘
const HomeIcon = styled(HomeSvg)<{ $active?: boolean }>`
  width: 37px;
  height: 37px;

  .variant--filled {
    display: none;
  }
  .variant--outline {
    display: inline;
  }

  ${({ $active }) =>
    $active &&
    `
    .variant--filled { display: inline; }
    .variant--outline { display: none; }
  `}
`;
