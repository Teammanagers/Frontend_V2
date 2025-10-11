import RoleTag from '@/shared/components/tag/RoleTag';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { PROFILE_FORM_KEYS } from '../profile.constants';

interface RoleTagEditorProps {
  isEditing: boolean;
}

export default function RoleTagEditor({ isEditing }: RoleTagEditorProps) {
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: PROFILE_FORM_KEYS.ROLE_TAG,
  });

  const handleAddRole = () => {
    append('새 역할');
  };

  return (
    <Container>
      <Title>자신있는 역할</Title>
      <ContentWrapper>
        {/* TODO: fields가 flat string 배열이 아닌 객체 형식의 배열로 나오는 문제 해결 필요 */}
        {fields.map((field) => (
          <RoleTag height={32} variants="ghost" key={field.id}>
            {/* {field.} */}
            기획자
          </RoleTag>
        ))}
        {isEditing && <AddButton type="button" onClick={handleAddRole} />}
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.strong`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const AddButton = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.mainBlue};
    border-radius: 1px;

    /* 가로 막대기 중앙 정렬 */
    left: 50%;
    top: 50%;
  }

  /* 세로 막대기 */
  &::before {
    width: 1px;
    height: 12px;
    transform: translate(-50%, -50%);
  }

  /* 가로 막대기 */
  &::after {
    width: 12px;
    height: 1px;
    transform: translate(-50%, -50%);
  }
`;
