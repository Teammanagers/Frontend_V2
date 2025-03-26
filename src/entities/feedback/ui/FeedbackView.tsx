import styled from 'styled-components';
import feedbackIcon from '@/shared/assets/icons/share/feedback.svg';

export function FeedbackView() {
  return (
    <Container>
      <NoticeText>자료에 대한 피드백을 남길 수 있습니다.</NoticeText>

      {/* 피드백 버튼 */}
      <FeedbackButton>
        <img src={feedbackIcon} alt="feedback-icon" />
        <span>피드백</span>
      </FeedbackButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 198px;
  height: 105px;
  gap: 19px;
`;

const NoticeText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const FeedbackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 66px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  flex-direction: column;
  gap: 6px;
  cursor: pointer;

  span {
    font-size: 10px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
