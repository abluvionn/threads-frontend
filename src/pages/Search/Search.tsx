import { useState, useEffect } from 'react';
import { BottomNav } from '../../components';
import axiosApi from '../../axiosApi';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addUserToFollowing,
  removeUserFromFollowing,
  selectUser,
} from '../../store/users/usersSlice';
import { Link } from 'react-router-dom';

export const Search = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<
    { _id: string; alatooID: number; name: string; avatar: string | null }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosApi.get(`/users/search?query=${searchTerm}`);
      setUsers(data);
    } catch (e) {
      console.log(e);
      setError('Users search error');
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (id: string) => {
    await axiosApi.post(`/users/follow`, { userId: id });
    dispatch(addUserToFollowing(id));
  };

  const unfollowUser = async (id: string) => {
    await axiosApi.post(`/users/unfollow`, { userId: id });
    dispatch(removeUserFromFollowing(id));
  };

  useEffect(() => {
    const getUsers = setTimeout(() => {
      void fetchUsers(query);
    }, 500);
    return () => clearTimeout(getUsers);
  }, [query]);

  return (
    <div className='flex flex-col relative pb-[90px]'>
      <div className='mt-[61px] mb-5'>
        <h1 className='text-2xl font-semibold leading-6'>Search</h1>
      </div>
      <div className='relative flex items-center mb-2'>
        <input
          className='px-3 py-2 w-full bg-gray-200 rounded-lg placeholder:text-platinum-500 placeholder:ps-6'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search users...'
        />
        {!query && (
          <span className='absolute left-3'>
            <Icon
              name='search'
              size='md'
              color={palette.platinum_500}
              width={18}
              height={18}
            />
          </span>
        )}
      </div>
      {loading && (
        <div className='px-3 py-4 border-b border-gray-300 animate-pulse'>
          <div className='flex items-center gap-x-2'>
            <div className='size-[42px] rounded-full bg-gray-200'></div>
            <div className='h-2 w-[45%] rounded bg-gray-200'></div>
          </div>
        </div>
      )}
      {error && <p className='text-red-700'>{error}</p>}
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            className='px-3 py-4 border-b border-gray-300 flex justify-between items-center'
          >
            <div className='flex items-center gap-x-2'>
              <div className='size-[42px] bg-light rounded-full'>
                <img
                  src={user.avatar || '/icons/no-pfp.png'}
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <Link to={`/${user.alatooID}`} className='font-medium text-sm'>
                {user.name}
              </Link>
            </div>
            <div>
              {user._id ===
              currentUser?.user
                ._id ? null : !currentUser?.user.following.includes(
                  user._id
                ) ? (
                <button
                  className='btn-primary !px-4 !py-1.5 text-sm !font-medium tracking-wide'
                  onClick={() => followUser(user._id)}
                >
                  Follow
                </button>
              ) : (
                <button
                  className='border border-gray-300 text-sm px-4 py-1.5 tracking-wide font-medium rounded-lg active:bg-gray-100'
                  onClick={() => unfollowUser(user._id)}
                >
                  Following
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <BottomNav />
    </div>
  );
};
