import styled from 'styled-components';
import { FeedbackResponse, FeedbackDept } from '../feedback.types';
import Avatar from '@/shared/components/avatar/Avatar';

interface IFeedbackProps {
  feedback: FeedbackResponse;
  dept?: FeedbackDept;
}

export default function Feedback({ feedback, dept = 0 }: IFeedbackProps) {
  return (
    <Container $dept={dept}>
      <UserInfo>
        <Avatar imgUrl={feedback.imgUrl} />
        <div>
          <strong>{feedback.name}</strong>
          <span>•</span>
          <span>{feedback.tagList[0]}</span>
          <span>•</span>
          <span>{feedback.date}</span>
        </div>
      </UserInfo>

      <Content>{feedback.content}</Content>

      <ReplyButton>답글달기</ReplyButton>
    </Container>
  );
}

const Container = styled.li<{ $dept: 0 | 1 | 2 }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  height: 67px;
  padding: 0 ${({ $dept }) => 18 * $dept}px;
  list-style: none;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 400;

  & > div {
    display: flex;
    gap: 4px;
  }

  strong {
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const Content = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

const ReplyButton = styled.button`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;
