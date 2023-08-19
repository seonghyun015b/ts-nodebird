import React, { ChangeEvent, useCallback, useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
  color: red;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const Signup = () => {
  const [id, onChangeId] = useInput('');

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
    console.log(id, password, nickname);
  }, [id, nickname, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input name='user-id' value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor='user-nickname'>닉네임</label>
          <br />
          <Input
            name='user-nickname'
            value={nickname}
            onChange={onChangeNickname}
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
        <div>
          <label htmlFor='user-password-check'>비밀번호 확인</label>
          <br />
          <Input
            name='user-password-check'
            type='password'
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            약관에 동의하세요
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <ButtonWrapper>
          <Button type='primary' htmlType='submit'>
            가입하기
          </Button>
        </ButtonWrapper>
      </Form>
    </AppLayout>
  );
};

export default Signup;
