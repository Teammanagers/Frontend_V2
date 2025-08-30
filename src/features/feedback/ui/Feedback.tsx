import styled from 'styled-components';
import { FeedbackResponse } from '../feedback.types';
import Avatar from '@/shared/components/avatar/Avatar';
import { DEPT_PADDING_MULTIPLIER } from '../feedback.constants';

interface IFeedbackProps {
  feedback: FeedbackResponse;
  dept?: 0 | 1 | 2;
}

export default function Feedback({ feedback, dept = 0 }: IFeedbackProps) {
  return (
    <Container $dept={dept}>
      <UserInfo>
        <Avatar imgUrl={feedback.imgUrl} size={20} />
        <div>
          <strong>{feedback.name}</strong>
          <span>•</span>
          <span>
            {feedback.tagList && feedback.tagList.length > 0
              ? feedback.tagList[0]
              : ''}
          </span>
          <span>•</span>
          <span>{feedback.date}</span>
        </div>
      </UserInfo>

      <Content>{feedback.content}</Content>

      {dept !== 2 && <ReplyButton>답글달기</ReplyButton>}
    </Container>
  );
}

const Container = styled.li<{ $dept: 0 | 1 | 2 }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  height: fit-content;
  padding: 0 ${({ $dept }) => DEPT_PADDING_MULTIPLIER * $dept}px;
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
