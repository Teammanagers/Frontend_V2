import { useState } from 'react';
import styled from 'styled-components';
import logo from '@/shared/assets/common/logo.svg?url';
import { Button } from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });
  const [attempted, setAttempted] = useState(false);

  const isButtonEnabled = username.trim() !== '' && password.trim() !== '';

  const handleLogin = () => {
    setAttempted(true);

    const newErrors = {
      username: username.trim() === 'jkk',
      password: password.trim() === 'kkk',
    };

    setErrors(newErrors);

    // 모든 입력이 유효한 경우 로그인 처리
    if (!newErrors.username && !newErrors.password) {
      //   console.log('로그인 시도:', { username, password });
    }
  };

  return (
    <AdminLoginContainer>
      <TopContents>
        <img src={logo} width={90} height={90} alt="팀매니저 로고" />
        <Title>팀매니저 관리자 로그인</Title>
        <SubText>잘못 들어오신 분들은 뒤로가기를 눌러주시면 됩니다</SubText>
      </TopContents>
      <BottomContents>
        <Input
          title="아이디"
          placeholder="아이디를 입력해주세요"
          inputSize="mini"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          textColor={
            attempted && errors.username ? 'red' : 'rgba(29, 29, 29, 1)'
          }
        />
        <Input
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          inputSize="mini"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          textColor={
            attempted && errors.password ? 'red' : 'rgba(29, 29, 29, 1)'
          }
        />
        <Button
          size="large"
          style="main"
          disabled={!isButtonEnabled}
          onClick={handleLogin}
        >
          관리자 로그인
        </Button>
      </BottomContents>
    </AdminLoginContainer>
  );
}

const AdminLoginContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const TopContents = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 176px;
`;

const Title = styled.h3`
  margin-top: 18px;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
`;

const BottomContents = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;
