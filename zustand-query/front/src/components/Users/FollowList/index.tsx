import { InfiniteData, UseMutateFunction } from '@tanstack/react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import User from '../../../types/user';
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

interface Props {
  data: InfiniteData<User[]>;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  unFollowMutate: UseMutateFunction<any, unknown, number, unknown>;
}

const FollowList = ({ data, fetchNextPage, hasNextPage, unFollowMutate }: Props) => {
  return (
    <>
      {data.pages[data.pages.length - 1].map((user) => (
        <List key={user.id}>
          <ListItem
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={() => unFollowMutate(user.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>{user.nickname[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.nickname} />
          </ListItem>
        </List>
      ))}
      {hasNextPage && (
        <Button variant='contained' onClick={fetchNextPage}>
          더보기
        </Button>
      )}
    </>
  );
};

export default FollowList;
