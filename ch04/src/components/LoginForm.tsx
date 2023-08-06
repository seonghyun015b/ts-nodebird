import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import { RootState } from '../reducers/type';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const dispatch = useDispatch();

  const { isLoggingIn } = useSelector((state: RootState) => state.user);

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginRequestAction({ id, password }));
  }, [id, password]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input name='user-id' value={id} onChange={onChangeId} required />
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
          <Button type='primary' htmlType='submit' loading={isLoggingIn}>
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
