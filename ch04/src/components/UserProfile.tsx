import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import { RootState } from '../reducers/type';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { me, logOutLoading } = useSelector((state: RootState) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key='follower'>
          팔로워
          <br />
          {me.Followings.length}
        </div>,
        <div key='following'>
          팔로잉
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
