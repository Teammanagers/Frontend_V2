import styled from 'styled-components';
import { Theme } from '@/app/styles/theme';
import FeedbackIcon from '@/shared/assets/resource/feedback.svg?react';

interface IAddResourceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function AddFeedbackButton({
  disabled = false,
  ...props
}: IAddResourceButtonProps) {
  return (
    <Container $disabled={disabled} {...props}>
      <FeedbackIcon />
      <span>피드백</span>
    </Container>
  );
}

const Container = styled.button<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 78px;
  height: 66px;
  border: 1px solid ${Theme.colors.lightGray};
  border-radius: 6px;
  background-color: ${Theme.colors.white};
  font-size: 10px;
  font-weight: 400;
  color: ${Theme.colors.darkGray};

  &:hover {
    border-color: ${Theme.colors.mainBlue};
    background-color: ${Theme.colors.background};
    transition: all 0.3s ease-in;
    color: ${Theme.colors.black};

    path {
      stroke: ${Theme.colors.black};
    }
  }

  ${({ $disabled }) =>
    $disabled &&
    `
      pointer-events: none;

      &:hover {
        border-color: ${Theme.colors.lightGray};
        background-color: ${Theme.colors.white};
        color: ${Theme.colors.lightGray};
      }
    `}
`;
