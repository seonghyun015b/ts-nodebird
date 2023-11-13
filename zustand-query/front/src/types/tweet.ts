import Comment from './comment';
import User from './User';

export default interface Tweet {
  id: number;
  content: string;
  Likers: Partial<User>[];
  Images: { src: string }[];
  RetweetId?: number;
  Retweet?: Tweet;
  User: Partial<User> & { id: number };
  createAt: string;
  Comments: Comment[];
}
