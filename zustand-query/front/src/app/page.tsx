import { loadPostsAPI } from '../api/tweet';
import ClientPage from './page.client';

const Page = async () => {
  const data = await loadPostsAPI(undefined);
  const initialData = {
    pages: [data],
    pageParams: [undefined],
  };
  return (
    <>
      <ClientPage initialData={initialData} />
    </>
  );
};

export default Page;
