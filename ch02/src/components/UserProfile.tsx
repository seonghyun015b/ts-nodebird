import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';

interface UserProfileProp {
  setIsLoggedIn: (value: boolean) => void;
}

const UserProfile = ({ setIsLoggedIn }: UserProfileProp) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          짹짹
          <br />0
        </div>,
        <div key='follower'>
          팔로워
          <br />0
        </div>,
        <div key='following'>
          팔로잉
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ZC</Avatar>} title='ZeroCho' />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
