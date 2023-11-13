import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import { QueryClient, dehydrate, useInfiniteQuery, useQuery } from 'react-query';
import { loadMyInfoAPI, loadUserAPI, loadUserPostsAPI } from '../../apis/user';
import { useRouter } from 'next/router';
import { Avatar, Card } from 'antd';
import PostCard from '../../components/PostCard';
import { GetStaticPropsContext } from 'next';

const UserPosts = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: userInfo } = useQuery(['user', id], () => loadUserAPI(Number(id)));

  const { data: me } = useQuery('user', loadMyInfoAPI);

  const {
    data,
    isLoading: laodPostsLoading,
    fetchNextPage,
  } = useInfiniteQuery(
    ['user', id, 'posts'],
    ({ pageParam = '' }) => loadUserPostsAPI(Number(id), pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.[lastPage.length - 1]?.id;
      },
    }
  );

  const mainPosts = data?.pages.flat();

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name='description' content={`${userInfo.nickname}님의 게시글`} />
          <meta property='og:title' content={`${userInfo.nickname}님의 게시글`} />
          <meta property='og:description' content={`${userInfo.nickname}님의 게시글`} />
          <meta property='og:image' content='https://nodebird.com/favicon.ico' />
          <meta property='og:url' content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && userInfo.id !== me?.id ? (
        <Card
          style={{ marginBottom: 20 }}
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
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts?.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const queryClient = new QueryClient();
  const id = context.params?.id as string;
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  await queryClient.prefetchInfiniteQuery(['user', id], () => loadUserPostsAPI(Number(id)));
  await queryClient.prefetchQuery(['user', id], () => loadUserPostsAPI(Number(id)));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
export default UserPosts;
