import styled from 'styled-components';

interface IAvatarProps {
  imgUrl: string;
}

export default function Avatar({ imgUrl }: IAvatarProps) {
  // imgUrl이 없을 때 (에러 시) 기본 이미지로 대체하는 로직 추가 필요
  return (
    <AvatarImgContainer>
      <img src={imgUrl} alt="profile-image" />
    </AvatarImgContainer>
  );
}

const AvatarImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
