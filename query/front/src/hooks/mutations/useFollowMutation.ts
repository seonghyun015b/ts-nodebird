import { useMutation, useQueryClient } from 'react-query';
import { followAPI } from '../../apis/user';

const useFollowMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(followAPI, {
    onSuccess: () => {
      queryClient.refetchQueries('user');
      queryClient.refetchQueries('followings');
    },
    onError: () => {
      alert('팔로우에 실패하였습니다.');
    },
  });
  return mutation;
};

export default useFollowMutation;
