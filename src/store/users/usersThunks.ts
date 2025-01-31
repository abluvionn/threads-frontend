import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { GlobalError } from '../../types/error';
import { LoginResponse, LoginMutation } from '../../types/user';

export const login = createAsyncThunk<
  LoginResponse,
  LoginMutation,
  {
    rejectValue: GlobalError;
  }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: response } = await axiosApi.post<LoginResponse>(
      '/users/sessions',
      loginMutation,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 401
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }

    throw error;
  }
});

export const logout = createAsyncThunk<void, undefined>(
  'users/logout',
  async () => {
    try {
      await axiosApi.delete('/users/logout', { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
  }
);
