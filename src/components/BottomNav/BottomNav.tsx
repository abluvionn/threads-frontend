import { NavLink } from 'react-router-dom';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import PostModal from '../PostModal/PostModal';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';

export const BottomNav = () => {
  const user = useAppSelector(selectUser);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const openModal = () => {
    setIsPostModalOpen(true);
  };
  const closeModal = () => {
    setIsPostModalOpen(false);
  };
  return (
    <>
      <div className='fixed bottom-0 left-0 px-6 py-4 w-full bg-light flex justify-between items-center sm:max-w-xl sm:left-[50%] sm:-translate-x-[50%]'>
        <NavLink to='/'>
          {({ isActive }) => (
            <Icon
              name='home'
              size='md'
              color={isActive ? palette.secondary : palette.main}
            />
          )}
        </NavLink>
        <NavLink to='/search'>
          {({ isActive }) => (
            <Icon
              name='search'
              size='md'
              color={isActive ? palette.secondary : palette.main}
            />
          )}
        </NavLink>
        <button
          className='size-[52px] flex justify-center items-center bg-secondary rounded-full cursor-pointer'
          onClick={openModal}
        >
          <Icon
            name='plus'
            size='md'
            color={palette.white}
            width={16}
            height={16}
          />
        </button>
        <NavLink to='/feed'>
          {({ isActive }) => (
            <Icon
              name='heartOutlined'
              size='md'
              color={isActive ? palette.secondary : palette.main}
            />
          )}
        </NavLink>
        <NavLink to={`/${user?.user.alatooID}`}>
          {({ isActive }) => (
            <Icon
              name='user'
              size='md'
              color={isActive ? palette.secondary : palette.main}
            />
          )}
        </NavLink>
      </div>
      <PostModal isOpen={isPostModalOpen} closeModal={closeModal} />
    </>
  );
};
