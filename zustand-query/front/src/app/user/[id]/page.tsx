import { notFound } from 'next/navigation';
import { loadUserAPI, loadUserPostsAPI } from '../../../api/user';
import ClientPage from './page.client';

const UserTweetPage = async ({ params }: { params: { id: string } }) => {
  try {
    const data = await loadUserAPI(Number(params.id));
    const postData = await loadUserPostsAPI(Number(params.id), undefined);
    const initialPostData = {
      pages: [postData],
      pageParams: [undefined],
    };

    return <ClientPage params={params} initialUserInfo={data} initialPostData={initialPostData} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default UserTweetPage;
