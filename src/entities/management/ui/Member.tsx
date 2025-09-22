import styled from 'styled-components';
import Default from '@/shared/assets/management/profile-img-default.svg?react';
import { IMemberResponse } from '@/shared/types/member.types.ts';

interface IMemberProps {
  member: IMemberResponse;
}

export const Member = ({ member }: IMemberProps) => {
  return (
    <MemberContainer>
      {member.imgUrl ? (
        <ProfileImg src={member.imgUrl} alt="profile" />
      ) : (
        <Default width={40} height={40} />
      )}
      <Name>{member.member.name}</Name>
      <TagContainer>
        <TagBox>
          <TagText>기획자</TagText>
        </TagBox>
        <TagBox>
          <TagText>기획자</TagText>
        </TagBox>
        <TagBox>
          <TagText>기획자</TagText>
        </TagBox>
      </TagContainer>
    </MemberContainer>
  );
};

const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 44px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-right: 4px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px 5px 8px;
  height: 28px;
  border-radius: 3px;
  background: white;
`;

export const TagText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;
