import { ProfileFormValues } from './model/profile.schema';

// 프로필 폼의 각 필드에 대한 키
export const PROFILE_FORM_KEYS = {
  USERNAME: 'username',
  PHONE: 'phone',
  ORGANIZATION: 'organization',
  IMG_URL: 'imgUrl',
  ROLE_TAG: 'roleTag',
} as const;

type ProfileFormFieldName = keyof Omit<ProfileFormValues, 'imgUrl' | 'roleTag'>;

interface ProfileInputField {
  name: ProfileFormFieldName;
  placeholder: string;
  type: 'text' | 'tel';
}

// 프로필 폼의 각 입력 필드
export const PROFILE_INPUT_FIELDS: ProfileInputField[] = [
  {
    name: PROFILE_FORM_KEYS.USERNAME,
    placeholder: '이름',
    type: 'text',
  },
  {
    name: PROFILE_FORM_KEYS.PHONE,
    placeholder: '전화번호',
    type: 'tel',
  },
  {
    name: PROFILE_FORM_KEYS.ORGANIZATION,
    placeholder: '소속',
    type: 'text',
  },
];
