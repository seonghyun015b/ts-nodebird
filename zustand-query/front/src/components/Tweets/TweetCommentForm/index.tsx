import { Textarea } from '@mui/joy';
import { Button, CircularProgress, FormControl, List, ListItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMyInfoQuery from '../../../hooks/queries/useMyInfoQuery';
import useInput from '../../../hooks/useInput';
import useSnackBar from '../../../hooks/useSnackBar';
import { addCommentAPI } from '../../../api/tweet';
import { FormEvent, useCallback } from 'react';

interface Props {
  postId: number;
}

const TweetCommentForm = ({ postId }: Props) => {
  const queryClient = useQueryClient();
  const { data: me } = useMyInfoQuery();

  const [comment, handleComment, setComment] = useInput('');

  const openSnackBar = useSnackBar('댓글 작성이 완료되었습니다.');

  const { mutate, isLoading } = useMutation(addCommentAPI, {
    onSuccess: () => {
      setComment('');
      queryClient.refetchQueries(['tweets']);
      openSnackBar();
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!comment.trim()) {
        return alert('댓글을 작성하세요.');
      }
      me && mutate({ userId: me.id, content: comment, postId: postId });
    },
    [comment, me, mutate, postId]
  );

  if (!me) return <></>;

  return (
    <FormControl component='form' sx={{ width: '100%' }} onSubmit={handleSubmit}>
      <List>
        <ListItem>
          <Textarea
            sx={{ width: '100%' }}
            onChange={handleComment}
            slotProps={{
              textarea: {
                id: 'unique-id',
              },
            }}
            minRows={2}
            maxRows={2}
          />
        </ListItem>
        <ListItem>
          <Button variant='contained' type='submit'>
            {isLoading ? <CircularProgress size='1.5rem' /> : '댓글작성'}
          </Button>
        </ListItem>
      </List>
    </FormControl>
  );
};

export default TweetCommentForm;
