import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import plus from '@/shared/assets/common/plus-icon.svg?url';

interface TeamInfo {
  id: number;
  img: string;
  title: string;
  tags: string[];
}

interface TeamCardProps {
  team: TeamInfo;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate();
  return (
    <TeamContent onClick={() => navigate(`/team/${team.id}`)}>
      <ImgContainer>
        <img src={team.img} width={128} height={80} alt={team.title} />
      </ImgContainer>
      <TeamName>{team.title}</TeamName>
      <Tags>
        {team.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
    </TeamContent>
  );
};

export const AddTeamCard = () => {
  const navigate = useNavigate();

  return (
    <TeamContent onClick={() => navigate('/make-team')}>
      <PlusImgContainer>
        <img src={plus} width={128} height={80} alt="새 팀 생성" />
      </PlusImgContainer>
      <TeamName>새로운 팀 생성하기</TeamName>
      <PlusTags>
        <Tag>{null}</Tag>
      </PlusTags>
    </TeamContent>
  );
};

const ImgContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 152px;
  border: solid 0.76px rgba(92, 158, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusImgContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 152px;
  border: solid 1px rgba(240, 240, 240, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 48px;
  padding-right: 48px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TeamName = styled.span`
  margin-bottom: 6px;
  margin-top: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  background-color: white;
`;

const PlusTags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(92, 158, 255, 1);
  padding-right: 12px;
  padding-left: 12px;
  min-width: 63px;
  height: 36px;
  border-radius: 5px;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
`;
