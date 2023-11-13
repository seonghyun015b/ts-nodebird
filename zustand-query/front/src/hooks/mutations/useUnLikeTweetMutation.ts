import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import useMyInfoQuery from '../queries/useMyInfoQuery';
import Tweet from '../../types/tweet';
import { unlikePostAPI } from '../../api/tweet';

const useUnLikeTweetMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();

  return useMutation(['tweet'], unlikePostAPI, {
    onMutate: () => {
      if (!me) return;
      queryClient.setQueryData<InfiniteData<Tweet[]>>(['tweets'], (res) => {
        const found = res?.pages.flat().find((v) => v.id === postId);
        if (found) {
          const index = found.Likers.findIndex((v) => v.id === me.id);
          found.Likers.splice(index, 1);
        }
        return {
          pageParams: res?.pageParams || [],
          pages: res?.pages || [],
        };
      });
    },
    onSettled: () => {
      queryClient
        .getQueriesData(['tweets'])
        .forEach((query) => queryClient.invalidateQueries(query[0]));
    },
  });
};

export default useUnLikeTweetMutation;
