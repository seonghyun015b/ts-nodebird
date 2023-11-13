'use client';

import React, { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useInput from '../../../hooks/useInput';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signUpAPI } from '../../../api/auth';

const SignUpForm = () => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation(signUpAPI, {
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: any) => {
      alert(error.response.data);
    },
  });

  const [email, handleEmail] = useInput('');
  const [nickname, handleNickname] = useInput('');
  const [password, handlePassword] = useInput('');
  const [passwordCheck, handlePasswordCheck] = useInput('');

  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const handleTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(passwordError, term);
      if (passwordError || !term) {
        return setTermError(true);
      }

      mutate({ email, nickname, password });
    },
    [email, nickname, password, passwordError, term]
  );

  useEffect(() => {
    setPasswordError(password !== passwordCheck);
  }, [password, passwordCheck, setPasswordError]);

  return (
    <FormControl error={passwordError && termError} component='form' onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            type='email'
            label='이메일'
            id='outlined-required'
            value={email}
            onChange={handleEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id='outlined-required'
            label='닉네임'
            value={nickname}
            onChange={handleNickname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type='password'
            required
            fullWidth
            id='outlined-required'
            label='비밀번호'
            value={password}
            error={passwordError}
            onChange={handlePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type='password'
            required
            fullWidth
            id='outlined-required'
            label='비밀번호 확인'
            value={passwordCheck}
            onChange={handlePasswordCheck}
            error={passwordError}
            helperText={passwordError && '비밀번호가 일치하지 않습니다.'}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={term} onChange={handleTerm}></Checkbox>}
            label='약관에 동의하세요.'
          />
          {termError && (
            <FormHelperText sx={{ color: 'red' }}>약관에 동의하셔야 합니다.</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained'>
            {isLoading ? <CircularProgress /> : '회원가입'}
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default SignUpForm;
