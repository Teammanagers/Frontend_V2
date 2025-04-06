import { useNavigate } from 'react-router-dom';
import TeamLogo from '@/shared/assets/common/logo.svg';
import styled from 'styled-components';

interface SelectTeamSectionProps {
  data: {
    imageUrl: string;
    teamCode: string;
    teamId: number;
    teamTagList: { name: string; tagId: number }[];
    title: string;
  };
}

const MyTeams = ({ data }: SelectTeamSectionProps) => {
  //   const navigate = useNavigate();
  //   const handleTeamClick = () => {
  //     localStorage.removeItem('teamId');
  //     localStorage.setItem('teamId', `${data.teamId}`);
  //     navigate('/');
  //   };
  return (
    <SelectTeamComponent>
      <TeamLogoComponent withBorder>
        {data ? <img src={data.imageUrl} /> : <TeamLogo />}
      </TeamLogoComponent>
      <TeamTitleComponent>{data.title}</TeamTitleComponent>
      <TeamTagContainer>
        {data.teamTagList.map((tag) => {
          return (
            <TeamTagComponent key={tag.tagId}>{tag.name}</TeamTagComponent>
          );
        })}
      </TeamTagContainer>
    </SelectTeamComponent>
  );
};

const SelectTeamComponent = styled.div`
  cursor: pointer;
  margin-top: 76px;
  width: 163px;
  height: 274px;
  padding: 0px 47px;
`;

const TeamLogoComponent = styled.div<{ withBorder?: boolean }>`
  display: grid;
  place-content: center;
  border-radius: 152px;
  background-color: #ffffff;
  border: ${(props) =>
    props.withBorder ? '0.76px solid #5c9eff' : '0.76px solid #F0F0F0'};
  overflow: hidden;

  img {
    width: 163px;
    height: 163px;
    object-fit: cover;
    border-radius: 152px;
    display: block;
  }
`;

const TeamTitleComponent = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;

const TeamTagContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6px;
  gap: 8px;
`;

const TeamTagComponent = styled.div`
  display: grid;
  place-content: center;
  text-align: center;
  padding: 0px 10px;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #5c9eff;
  background-color: #ffffff;
`;

export default MyTeams;
