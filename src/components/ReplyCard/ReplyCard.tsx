import { FC, useEffect, useRef, useState } from 'react';
import { Reply } from '../../types/post';
import { formatTimeAgo } from '../../utils';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import axiosApi from '../../axiosApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addUserToFollowing,
  selectUser,
  toggleReplyInFavorites,
} from '../../store/users/usersSlice';
import { Link } from 'react-router-dom';

interface Props {
  replyProps: Reply;
  isLast: boolean;
  isCurrentUserAuthor: boolean;
  removeFromReplies: (id: string) => void;
}

export const ReplyCard: FC<Props> = ({
  replyProps,
  isLast,
  isCurrentUserAuthor,
  removeFromReplies,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [reply, setReply] = useState<Reply>({ ...replyProps });
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onLikeReply = async (id: string) => {
    const response = await axiosApi.post<Reply>(`/replies/likes/${id}`);
    dispatch(toggleReplyInFavorites(reply));
    setReply((reply) => ({ ...reply, likes: response.data.likes }));
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const deleteReply = async (id: string) => {
    await axiosApi.delete(`/replies/${id}`);
    setConfirmDelete(false);
    setMenuOpen(false);
    removeFromReplies(id);
  };

  const followUser = async (id: string) => {
    await axiosApi.post(`/users/follow`, { userId: id });
    dispatch(addUserToFollowing(id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      key={reply._id}
      className={`flex gap-x-[14px] pt-6 pb-5 relative ${
        !isLast ? 'vertical-stroke' : ''
      }`}
    >
      <div className='flex-none size-[42px] relative bg-light rounded-full'>
        <Link to={`/${reply.author.alatooID}`}>
          <img
            src={reply.author.avatar || '/icons/no-pfp.png'}
            className='w-full h-full object-cover rounded-full'
          />
        </Link>
        {reply.author._id !== user?.user._id &&
          !user?.user.following.includes(reply.author._id) && (
            <button
              onClick={() => followUser(reply.author._id)}
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
      <div className='flex-auto relative'>
        <Link
          to={`/${reply.author.alatooID}`}
          className='text-sm font-bold text-dark leading-6'
        >
          {reply.author.name}
          <span className='ms-2 text-xs leading-6 text-main-70 font-normal'>
            {formatTimeAgo(reply.createdAt)}
          </span>
        </Link>
        {reply.author._id === user?.user._id || isCurrentUserAuthor ? (
          <div>
            <button
              className='absolute -top-1 right-2 text-2xl py-2 leading-0 cursor-pointer'
              onClick={toggleMenu}
            >
              ...
            </button>
            {menuOpen && (
              <div
                ref={menuRef}
                className='absolute bg-white top-5 right-0 shadow-lg rounded-lg w-40 p-2 border border-gray-200 z-20'
              >
                <button
                  className='block w-full text-left px-3 py-1 hover:bg-red-100 text-red-600 rounded-md cursor-pointer active:bg-red-100'
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
            {confirmDelete && (
              <div className='fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-80 text-center'>
                  <h2 className='text-lg font-bold mb-4'>Delete reply</h2>
                  <p className='text-gray-600 mb-6'>
                    You cannot undo this action.
                  </p>
                  <div className='flex justify-between'>
                    <button
                      className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 active:bg-gray-300 cursor-pointer'
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-700 cursor-pointer'
                      onClick={() => deleteReply(reply._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
        <p className='block leading-[22px] text-main'>{reply.text}</p>
        <div className='pt-5 flex gap-x-4'>
          <button
            className='h-6 flex justify-center items-center cursor-pointer'
            onClick={() => onLikeReply(reply._id)}
          >
            {user?.user.liked_replies.includes(reply._id) ? (
              <Icon name='heartFilled' size='md' color={palette.red} />
            ) : (
              <Icon name='heartOutlined' size='md' color={palette.main} />
            )}
            <span className='text-[15px] font-normal text-main ms-1'>
              {reply.likes.length || null}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
