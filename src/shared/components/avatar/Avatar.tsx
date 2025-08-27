import styled from 'styled-components';

interface IAvatarPorps {
  imgUrl: string;
}

export default function Avatar({ imgUrl }: IAvatarPorps) {
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
