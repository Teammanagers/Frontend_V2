import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  subTitle?: string;
  placeholder: string;
  child?: React.ReactNode;
  showHelperMessage?: boolean;
  helperMessage?: string;
  textColor?: string;
}

export default function Input({
  title,
  subTitle,
  placeholder,
  child,
  showHelperMessage = false,
  helperMessage,
  textColor = 'rgba(29, 29, 29, 1)',
  ...restProps
}: IInputProps) {
  return (
    <InputWrapper>
      <Title>
        <MainTitle>{title}</MainTitle>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Title>

      <InputContainer>
        {child ? (
          // child가 있으면 child를 렌더링
          child
        ) : (
          // child가 없으면 기본 input 요소 렌더링
          <DefaultInput
            placeholder={placeholder}
            $textColor={textColor}
            {...restProps}
          />
        )}
      </InputContainer>

      {showHelperMessage && (
        <HelperText $textColor={textColor}>{helperMessage}</HelperText>
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 664px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const MainTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #333;
`;

const SubTitle = styled.span`
  font-size: 10px;
  line-height: 150%;
  font-weight: 400;
  color: rgba(29, 29, 29, 1);
`;

const InputContainer = styled.div`
  width: 100%;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 6px;
  overflow: hidden;
`;

// 기본 input 요소 (child가 없을 때, 컨테이너가 Input인 것처럼 보이게)
const DefaultInput = styled.input<{ $textColor: string }>`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  padding: 12px 18px 12px 18px;
  color: ${(props) => props.$textColor};

  &::placeholder {
    padding: 12px 0 12px 0;
    color: rgba(90, 90, 90, 1);
  }
`;

const HelperText = styled.span<{ $textColor: string }>`
  margin-top: 8px;
  font-size: 14px;
  color: ${(props) => props.$textColor};
`;
