import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { logoutAPI } from '../apis/user';
import useMyInfoQuery from '../hooks/queries/useMyInfoQuery';

const UserProfile = () => {
  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();
  const { mutate, isLoading } = useMutation(logoutAPI, {
    onError: (err: any) => {
      alert(err.response?.data);
    },
    onSuccess: () => {
      queryClient.refetchQueries('user');
    },
  });

  const onLogOut = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />
          {me?.Posts.length}
        </div>,
        <div key='follower'>
          팔로워
          <br />
          {me?.Followers.length}
        </div>,
        <div key='following'>
          팔로잉
          <br />
          {me?.Followings.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me?.nickname[0]}</Avatar>} title={me?.nickname} />
      <Button onClick={onLogOut} loading={isLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
