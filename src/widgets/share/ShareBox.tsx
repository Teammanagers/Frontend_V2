import styled from 'styled-components';
import { useFileStateContext } from '@/entities/share/model/useFileStateContext';
import { EmptyState } from '@/entities/share/ui/EmptyState';
import { FileListView } from '@/entities/share/ui/FileListView';

export function ShareBox() {
  const { hasFiles } = useFileStateContext();

  return <Container>{hasFiles ? <FileListView /> : <EmptyState />}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 534px;
  height: 631px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;
