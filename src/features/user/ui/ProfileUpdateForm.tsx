import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { User } from '@/entities/user/user.types';
import ProfileImageUploader from './ProfileImageUploader';
import { ProfileFormValues, profileSchema } from '../model/profile.schema';
import { PROFILE_FORM_KEYS, PROFILE_INPUT_FIELDS } from '../profile.constants';

// 프로필 수정 폼 컴포넌트
export default function ProfileUpdateForm({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const memberDto = user.memberDto;
  const initProfileValues: ProfileFormValues = {
    name: memberDto.name || '',
    telNum: memberDto.telNum || '',
    belong: memberDto.belong || '',
    imgUrl: user.imgUrl || '',

    // TOOD: API '역할 태그' 데이터 필드 추가 시 수정 필요
    // roleTag: data.roleTag || [],
  };

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initProfileValues,
  });
  const { register, handleSubmit, setFocus } = methods;

  // 편집 모드 진입 시 첫 번째 입력란에 포커스 설정
  useEffect(() => {
    if (isEditing) setFocus(PROFILE_FORM_KEYS.USERNAME);
  }, [isEditing, setFocus]);

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('제출된 데이터', data);
    setIsEditing(false);
  };

  return (
    <FormProvider {...methods}>
      <FormContainer
        onSubmit={handleSubmit(onSubmit, (err) =>
          console.log('유효성 검사 실패', err),
        )}
      >
        <Header>
          <strong>프로필 설정</strong>
          {isEditing ? (
            <UpdateCompleteButton type="submit">수정 완료</UpdateCompleteButton>
          ) : (
            <UpdateTriggerButton
              type="button"
              onClick={() => setIsEditing(true)}
            >
              수정
            </UpdateTriggerButton>
          )}
        </Header>

        <FormBody>
          <UserInfo>
            {/* 프로필 이미지 */}
            <ProfileImageUploader isEditing={isEditing} />

            {/* 이름, 전화번호, 소속 */}
            <InputWrapper>
              {PROFILE_INPUT_FIELDS.map((field) => (
                <Input
                  key={field.name}
                  type={field.type}
                  disabled={!isEditing}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                />
              ))}
            </InputWrapper>
          </UserInfo>

          {/* TODO: API '역할 태그' 데이터 필드 추가 시 수정 필요 */}
          {/* 자신 있는 역할 */}
          {/* {initProfileValues.roleTag && initProfileValues.roleTag?.length > 0 && (
            <RoleTagEditor isEditing={isEditing} />
          )} */}
        </FormBody>
      </FormContainer>
    </FormProvider>
  );
}

const FormContainer = styled.form`
  width: 100%;
  margin-bottom: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  strong {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ButtonBase = styled.button`
  width: 96px;
  height: 36px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  transition: background-color 0.3s;
`;

const UpdateCompleteButton = styled(ButtonBase)`
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.mainBlue};

  &:hover {
    background-color: ${({ theme }) => theme.colors.subLightBlue};
  }
`;

const UpdateTriggerButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: #3c8bff;
  }
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
