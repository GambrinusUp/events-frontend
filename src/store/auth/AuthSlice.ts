import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { loadTokenFromLocalStorage } from '../../helpers/loadTokenFromLocalStorage';
import { CustomJwtPayload, Role, User } from '../../utils/types';
import { loginUser, registerUser } from './AuthActionCreators';

const token = loadTokenFromLocalStorage();

const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;

export interface UserState {
  user: User;
  token?: string;
  isLoggedIn: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    id: decodedToken?.userId || '',
    email: '',
    name: '',
    role: decodedToken?.role || Role.STUDENT,
    isConfirmed: false,
    companyId: '',
  },
  token: token,
  isLoggedIn: !!token,
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
          state.user.role = jwtDecode<CustomJwtPayload>(
            action.payload.accessToken
          ).role;
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
