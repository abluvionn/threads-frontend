import { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import axiosApi from '../../axiosApi';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { formatTimeAgo } from '../../utils';

dayjs.locale('ru');

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
    <div className='flex flex-col'>
      <div className='mt-[61px] mb-5 flex justify-center'>
        <img src='/logo.png' alt='' />
      </div>
      {posts.map((post) => (
        <div
          key={post._id}
          className='flex gap-x-[14px] pt-6 pb-5 border-bottom-light relative'
        >
          <div className='flex-none size-[42px] relative'>
            <img
              src={post.author.avatar || '/no-pfp.png'}
              className='w-full h-full object-cover rounded-full'
            />
            <button
              onClick={() => console.log(post.author.name)}
              className='size-4 flex justify-center items-center rounded-full shadow absolute -right-0.5 -bottom-0.5 bg-white cursor-pointer active:bg-gray-100'
            >
              <img src='/plus.svg' alt='' />
            </button>
          </div>
          <div className='flex-auto'>
            <p className='text-sm font-bold text-dark leading-6'>
              {post.author.name}
              <span className='ms-2 text-xs leading-6 text-main-70 font-normal'>
                {formatTimeAgo(post.createdAt)}
              </span>
            </p>
            <p className='leading-[22px] text-main'>{post.text}</p>
            <div className='pt-5 flex gap-x-4'>
              <button className='h-6 flex justify-center items-center cursor-pointer'>
                <img src='/heart.svg' alt='' />
                <span className='text-[15px] font-normal text-main ms-1'>
                  {post.likes.length || null}
                </span>
              </button>
              <button className='h-6 flex justify-center items-center cursor-pointer'>
                <img src='/replies.svg' alt='' />
                <span className='text-[15px] font-normal text-main ms-1'>
                  {post.replies.length || null}
                </span>
              </button>
              <button className='h-6 flex justify-center items-center cursor-pointer'>
                <img src='/share.svg' alt='' />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
