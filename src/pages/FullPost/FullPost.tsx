import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostDetailed, Reply } from '../../types/post';
import axiosApi from '../../axiosApi';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import { BottomNav, PostCard, ReplyCard, ReplyForm } from '../../components';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';

export const FullPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState<PostDetailed | null>(null);
  const user = useAppSelector(selectUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const deletePost = async (id: string) => {
    await axiosApi.delete(`/posts/${id}`);
    setConfirmDelete(false);
    setMenuOpen(false);
    navigate(-1);
  };

  const addToReplies = (reply: Reply) => {
    setPost((prevPost) =>
      prevPost
        ? { ...prevPost, replies: [...prevPost.replies, reply] }
        : prevPost
    );
  };

  const removeFromReplies = (id: string) => {
    setPost((prevPost) =>
      prevPost
        ? {
            ...prevPost,
            replies: prevPost.replies.filter((reply) => reply._id !== id),
          }
        : prevPost
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axiosApi.get<PostDetailed>(`/posts/${params.id}`);
      setPost(response.data);
    };
    void fetchPost();
  }, [params.id]);

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
    <div className='flex flex-col relative pb-[160px]'>
      <div className='mt-[60px]'>
        <nav className='flex items-center mb-3'>
          <h1 className='text-lg font-bold leading-6 relative w-full flex items-center justify-center'>
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={-1 as any}
              className='absolute left-0 flex justify-center items-center cursor-pointer p-1 -m-1'
            >
              <Icon name='arrowLeft' size='sm' color={palette.dark} />
            </Link>
            <span>Thread</span>
            {post && post.author._id === user?.user._id ? (
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
                      className='block w-full text-left px-3 py-1 hover:bg-red-100 text-red-600 rounded-md cursor-pointer active:bg-red-100 font-semibold'
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {confirmDelete && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50 font-semibold'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-80 text-center'>
                      <h2 className='text-lg font-bold mb-4'>Delete post</h2>
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
                          onClick={() => deletePost(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </h1>
        </nav>
        {post && (
          <PostCard
            postProps={{
              ...post,
              replies: post.replies.map((reply) => reply._id),
            }}
          />
        )}
        <h2 className='text-main font-semibold py-2 relative border-bottom-dark'>
          Replies
        </h2>
        {post &&
          post.replies.map((reply, index) => (
            <ReplyCard
              key={reply._id}
              replyProps={reply}
              isLast={index === post.replies.length - 1}
              isCurrentUserAuthor={post.author._id === user?.user._id}
              removeFromReplies={removeFromReplies}
            />
          ))}
      </div>
      {post && <ReplyForm post={post} addToReplies={addToReplies} />}
      <BottomNav />
    </div>
  );
};
