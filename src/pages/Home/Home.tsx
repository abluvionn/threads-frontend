import { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import axiosApi from '../../axiosApi';
import { BottomNav, PostCard } from '../../components';

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const { data } = await axiosApi.get<Post[]>('/posts');
    setPosts(data);
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  return (
    <div className='flex flex-col relative pb-[90px]'>
      <div className='mt-[61px] mb-5 flex justify-center'>
        <img src='/icons/logo.png' alt='' />
      </div>
      {posts.map((post) => (
        <PostCard key={post._id} postProps={post} />
      ))}
      <BottomNav />
    </div>
  );
};
