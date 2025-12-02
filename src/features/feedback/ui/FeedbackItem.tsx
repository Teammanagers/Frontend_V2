import styled from 'styled-components';
import { Feedback } from '@/entities/feedback/feedback.types';
import Avatar from '@/shared/components/avatar/Avatar';
import { DEPT_PADDING_MULTIPLIER } from '../feedback.constants';

interface IFeedbackProps {
  feedback: Feedback;
  dept?: 0 | 1 | 2;
}

export default function FeedbackItem({ feedback, dept = 0 }: IFeedbackProps) {
  return (
    <Container $dept={dept}>
      <UserInfo>
        {/* TODO: 프로필 이미지 url 추가 (서버 API Response 수정 요청 필요) */}
        <Avatar imgUrl={''} size={20} />
        <div>
          <strong>{feedback.author.name}</strong>
          <span>{feedback.author.belong ? feedback.author.belong : ''}</span>
          <span>•</span>
          <span>{feedback.updatedAt}</span>
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
