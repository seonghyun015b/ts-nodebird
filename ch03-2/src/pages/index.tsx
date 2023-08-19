import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { RootState } from '../reducers';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { MainPost } from '../reducers/post';

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { mainPosts }: { mainPosts: MainPost[] } = useSelector(
    (state: RootState) => state.post
  );

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post: MainPost) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
