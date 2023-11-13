import { notFound } from 'next/navigation';
import ClientPage from './page.client';
import { loadPostAPI } from '../../../api/tweet';

const PostPage = async ({ params }: { params: { id: string } }) => {
  try {
    const data = await loadPostAPI(Number(params.id));
    return <ClientPage params={params} initialTweet={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default PostPage;
