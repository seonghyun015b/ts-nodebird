'use client';

import { IconButton, Snackbar } from '@mui/material';
import TweetCardList from '../components/Tweets/TweetCardList';
import TweetCardForm from '../components/Tweets/TweetCardForm';
import useGlobalStore from '../zustand/store';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { loadPostsAPI } from '../api/tweet';
import CloseIcon from '@mui/icons-material/Close';
import Tweet from '../types/tweet';

interface Props {
  initialData: InfiniteData<Tweet[]>;
}

const ClientPage = ({ initialData }: Props) => {
  const { snackBar, closeSnackBar } = useGlobalStore();

  const {
    data,
    isFetching: loadPostsLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['tweets'], ({ pageParam = '' }) => loadPostsAPI(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage?.[lastPage.length - 1]?.id;
    },
    initialData: initialData,
    enabled: false,
  });

  const action = (
    <IconButton size='small' aria-label='close' color='inherit' onClick={() => closeSnackBar()}>
      <CloseIcon fontSize='small' />
    </IconButton>
  );

  if (!data) return <></>;

  return (
    <>
      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={3000}
        message={snackBar.message}
        onClose={() => closeSnackBar()}
        action={action}
      />
      <TweetCardForm />
      <TweetCardList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={loadPostsLoading}
      />
    </>
  );
};

export default ClientPage;
