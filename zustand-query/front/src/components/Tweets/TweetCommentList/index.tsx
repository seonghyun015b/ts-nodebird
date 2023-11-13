import { Card, CardContent, Typography } from '@mui/material';
import TweetCommentForm from '../TweetCommentForm';
import Tweet from '../../../types/tweet';
import TweetComment from '../TweetComment';
import User from '../../../types/user';

interface Props {
  open: boolean;
  data: Tweet;
}

const TweetCommentList = ({ open, data }: Props) => {
  return (
    <Card sx={{ display: open ? 'block' : 'none' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          댓글({data.Comments.length})
        </Typography>
        <TweetCommentForm postId={data.id} />
        <>
          {data.Comments?.map((comment) => (
            <TweetComment key={comment.id} comment={comment} />
          ))}
        </>
      </CardContent>
    </Card>
  );
};

export default TweetCommentList;
