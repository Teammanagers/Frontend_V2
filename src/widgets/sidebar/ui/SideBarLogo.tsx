import styled from 'styled-components';
import TeamDropdown from '@/shared/assets/sidebar/team-dropdown.svg?react';
import { TeamProps } from '@/widgets/sidebar';

interface SideBarLogoProps {
  expanded: boolean;
  team: TeamProps | null;
  onToggleTeamList: () => void;
}

export default function SideBarLogo({
  expanded,
  team,
  onToggleTeamList,
}: SideBarLogoProps) {
  return (
    <LogoContainer>
      {team?.imageUrl ? (
        <LogoImg src={team.imageUrl} alt={team.title} />
      ) : (
        <FallbackLogo>{team?.title?.slice(0, 1)}</FallbackLogo>
      )}

      {expanded && team && (
        <TeamInfoWrapper>
          <LogoText title={team.title}>{team.title}</LogoText>
          <TeamDropdownBtn onClick={onToggleTeamList}>
            <TeamDropdown />
          </TeamDropdownBtn>
        </TeamInfoWrapper>
      )}
    </LogoContainer>
  );
}

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

const TeamInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TeamDropdownBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
