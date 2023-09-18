import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/configureStore';
import { logoutAction } from '../toolkit/user';

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
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
            {me?.Followings.length}
          </div>,
          <div key='following'>
            팔로잉
            <br />
            {me?.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me?.nickname[0]}</Avatar>}
          title={me?.nickname}
        />
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </Card>
    </>
  );
};

export default UserProfile;
