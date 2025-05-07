import { useRef, useState } from 'react';
import styled from 'styled-components';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import firstImg from '@/shared/assets/common/login-first-slide.svg?url';
import secondImg from '@/shared/assets/common/login-second-slide.svg?url';
import thirdImg from '@/shared/assets/common/login-third-slide.svg?url';

export default function LeftBar() {
  const [swiperIdx, setSwiperIdx] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null); // swiper는 큰 객체기 때문에 useState로 관리하면 큰 리렌더링 발생 가능성 -> 값이 변경돼도 리렌더링 필요없는 useRef 사용
  const IMAGE_ARRAY = [
    { id: 1, url: firstImg },
    { id: 2, url: secondImg },
    { id: 3, url: thirdImg },
  ];
  const handleSlide = (idx: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(idx);
    }
  };
  return (
    <LeftContainer>
      <SwiperWrapper>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          slidesPerView={1}
          onSwiper={(swiperObj) => {
            // Swiper 사용 완료되면 onSwiper 콜백 -> swiper 인스턴스 제공
            swiperRef.current = swiperObj;
          }}
          onSlideChange={(swiper) => setSwiperIdx(swiper.realIndex)}
        >
          {IMAGE_ARRAY.map((img) => (
            <SwiperSlide key={img.id}>
              <SlideImg src={img.url} />
            </SwiperSlide>
          ))}
        </Swiper>
        <DotContainer>
          {IMAGE_ARRAY.map((_, idx) => (
            <Dot
              onClick={() => handleSlide(idx)}
              $isActive={idx === swiperIdx}
            ></Dot>
          ))}
        </DotContainer>
      </SwiperWrapper>
    </LeftContainer>
  );
}

const LeftContainer = styled.div`
  width: 547px;
`;

const SwiperWrapper = styled.div`
  position: relative;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 37px;
  z-index: 50;
  position: absolute;
  gap: 10px;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 19px 0 0 19px;
`;

const Dot = styled.button<{ $isActive: boolean }>`
  height: 9px;
  width: ${({ $isActive }) => ($isActive ? '18px' : '9px')};
  border-radius: ${({ $isActive }) => ($isActive ? '76px' : '50%')};
  background-color: ${({ $isActive }) =>
    $isActive ? 'white' : 'rgba(255, 255, 255, 0.3)'};
`;
