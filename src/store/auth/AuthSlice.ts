import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Role, User } from '../../utils/types';
import { loginUser, registerUser } from './AuthActionCreators';

const loadTokenFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    return token ? token : '';
  } catch (err) {
    console.error('Could not load token', err);
    return '';
  }
};

export interface UserState {
  user: User;
  token?: string;
  isLoggedIn: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    id: '',
    email: '',
    name: '',
    role: Role.STUDENT,
    isConfirmed: false,
    companyId: '',
  },
  token: loadTokenFromLocalStorage(),
  isLoggedIn: !!loadTokenFromLocalStorage(),
  error: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.error = '';
      state.token = '';
      state.isLoggedIn = false;
      state.user = {
        id: '',
        email: '',
        name: '',
        role: Role.STUDENT,
        isConfirmed: false,
        companyId: '',
      };
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = '';
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            accessToken: string;
          }>
        ) => {
          console.log(action.payload);
          state.token = action.payload.accessToken;
          state.isLoggedIn = true;
          if (action.payload.accessToken)
            localStorage.setItem('token', action.payload.accessToken);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = '';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        console.log(action.payload as string);
      });
  },
});

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;
