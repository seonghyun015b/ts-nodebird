import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import useMyInfoQuery from '../queries/useMyInfoQuery';
import { unlikePostAPI } from '../../apis/post';
import Post from '../../interface/post';

const useUnLikeMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();

  return useMutation('likes', unlikePostAPI, {
    onMutate: () => {
      if (!me) return;

      queryClient.setQueryData<InfiniteData<Post[]>>('likes', (res) => {
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
        .getQueriesData('likes')
        .forEach((query) => queryClient.invalidateQueries(query[0]));
    },
  });
};

export default useUnLikeMutation;
