import styled from 'styled-components';

export default function SignUpStage() {
  return (
    <SignUpContainer>
      <TitleContainer></TitleContainer>
      <AgreeContainer></AgreeContainer>
      <SignUpBtn></SignUpBtn>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 547px;
  gap: 48px;
`;

const TitleContainer = styled.div``;

const AgreeContainer = styled.div``;

const SignUpBtn = styled.button``;
