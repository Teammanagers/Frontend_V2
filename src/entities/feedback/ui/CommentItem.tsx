import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dotIcon from '@/shared/assets/icons/share/dot.svg';
import ProfileExampleIcon from '@/shared/assets/icons/share/profile-example.svg';

interface CommentItemProps {
  author: string;
  role: string;
  content: string;
}

export function CommentItem({ author, role, content }: CommentItemProps) {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      return `${year}.${month}.${day} ${hours}:${minutes}`;
    };
    setTimestamp(getCurrentTime());
  }, []);

  return (
    <Container>
      <UserInfoBox>
        <img src={ProfileExampleIcon} alt="profile-example-icon" />
        <UserInfo>
          <p>{author}</p>
          <img src={dotIcon} alt="dot-icon" />
          <p>{role}</p>
          <img src={dotIcon} alt="dot-icon" />
          <p>{timestamp}</p>
        </UserInfo>
      </UserInfoBox>
      <CommentBox>{content}</CommentBox>
      <ReplyButton>답글달기</ReplyButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 486px;
  padding: 0px 18px;
  gap: 8px;
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;

  img {
    width: 2px;
    height: 2px;
  }
`;

const CommentBox = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const ReplyButton = styled.div`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
  cursor: pointer;
`;
