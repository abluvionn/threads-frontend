import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';

export const Home = () => {
  const user = useAppSelector(selectUser);
  return <div>Home {user?.user.name}</div>;
};
