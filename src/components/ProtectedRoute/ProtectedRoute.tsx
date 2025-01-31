import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

