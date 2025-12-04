import styled from 'styled-components';
import { PATHS } from '@/app/routes/paths';
// import BellSvg from '@/shared/assets/sidebar/bell.svg?react';
import CalendarSvg from '@/shared/assets/sidebar/calendar.svg?react';
import EndSvg from '@/shared/assets/sidebar/end.svg?react';
import FileSvg from '@/shared/assets/sidebar/file.svg?react';
import HomeFilledSvg from '@/shared/assets/sidebar/home-filled.svg?react';
import HomeOutlineSvg from '@/shared/assets/sidebar/home-outline.svg?react';
import TodoSvg from '@/shared/assets/sidebar/list.svg?react';
import MemoSvg from '@/shared/assets/sidebar/memo.svg?react';
import MyPageSvg from '@/shared/assets/sidebar/mypage.svg?react';
import TeamSvg from '@/shared/assets/sidebar/team.svg?react';

const COLOR_DEFAULT = '#5A5A5A';
const COLOR_ACTIVE = '#1D1D1D';

interface SideBarNavProps {
  teamId: number;
  activePath: string;
  expanded: boolean;
  // isAlarmOpen: boolean;
  isLeader: boolean;
  onNavigate: (path: (teamId: number) => string) => void;
  // onToggleAlarm: () => void;
}

export default function SideBarNav({
  teamId,
  activePath,
  expanded,
  // isAlarmOpen,
  isLeader,
  onNavigate,
  // onToggleAlarm,
}: SideBarNavProps) {
  const isActive = (path: string) =>
    activePath === path || activePath.startsWith(path);

  return (
    <>
      {/* 홈 */}
      <IconContainer
        $selected={isActive(PATHS.MAIN(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.MAIN)}
      >
        <StrokeIcon
          as={isActive(PATHS.MAIN(teamId)) ? HomeFilledSvg : HomeOutlineSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.MAIN(teamId)) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.MAIN(teamId))}>홈</SideBarText>
        )}
      </IconContainer>

      {/*/!* 알림 *!/*/}
      {/*<IconContainer*/}
      {/*  $selected={isAlarmOpen}*/}
      {/*  $expanded={expanded}*/}
      {/*  onClick={onToggleAlarm}*/}
      {/*>*/}
      {/*  <StrokeIcon*/}
      {/*    as={BellSvg}*/}
      {/*    aria-hidden*/}
      {/*    style={{ color: isAlarmOpen ? COLOR_ACTIVE : COLOR_DEFAULT }}*/}
      {/*  />*/}
      {/*  {expanded && <SideBarText $selected={isAlarmOpen}>알림</SideBarText>}*/}
      {/*</IconContainer>*/}

      {/* 투두 */}
      <IconContainer
        $selected={isActive(PATHS.TODO_LIST(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.TODO_LIST)}
      >
        <StrokeIcon
          as={TodoSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.TODO_LIST(teamId))
              ? COLOR_ACTIVE
              : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.TODO_LIST(teamId))}>
            투두리스트
          </SideBarText>
        )}
      </IconContainer>

      {/* 캘린더 */}
      <IconContainer
        $selected={isActive(PATHS.CALENDAR(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.CALENDAR)}
      >
        <StrokeIcon
          as={CalendarSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.CALENDAR(teamId))
              ? COLOR_ACTIVE
              : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.CALENDAR(teamId))}>
            캘린더
          </SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 메모 */}
      <IconContainer
        $selected={isActive(PATHS.MEMO(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.MEMO)}
      >
        <StrokeIcon
          as={MemoSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.MEMO(teamId)) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.MEMO(teamId))}>
            메모
          </SideBarText>
        )}
      </IconContainer>

      {/* 자료실 */}
      <IconContainer
        $selected={isActive(PATHS.RESOURCE(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.RESOURCE)}
      >
        <StrokeIcon
          as={FileSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.RESOURCE(teamId))
              ? COLOR_ACTIVE
              : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.RESOURCE(teamId))}>
            자료실
          </SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 팀관리 */}
      <IconContainer
        $selected={isActive(PATHS.MANAGEMENT(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.MANAGEMENT)}
      >
        <StrokeIcon
          as={TeamSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.MANAGEMENT(teamId))
              ? COLOR_ACTIVE
              : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.MANAGEMENT(teamId))}>
            팀 관리
          </SideBarText>
        )}
      </IconContainer>

      <Hr />

      {/* 마이페이지 */}
      <IconContainer
        $selected={isActive(PATHS.MY_PAGE(teamId))}
        $expanded={expanded}
        onClick={() => onNavigate(PATHS.MY_PAGE)}
      >
        <StrokeIcon
          as={MyPageSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.MY_PAGE(teamId))
              ? COLOR_ACTIVE
              : COLOR_DEFAULT,
          }}
        />
        {expanded && (
          <SideBarText $selected={isActive(PATHS.MY_PAGE(teamId))}>
            마이페이지
          </SideBarText>
        )}
      </IconContainer>

      {/* 종료 */}
      <IconContainer
        $selected={isActive(PATHS.END(teamId))}
        $expanded={expanded}
        $danger
        onClick={() => onNavigate(PATHS.END)}
      >
        <StrokeIcon
          as={EndSvg}
          aria-hidden
          style={{
            color: isActive(PATHS.END(teamId)) ? COLOR_ACTIVE : COLOR_DEFAULT,
          }}
        />
        {expanded &&
          (isLeader ? (
            <SideBarText $selected={isActive(PATHS.END(teamId))} $redText>
              프로젝트
              <br />
              종료
            </SideBarText>
          ) : (
            <SideBarText $selected={isActive(PATHS.END(teamId))} $redText>
              팀 나가기
            </SideBarText>
          ))}
      </IconContainer>
    </>
  );
}

interface ItemProps {
  $selected?: boolean;
  $redText?: boolean;
  $expanded?: boolean;
  $danger?: boolean;
}

const IconContainer = styled.div<ItemProps>`
  width: 100%;
  height: 50px;
  background-color: ${({ $selected, theme, $danger }) =>
    $selected ? ($danger ? '#FFE9E9' : theme.colors.background) : 'white'};
  display: flex;
  justify-content: flex-start;
  padding-left: ${({ $expanded }) => ($expanded ? '20px' : '22px')};
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  cursor: pointer;

  transition: opacity 0.2s ease;

  &:last-child {
    margin-top: 18px;
  }
`;

const SideBarText = styled.p<ItemProps>`
  font-size: 12px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.black : theme.colors.darkGray};
  margin-left: 16px;
  text-align: center;
  white-space: nowrap;

  ${({ $redText, theme }) =>
    $redText &&
    `
    color: ${theme.colors.red};
  `}
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.subLightBlue};
  margin: 11px 0 11px 0;
`;

const StrokeIcon = styled.svg`
  width: 37px;
  height: 37px;
  flex: 0 0 auto;
`;
