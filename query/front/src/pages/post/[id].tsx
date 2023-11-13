import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { loadPostAPI } from '../../apis/post';
import { GetStaticPropsContext } from 'next';

const SinglePost = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: singlePost } = useQuery(['post', id], () => loadPostAPI(Number(id)));

  if (!singlePost) {
    return <div>존재하지 않는 게시글입니다.</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name='description' content={singlePost.content} />
        <meta property='og:title' content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property='og:description' content={singlePost.content} />
        <meta
          property='og:image'
          content={
            singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta property='og:url' content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
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
  await queryClient.prefetchQuery(['post', id], () => loadPostAPI(Number(id)));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default SinglePost;
