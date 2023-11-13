import { Avatar } from '@mui/material';
import User from '../../../types/user';
import { useRouter } from 'next/navigation';

interface Props {
  user: Partial<User> & { id: number };
}

const UserAvatar = ({ user }: Props) => {
  const router = useRouter();
  return (
    <Avatar
      sx={{ bgcolor: 'red', cursor: 'pointer' }}
      aria-label='recipe'
      onClick={() => router.push(`user/${user.id}`)}
    >
      {user.nickname && user.nickname[0]}
    </Avatar>
  );
};

export default UserAvatar;
