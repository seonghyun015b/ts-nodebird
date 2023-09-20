import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import { RootState } from '../toolkit/index';
import Router from 'next/router';

const Profile = () => {
  const { me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={me?.Followings} />
        <FollowList header='팔로워 목록' data={me?.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
