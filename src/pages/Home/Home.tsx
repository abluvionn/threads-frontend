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

  if (posts.length === 0) {
    return (
      <div className='flex flex-col relative pb-[90px]'>
        <div className='mt-[61px] mb-5 flex justify-center'>
          <img src='/icons/logo.png' alt='' />
        </div>
        <div className='flex animate-pulse space-x-4'>
          <div className='size-10 rounded-full bg-gray-200'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-gray-200'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-200'></div>
                <div className='col-span-1 h-2 rounded bg-gray-200'></div>
              </div>
              <div className='h-2 rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

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
