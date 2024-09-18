import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../../api/authAPI';
import { Role, User } from '../../utils/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: Role;
  companyId: string;
}

export const loginUser = createAsyncThunk<
  {
    accessToken: string;
  },
  LoginCredentials,
  { rejectValue: string }
>('userSlice/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(email, password);
    return response;
  } catch (e) {
    return rejectWithValue(
      e instanceof Error ? e.message : 'Неизвестная ошибка'
    );
  }
});

export const registerUser = createAsyncThunk<
  User,
  RegisterCredentials,
  { rejectValue: string }
>(
  'userSlice/registerUser',
  async ({ name, email, password, role, companyId }, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(
        name,
        email,
        password,
        role,
        companyId
      );
      return response;
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : 'Неизвестная ошибка'
      );
    }
  }
);
