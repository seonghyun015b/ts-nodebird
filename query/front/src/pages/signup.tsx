import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { styled } from 'styled-components';
import { useMutation, useQuery } from 'react-query';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { loadMyInfoAPI, signUpAPI } from '../apis/user';

import { useRouter } from 'next/navigation';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import User from '../interface/user';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const router = useRouter();

  const { data: me } = useQuery('user', loadMyInfoAPI);

  const { mutate, isLoading } = useMutation(signUpAPI, {
    onError: (err: any) => {
      alert(err.response.data);
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  useEffect(() => {
    if (me) {
      router.replace('/');
    }
  }, [me, router]);

  const [email, onChangeEmail] = useInput('');

  const [nickname, onChangeNickname] = useInput('');

  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [passwordError, setPasswordError] = useState(false);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    mutate({ email, nickname, password });
  }, [mutate, email, nickname, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor='user-email'>아이디</label>
          <br />
          <Input type='email' name='user-email' value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor='user-nickname'>닉네임</label>
          <br />
          <Input name='user-nickname' value={nickname} onChange={onChangeNickname} required />
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
        <div>
          <label htmlFor='user-password-check'>비밀번호 확인</label>
          <br />
          <Input
            name='user-password-check'
            type='password'
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            약관에 동의하세요.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const response = await loadMyInfoAPI();
  if (response?.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signup;
