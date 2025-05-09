import styled from 'styled-components';
import Default from '@/shared/assets/management/profile-img-default.svg?react';

export const Member = () => {
  return (
    <MemberContainer>
      <Default width={40} height={40} />
      <Name>이예은</Name>
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

const TagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px 5px 8px;
  height: 28px;
  border-radius: 3px;
  background: white;
`;

const TagText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;
