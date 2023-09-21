import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Avatar, Card } from 'antd';
import { SagaStore, wrapper } from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';
import { RootState } from '../reducers';

const About = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>About | NodeBird</title>
      </Head>
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
            description='노드버드 매니아'
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

// SSR

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default About;
