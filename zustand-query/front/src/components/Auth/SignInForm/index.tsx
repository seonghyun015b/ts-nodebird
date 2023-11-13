'use client';

import React, { useCallback } from 'react';
import { Box, Button, Grid, TextField, colors, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import useInput from '../../../hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginAPI } from '../../../api/auth';

function SignInForm() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [email, handleEmail] = useInput('');
  const [password, handlePassword] = useInput('');

  const { mutate, isLoading } = useMutation(loginAPI, {
    onError: (error: any) => {
      alert(error.response?.data);
    },
    onSuccess: async () => {
      console.log('로그인 성공');
      queryClient.refetchQueries(['user']);
    },
  });

  const handleForm = useCallback(() => {
    mutate({ email, password });
  }, [email, password, mutate]);

  return (
    <>
      <Box
        component='form'
        sx={{
          mt: 3,
          padding: '2rem',
          borderRadius: '1rem',
          backgroundColor: colors.grey[50],
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id='outlined-required'
              label='이메일'
              value={email}
              onChange={handleEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id='outlined-required'
              type='password'
              label='비밀번호'
              value={password}
              onChange={handlePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' onClick={handleForm}>
              로그인 {isLoading && <CircularProgress size={12} />}
            </Button>
            <Button variant='outlined' onClick={() => router.push('/signup')}>
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SignInForm;
