import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import useMyInfoQuery from '../queries/useMyInfoQuery';
import Tweet from '../../types/tweet';
import { likePostAPI } from '../../api/tweet';

const useLikeTweetMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();

  return useMutation(['tweet', postId], likePostAPI, {
    onSuccess: () => {
      if (me) {
        queryClient.setQueryData<InfiniteData<Tweet[]>>(['tweets'], (res) => {
          const found = res?.pages.flat().find((v) => v.id === postId);
          if (found) {
            found.Likers.push({ id: me.id });
          }
          return {
            pageParams: res?.pageParams || [],
            pages: res?.pages || [],
          };
        });
      }
    },
    onSettled: () => {
      queryClient
        .getQueriesData(['tweets'])
        .forEach((query) => queryClient.invalidateQueries(query[0]));
    },
  });
};

export default useLikeTweetMutation;
