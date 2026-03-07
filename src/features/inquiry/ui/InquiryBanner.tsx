import styled from 'styled-components';
import useToggle from '@/shared/hooks/action/useToggle';
import InquiryModal from './InquiryModal';

export default function InquiryBanner() {
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <Container>
        <p>
          팀매니저를 잘 사용하시고 계신가요? 이용 경험을 남겨주시면 서비스
          발전에 큰 도움이 됩니다! :)
        </p>

        <button onClick={() => toggle()}>이용경험 작성</button>
      </Container>

      <InquiryModal isOpen={isOpen} toggle={toggle} />
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 76px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.subLightBlue};

  p {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  button {
    width: 96px;
    height: 36px;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 12px;
    font-weight: 700;
    background-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
