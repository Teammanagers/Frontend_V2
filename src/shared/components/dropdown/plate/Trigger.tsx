import styled from 'styled-components';
import { IDropdownTrigger } from '@/shared/types';

/**
 * DropdownTrigger 컴포넌트는 드롭다운 트리거를 위한 컨테이너를 제공합니다.
 *
 * @param {ReactNode} children - 드롭다운 트리거의 내용.
 * @param {() => void} onClick - 드롭다운 트리거를 클릭했을 때 호출되는 함수.
 */

const DropdownTrigger = ({ children, onClick }: IDropdownTrigger) => {
  return (
    <Container onClick={onClick}>
      <IconWrapper>{children}</IconWrapper>
    </Container>
  );
};

export default DropdownTrigger;

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
