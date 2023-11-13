'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMyInfoQuery from '../../../hooks/queries/useMyInfoQuery';
import { Button, CircularProgress, FormControl, Grid, TextField, Typography } from '@mui/material';
import useInput from '../../../hooks/useInput';
import { changeNicknameAPI } from '../../../api/user';
import { FormEvent, useEffect } from 'react';

const EditUserProfile = () => {
  const [editNickname, handleEditNickname, setEditNickname] = useInput<string>('');

  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();

  const { mutate, isLoading } = useMutation(changeNicknameAPI, {
    onSuccess: () => {
      queryClient.refetchQueries(['user']);
      alert('변경이 완료되었습니다.');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editNickname.trim()) {
      alert('변경할 이름을 입력해주세요');
    }
    mutate(editNickname);
  };

  useEffect(() => {
    me?.nickname && setEditNickname(me.nickname);
  }, [me, setEditNickname]);

  return (
    <FormControl component='form' sx={{ width: '100%' }} onSubmit={handleSubmit}>
      <Typography variant='h6' sx={{ textAlign: 'center', mb: '1rem' }}>
        회원정보 수정
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id='outlined-required'
            label='닉네임 변경'
            value={editNickname}
            onChange={handleEditNickname}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' type='submit'>
            {isLoading ? <CircularProgress size='1.5rem' /> : '정보 수정'}
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default EditUserProfile;
