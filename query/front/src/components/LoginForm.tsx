import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useMutation, useQueryClient } from 'react-query';
import { loginAPI } from '../apis/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const queryClient = useQueryClient();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const { mutate, isLoading } = useMutation(loginAPI, {
    onError: (err: any) => {
      alert(err.response?.data);
    },
    onSuccess: () => {
      console.log('로그인 성공');
      queryClient.refetchQueries('user');
    },
  });

  const onSubmitForm = useCallback(() => {
    mutate({ email, password });
  }, [email, password, mutate]);

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-email'>아이디</label>
          <br />
          <Input type='email' name='user-email' value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor='user-password'>비밀번호</label>
          <br />
          <Input
            type='password'
            name='user-password'
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <Button type='primary' htmlType='submit' loading={isLoading}>
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
