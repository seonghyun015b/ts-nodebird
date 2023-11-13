import { Button } from '@mui/material';
import useMyInfoQuery from '../../../hooks/queries/useMyInfoQuery';
import User from '../../../types/user';
import useFollowMutation from '../../../hooks/mutations/useFollowMutation';
import { CircularProgress } from '@mui/material';
import useUnFollowMutation from '../../../hooks/mutations/useUnFollowMutation';

interface Props {
  user: Partial<User> & { id: number };
}

const FollowButton = ({ user }: Props) => {
  const { data: me } = useMyInfoQuery();

  const { mutate: followMutate, isLoading: followLoading } = useFollowMutation();

  const { mutate: unFollowMutate, isLoading: unfollowLoading } = useUnFollowMutation();

  const isFollowing = me?.Followings?.find((v) => v.id === user.id);

  return isFollowing ? (
    <Button onClick={() => unFollowMutate(user.id)}>
      언팔로우
      {unfollowLoading && <CircularProgress size={12} />}
    </Button>
  ) : (
    <Button onClick={() => followMutate(user.id)}>
      팔로우
      {followLoading && <CircularProgress size={12} />}
    </Button>
  );
};

export default FollowButton;
