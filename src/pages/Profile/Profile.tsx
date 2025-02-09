import { useEffect, useRef, useState } from 'react';
import { BottomNav, PostCard } from '../../components';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import { useParams } from 'react-router-dom';
import { UserFromDb } from '../../types/user';
import axiosApi from '../../axiosApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addUserToFollowing,
  removeUserFromFollowing,
  selectUser,
  unsetUser,
} from '../../store/users/usersSlice';
import { Post } from '../../types/post';

export const Profile = () => {
  const params = useParams();
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<{ user: UserFromDb; posts: Post[] }>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const followUser = async (id: string) => {
    await axiosApi.post(`/users/follow`, { userId: id });
    dispatch(addUserToFollowing(id));
  };

  const unfollowUser = async (id: string) => {
    await axiosApi.post(`/users/unfollow`, { userId: id });
    dispatch(removeUserFromFollowing(id));
  };

  const handleLogout = () => {
    setConfirmLogout(true);
  };

  const logout = async () => {
    await axiosApi.delete('/users/logout');
    dispatch(unsetUser());
    setConfirmLogout(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosApi.get(`/users/${params.id}`);
      setUser(response.data);
    };
    void fetchUser();
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
    <div className='flex flex-col relative pb-[90px]'>
      <div className='pt-6 flex justify-end items-center relative'>
        {currentUser?.user._id === user?.user._id && (
          <button className='cursor-pointer' onClick={toggleMenu}>
            <Icon
              name='jamMenu'
              size='lg'
              color={palette.black}
              height={36}
              width={36}
            />
          </button>
        )}
        {menuOpen && (
          <div
            ref={menuRef}
            className='absolute bg-white top-5 right-0 shadow-lg rounded-lg w-40 p-2 border border-gray-200 z-20'
          >
            <button
              className='block w-full text-left px-3 py-1 hover:bg-red-100 text-red-600 rounded-md cursor-pointer active:bg-red-100'
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}
        {confirmLogout && (
          <div className='fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-80 text-center'>
              <h2 className='text-lg font-bold mb-4'>Logout</h2>
              <p className='text-gray-600 mb-6'>
                You will be returned to the login screen.
              </p>
              <div className='flex justify-between'>
                <button
                  className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 active:bg-gray-300 cursor-pointer'
                  onClick={() => setConfirmLogout(false)}
                >
                  Cancel
                </button>
                <button
                  className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-700 cursor-pointer'
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-between mt-4'>
        <div>
          <h1 className='font-bold text-lg leading-6 max-w-[200px]'>
            {user?.user.name}
          </h1>
          <span className='inline-flex items-center rounded-md bg-purple-50 px-2 py-1 my-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset'>
            {user?.user.role}
          </span>
          <p className='text-sm leading-6 text-main'>
            {user?.user.followers.length} followers
          </p>
        </div>
        <div className='flex-none size-[73px] relative bg-light rounded-full'>
          <img
            src={user?.user.avatar || '/icons/no-pfp.png'}
            className='w-full h-full object-cover rounded-full'
          />
        </div>
      </div>
      <div className='flex pt-4 mb-3'>
        {user && currentUser?.user._id !== user.user._id ? (
          !currentUser?.user.following.includes(user.user._id) ? (
            <button
              className='btn-primary !px-4 !py-2 text-sm !font-medium tracking-wide w-full'
              onClick={() => followUser(user.user._id!)}
            >
              Follow
            </button>
          ) : (
            <button
              className='border border-gray-300 text-sm px-4 py-2 tracking-wide font-medium rounded-lg active:bg-gray-100 w-full cursor-pointer'
              onClick={() => unfollowUser(user.user._id!)}
            >
              Following
            </button>
          )
        ) : null}
      </div>
      {user?.posts.length === 0 && (
        <h1 className='text-center pt-10 text-xl text-platinum-500'>
          No posts yet
        </h1>
      )}
      {user?.posts.map((post) => (
        <PostCard key={post._id} postProps={post} />
      ))}

      <BottomNav />
    </div>
  );
};
