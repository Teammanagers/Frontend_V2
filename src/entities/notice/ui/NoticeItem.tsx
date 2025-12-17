import dayjs from 'dayjs';
import styled from 'styled-components';
import { NoticeResponse } from '../notice.types';

function NoticeItem({
  outDated,
  notice,
}: {
  outDated: boolean;
  notice: NoticeResponse;
}) {
  return (
    <Container $outDated={outDated}>
      <Content>{notice.notice.content}</Content>
      <Date>{dayjs(notice.notice.createdAt).format('YYYY.MM.DD HH:mm')}</Date>
    </Container>
  );
}

export { NoticeItem };

const Content = styled.p``;

const Date = styled.span``;

const Container = styled.li<{ $outDated: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  border-radius: 6px;
  background-color: ${({ $outDated, theme }) =>
    $outDated ? theme.colors.lightGray : theme.colors.white};

  ${Content} {
    font-size: 14px;
    font-weight: 700;
    color: ${({ $outDated, theme }) =>
      $outDated ? theme.colors.gray : theme.colors.black};
    margin-bottom: 6px;
    white-space: pre-wrap; /* 개행, 공백 유지 */
  }

  ${Date} {
    height: 15px;
    font-size: 10px;
    font-weight: 400;
    text-align: right;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
