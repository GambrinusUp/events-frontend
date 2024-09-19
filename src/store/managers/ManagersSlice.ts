import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Manager } from '../../utils/types';
import { approveManager, getManagersList } from './ManagersActionCreators';

export interface ManagersState {
  managers: Manager[];
  isLoading: boolean;
  error: string;
}

const initialState: ManagersState = {
  managers: [],
  isLoading: false,
  error: '',
};

export const managersSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getManagersList.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        getManagersList.fulfilled,
        (state, action: PayloadAction<Manager[]>) => {
          state.isLoading = false;
          state.managers = action.payload;
        }
      )
      .addCase(
        getManagersList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      )
      .addCase(
        approveManager.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.managers = state.managers.filter(
            (manager) => manager.id !== action.payload
          );
        }
      )
      .addCase(
        approveManager.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка подтверждения менеджера';
        }
      );
  },
});

//export const {  } = managersSlice.actions;

export default managersSlice.reducer;
