import { FC, useState } from 'react';
import { Post } from '../../types/post';
import { formatTimeAgo } from '../../utils';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import axiosApi from '../../axiosApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addUserToFollowing,
  selectUser,
  togglePostInFavorites,
} from '../../store/users/usersSlice';
import { Link } from 'react-router-dom';

interface Props {
  postProps: Post;
}

export const PostCard: FC<Props> = ({ postProps }) => {
  const [post, setPost] = useState<Post>({ ...postProps });
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onLikePost = async (id: string) => {
    const response = await axiosApi.post<Post>(`/posts/likes/${id}`);
    dispatch(togglePostInFavorites(post));
    setPost((post) => ({ ...post, likes: response.data.likes }));
  };

  const followUser = async (id: string) => {
    await axiosApi.post(`/users/follow`, { userId: id });
    dispatch(addUserToFollowing(id));
  };

  return (
    <div
      key={post._id}
      className='flex gap-x-[14px] pt-6 pb-5 border-bottom-light relative'
    >
      <div className='flex-none size-[42px] relative bg-light rounded-full'>
        <Link to={`/${post.author.alatooID}`}>
          <img
            src={post.author.avatar || '/icons/no-pfp.png'}
            className='w-full h-full object-cover rounded-full'
          />
        </Link>
        {post.author._id !== user?.user._id &&
          !user?.user.following.includes(post.author._id) && (
            <button
              onClick={() => followUser(post.author._id)}
              className='size-4 flex justify-center items-center rounded-full shadow absolute -right-0.5 -bottom-0.5 bg-white cursor-pointer active:bg-gray-100'
            >
              <Icon
                name='plus'
                size='sm'
                color={palette.secondary}
                width={9}
                height={9}
              />
            </button>
          )}
      </div>
      <div className='flex-auto'>
        <Link
          to={`/${post.author.alatooID}`}
          className='text-sm font-bold text-dark leading-6'
        >
          {post.author.name}
          <span className='ms-2 text-xs leading-6 text-main-70 font-normal'>
            {formatTimeAgo(post.createdAt)}
          </span>
        </Link>
        <Link to={`/p/${post._id}`} className='block leading-[22px] text-main'>
          {post.text}
        </Link>
        <div className='pt-5 flex gap-x-4'>
          <button
            className='h-6 flex justify-center items-center cursor-pointer'
            onClick={() => onLikePost(post._id)}
          >
            {user?.user.liked_posts.includes(post._id) ? (
              <Icon name='heartFilled' size='md' color={palette.red} />
            ) : (
              <Icon name='heartOutlined' size='md' color={palette.main} />
            )}
            <span className='text-[15px] font-normal text-main ms-1'>
              {post.likes.length || null}
            </span>
          </button>
          <Link
            to={`/p/${post._id}`}
            className='h-6 flex justify-center items-center cursor-pointer'
          >
            <Icon name='replies' size='md' color={palette.main} />
            <span className='text-[15px] font-normal text-main ms-1'>
              {post.replies.length || null}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
