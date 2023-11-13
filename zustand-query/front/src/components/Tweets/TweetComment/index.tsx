import React, { useState } from 'react';
import { Avatar, CardHeader, IconButton, List, ListItemButton, Paper } from '@mui/material';
import Comment from '../../../types/comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

interface Props {
  comment: Comment;
}

const TweetComment = ({ comment }: Props) => {
  const router = useRouter();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <CardHeader
      avatar={
        <Avatar sx={{ cursor: 'pointer' }} onClick={() => router.push(`user/${comment.User.id}`)}>
          {comment.User.nickname && comment.User.nickname[0]}
        </Avatar>
      }
      action={
        <>
          <IconButton aria-label='settings' onClick={toggleDropDown}>
            <MoreVertIcon />
          </IconButton>
          <Paper
            sx={{
              display: isDropDownOpen ? 'block' : 'none',
              position: 'absolute',
            }}
          >
            <List disablePadding>
              <ListItemButton>
                <DeleteIcon />
              </ListItemButton>
            </List>
          </Paper>
        </>
      }
      title={comment.User.nickname}
      subheader={comment.content}
    />
  );
};

export default TweetComment;
