import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import wrapper, { AppDispatch, RootState } from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { loadUserPostAction } from '../../toolkit/post';
import { loadMyInfoAction, loadUserAction } from '../../toolkit/user';

const User = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const { id } = router.query;

  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state: RootState) => state.post
  );

  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostLoading) {
          dispatch(
            loadUserPostAction({
              data: id as string,
              lastId:
                mainPosts[mainPosts.length - 1] &&
                mainPosts[mainPosts.length - 1].id,
            })
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta
            name='description'
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property='og:title'
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property='og:description'
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property='og:image'
            content='https://nodebird.com/favicon.ico'
          />
          <meta property='og:url' content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo ? (
        <Card
          actions={[
            <div key='twit'>
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key='following'>
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key='follower'>
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      await store.dispatch(
        loadUserPostAction({ data: params?.id as string, lastId: null })
      );

      await store.dispatch(loadMyInfoAction());

      await store.dispatch(loadUserAction());

      return {
        props: {},
      };
    }
);

export default User;
