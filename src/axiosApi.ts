import axios from 'axios';
import { API_URL } from './constants';
import { RootState } from './app/store';
import { Store } from '@reduxjs/toolkit';
import { ApiError } from './types/error';
import { LoginResponse } from './types/user';
import { unsetUser, updateState } from './store/users/usersSlice';

const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addTokenInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const accessToken = store.getState().users.user?.accessToken;
    config.headers.set(
      'Authorization',
      accessToken ? `Bearer ${accessToken}` : undefined
    );
    return config;
  });
};

export const refreshTokenInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: ApiError) => {
      if (
        error.response.status === 401 &&
        error.response.data.error === 'Unauthorized'
      ) {
        const { data: response } = await axiosApi.get<LoginResponse>(
          '/users/refresh',
          {
            withCredentials: true,
          }
        );
        store.dispatch(updateState(response));
        const originalRequest = error.config;
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${response.accessToken}`
        );
        return axios(originalRequest);
      } else if (
        (error.response.status === 401 &&
          error.response.data.error === 'Update refresh token') ||
        error.response.data.error === 'No token provided' ||
        (error.response.status === 403 &&
          error.response.data.error === 'Wrong token') ||
        error.response.data.error === 'User is blocked!!'
      ) {
        store.dispatch(unsetUser());
      }

      return Promise.reject(error);
    }
  );
};

export default axiosApi;
