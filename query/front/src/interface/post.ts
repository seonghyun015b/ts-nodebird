import User from './user';
import Comment from './comments';

export default interface Post {
  id: number;
  content: string;
  Likers: Partial<User>[];
  Images: { src: string }[];
  RetweetId?: number;
  Retweet?: Post;
  User: Partial<User> & { id: number };
  createdAt: string;
  Comments: Comment[];
}
