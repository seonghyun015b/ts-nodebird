import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/configureStore';
import { logoutAction } from '../toolkit/user';
import Link from 'next/link';

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
            <Link href={`/user/${me?.id}`}>
              짹짹
              <br />
              {me?.Posts.length}
            </Link>
          </div>,
          <div key='follower'>
            <Link href='/profile'>
              팔로워
              <br />
              {me?.Followings.length}
            </Link>
          </div>,
          <div key='following'>
            <Link href='/profile'>
              팔로잉
              <br />
              {me?.Followers.length}
            </Link>
          </div>,
        ]}
      >
        <Card.Meta
          avatar={
            <Link href={`/user/${me?.id}`}>
              <Avatar>{me?.nickname[0]}</Avatar>
            </Link>
          }
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
