import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { RootState } from '../reducers';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { MainPost } from '../reducers/post';

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { mainPosts } = useSelector((state: RootState) => state.post);

  // const selected = useSelector((state) => state.post.mainPosts);
  console.log('se', mainPosts);
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
