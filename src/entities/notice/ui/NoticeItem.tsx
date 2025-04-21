import styled from 'styled-components';
import { FetchNoticeResponse } from '../notice.types';
import dayjs from 'dayjs';

function NoticeItem({
  outDated,
  notice,
}: {
  outDated: boolean;
  notice: FetchNoticeResponse;
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
  min-height: 58px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.subLightBlue};
  border-radius: 6px;
  background-color: ${({ $outDated, theme }) =>
    $outDated ? theme.colors.lightGray : theme.colors.white};

  ${Content} {
    height: 21px;
    font-size: 14px;
    font-weight: 700;
    color: ${({ $outDated, theme }) =>
      $outDated ? theme.colors.gray : theme.colors.black};
    margin-bottom: 6px;
  }

  ${Date} {
    height: 15px;
    font-size: 10px;
    font-weight: 400;
    text-align: right;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
