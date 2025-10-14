import styled from 'styled-components';
import fallbackImg from '@/shared/assets/common/profile-fallback.svg';

interface IAvatarProps extends React.ComponentProps<'div'> {
  imgUrl?: string | null;
  size?: number;
}

/**
 * 사용자 프로필 이미지를 표시하는 아바타 컴포넌트입니다.
 *
 * @param {Object} - 컴포넌트의 props
 * @param {string} imgUrl - 표시할 프로필 이미지의 URL입니다.
 * @param {number} [size=32] - 아바타의 크기(너비와 높이)를 지정합니다. 기본값은 32입니다.
 *
 * @example
 * <Avatar imgUrl="https://example.com/profile.jpg" size={40} />
 */

export default function Avatar({ imgUrl, size = 32, ...props }: IAvatarProps) {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImg;
  };

  return (
    <AvatarImgContainer $size={size} {...props}>
      <img
        src={imgUrl || fallbackImg}
        alt="profile-image"
        onError={handleImgError}
      />
    </AvatarImgContainer>
  );
}

const AvatarImgContainer = styled.div<{ $size?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $size }) => `${$size}`}px;
  height: ${({ $size }) => `${$size}`}px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
