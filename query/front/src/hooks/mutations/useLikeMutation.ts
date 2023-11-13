import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import useMyInfoQuery from '../queries/useMyInfoQuery';
import Post from '../../interface/post';
import { likePostAPI } from '../../apis/post';

const useLikeMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();

  return useMutation(['likes', postId], likePostAPI, {
    onSuccess: () => {
      if (me) {
        queryClient.setQueriesData<InfiniteData<Post[]>>('likes', (res) => {
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
        .getQueriesData('likes')
        .forEach((query) => queryClient.invalidateQueries(query[0]));
    },
  });
};
export default useLikeMutation;
