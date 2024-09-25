import { createAsyncThunk } from '@reduxjs/toolkit';

import { managersAPI } from '../../api/managersAPI';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { Manager } from '../../utils/types';

export const getManagersList = createAsyncThunk<
  Manager[],
  string,
  { rejectValue: string }
>('managersSlice/getManagersList', async (token, { rejectWithValue }) => {
  try {
    const response = await managersAPI.getManagersPending(token);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const approveManager = createAsyncThunk<
  string,
  { token: string; id: string },
  { rejectValue: string }
>(
  'managersSlice/approveManager',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await managersAPI.approveManager(token, id);
      return id;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);
