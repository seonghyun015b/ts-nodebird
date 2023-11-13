'use client';

import { Box, Grid, Typography, colors } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loadFollowersAPI, loadFollowingsAPI } from '../../api/user';
import useUnFollowMutation from '../../hooks/mutations/useUnFollowMutation';
import useMyInfoQuery from '../../hooks/queries/useMyInfoQuery';
import EditUserProfile from '../../components/Users/EditUserProfile';
import FollowList from '../../components/Users/FollowList';
import useUnFollowerMutation from '../../hooks/mutations/useUnFollowerMutation';
import { useEffect } from 'react';

const ProfilePage = () => {
  const router = useRouter();

  const {
    data: followings,
    isLoading: followingsLoading,
    error: followingsError,
    fetchNextPage: fetchNextFollowings,
    hasNextPage: hasNextFollowings,
  } = useInfiniteQuery(['followings'], ({ pageParam = 5 }) => loadFollowingsAPI(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < pages.length * 5) return;
      return (pages.length + 1) * 5;
    },
  });

  const {
    data: followers,
    isLoading: followersLoading,
    error: followersError,
    fetchNextPage: fetchNextFollowers,
    hasNextPage: hasNextFollowers,
  } = useInfiniteQuery(['followers'], ({ pageParam = 5 }) => loadFollowersAPI(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < pages.length * 5) return;
      return (pages.length + 1) * 5;
    },
  });

  const { mutate: unFollowMutate } = useUnFollowMutation();
  const { mutate: unFollowerMutate } = useUnFollowerMutation();

  const { data: me } = useMyInfoQuery();

  useEffect(() => {
    if (!me) router.push('/');
  }, [me, router]);

  return (
    <>
      <Box component='div' sx={{ mt: '1rem', backgroundColor: colors.grey[50], padding: '1rem' }}>
        <EditUserProfile />
      </Box>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Box
            component='div'
            sx={{ mt: '1rem', backgroundColor: colors.grey[50], padding: '1rem' }}
          >
            <Typography variant='h6' sx={{ textAlign: 'center', mb: '1rem' }}>
              팔로잉
            </Typography>
            {followings && (
              <FollowList
                data={followings}
                fetchNextPage={fetchNextFollowings}
                hasNextPage={hasNextFollowings}
                unFollowMutate={unFollowMutate}
              />
            )}
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box
            component='div'
            sx={{ mt: '1rem', backgroundColor: colors.grey[50], padding: '1rem' }}
          >
            <Typography variant='h6' sx={{ textAlign: 'center', mb: '1rem' }}>
              팔로우
            </Typography>
            {followers && (
              <FollowList
                data={followers}
                fetchNextPage={fetchNextFollowers}
                hasNextPage={hasNextFollowers}
                unFollowMutate={unFollowerMutate}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
