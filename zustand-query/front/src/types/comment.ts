import User from './User';

export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  User: Partial<User>;
}
