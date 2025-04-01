import styled from 'styled-components';

function Dot({ isSelected }: { isSelected: boolean }) {
  return <Container $isSelected={isSelected} />;
}

export { Dot };

const Container = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  bottom: 23%;
  left: 50%;
  transform: translate(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? 'white' : theme.colors.mainBlue};
`;
