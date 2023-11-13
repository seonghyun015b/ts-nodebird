import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { CardActions, CircularProgress, IconButton } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import useMyInfoQuery from '../../../../hooks/queries/useMyInfoQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import User from '../../../../types/user';
import { AxiosError } from 'axios';
import { retweetAPI } from '../../../../api/tweet';
import useLikeTweetMutation from '../../../../hooks/mutations/useLikeTweetMutation';
import useUnLikeTweetMutation from '../../../../hooks/mutations/useUnLikeTweetMutation';

interface Props {
  setIsCommentOpen: Dispatch<SetStateAction<boolean>>;
  postId: number;
  likers?: Partial<User>[];
}

const TweetCardActions = ({ setIsCommentOpen, postId, likers = [] }: Props) => {
  const queryClient = useQueryClient();

  const { data: me } = useMyInfoQuery();

  const isLiked = likers.find((v) => me?.id && v.id === me.id);

  const { mutate: reTweetMutation, isLoading: reTweetIsLoading } = useMutation(retweetAPI, {
    onError: (e: AxiosError) => {
      alert(e.response?.data);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['tweets']);
    },
  });

  const toggleComment = () => {
    setIsCommentOpen((prev) => !prev);
  };

  const handleReTweet = useCallback(() => {
    reTweetMutation(postId);
  }, []);

  const { mutate: likeMutate } = useLikeTweetMutation(postId);

  const { mutate: unlikeMutate } = useUnLikeTweetMutation(postId);

  return (
    <CardActions disableSpacing>
      <IconButton onClick={handleReTweet}>
        {reTweetIsLoading ? <CircularProgress size='1.5rem' /> : <RepeatIcon />}
      </IconButton>
      <IconButton onClick={isLiked ? () => unlikeMutate(postId) : () => likeMutate(postId)}>
        <FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
      </IconButton>
      <IconButton onClick={toggleComment}>
        <ChatIcon />
      </IconButton>
    </CardActions>
  );
};

export default TweetCardActions;
