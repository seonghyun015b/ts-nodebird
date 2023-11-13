import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { loadMyInfoAPI } from '../apis/user';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();

  const { data: me } = useQuery('user', loadMyInfoAPI);

  useEffect(() => {
    if (!me?.id) {
      router.replace('/');
    }
  }, [me, router]);

  const followerList = [
    { nickname: '제로초' },
    { nickname: '바보' },
    { nickname: '노드버드오피셜' },
  ];

  const followingList = [
    { nickname: '제로초' },
    { nickname: '바보' },
    { nickname: '노드버드오피셜' },
  ];

  return (
    <>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const data = await loadMyInfoAPI();
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanet: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Profile;
