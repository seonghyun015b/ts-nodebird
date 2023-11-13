import { useMutation, useQueryClient } from 'react-query';
import { unfollowAPI } from '../../apis/user';

const useUnFollowMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(unfollowAPI, {
    onSuccess: () => {
      queryClient.refetchQueries('user');
      queryClient.refetchQueries('following');
    },
    onError: () => {
      alert('언팔로우에 실패하였습니다.');
    },
  });
  return mutation;
};

export default useUnFollowMutation;
