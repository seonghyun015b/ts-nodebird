import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import { RootState } from '../reducers';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const { logInLoading, logInError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const [email, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-email'>아이디</label>
          <br />
          <Input
            name='user-email'
            value={email}
            onChange={onChangeId}
            required
          />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            name='user-password'
            type='password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <Button type='primary' htmlType='submit' loading={logInLoading}>
            로그인
          </Button>
          <Link href='/signup'>
            <Button>회원가입</Button>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
