import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './usersThunks';
import { GlobalError } from '../../types/error';
import { LoginResponse } from '../../types/user';
import { RootState } from '../../app/store';

interface UsersState {
  user: LoginResponse | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    updateState: (
      state,
      { payload: response }: PayloadAction<LoginResponse>
    ) => {
      state.user = response;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(
        login.fulfilled,
        (state, { payload: user }: PayloadAction<LoginResponse>) => {
          state.user = user;
          state.loginLoading = false;
          state.loginError = null;
        }
      )
      .addCase(
        login.rejected,
        (state, { payload: error }: PayloadAction<GlobalError | undefined>) => {
          state.loginError = error ?? null;
          state.loginLoading = false;
        }
      );

    builder
      .addCase(logout.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loginLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loginLoading = false;
      });
  },
});

export const { unsetUser, updateState } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
