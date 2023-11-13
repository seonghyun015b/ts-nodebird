'use client';

import React, { useCallback } from 'react';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  colors,
} from '@mui/material';
import useMyInfoQuery from '../../../hooks/queries/useMyInfoQuery';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutAPI } from '../../../api/auth';

const MyProfile = () => {
  const router = useRouter();

  const { data: me } = useMyInfoQuery();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(logoutAPI, {
    onError: (err: any) => {
      alert(err.response?.data);
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user']);
    },
  });

  const handleLogout = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleProfile = useCallback(() => {
    router.push('/profile');
  }, []);

  return (
    <Card sx={{ minWidth: '20rem' }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar>{me?.nickname[0]}</Avatar>
            <Typography
              variant='button'
              display='block'
              sx={{ padding: '0.3rem', marginLeft: '0.5rem' }}
            >
              {me?.nickname}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label={me?.Followers.length}
          onClick={handleProfile}
          icon={'팔로우'}
        />
        <BottomNavigationAction
          label={me?.Followings.length}
          onClick={handleProfile}
          icon={'팔로워'}
        />
        <BottomNavigationAction label={me?.Posts.length} icon={'짹짹'} />
        <BottomNavigationAction
          label='로그아웃'
          onClick={handleLogout}
          sx={{ color: colors.red[500] }}
        />
      </BottomNavigation>
    </Card>
  );
};

export default MyProfile;
