import { useEffect, useState } from 'react';
import { BottomNav, PostCard } from '../../components';
import { Post } from '../../types/post';
import axiosApi from '../../axiosApi';

export const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchFeed = async () => {
    const { data } = await axiosApi.get<Post[]>('/posts/feed');
    setPosts(data);
  };

  useEffect(() => {
    void fetchFeed();
  }, []);

  return (
    <div className='flex flex-col relative pb-[90px]'>
      <div className='mt-[61px] mb-5 flex justify-center'>
        <img src='/icons/logo.png' alt='' />
      </div>
      {posts.length === 0 && (
        <h1 className='text-center pt-10 text-xl text-platinum-500'>
          Follow people to see their posts
        </h1>
      )}
      {posts.map((post) => (
        <PostCard key={post._id} postProps={post} />
      ))}
      <BottomNav />
    </div>
  );
};
