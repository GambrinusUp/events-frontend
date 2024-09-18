import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Company } from '../../utils/types';
import { getCompaniesList } from './CompaniesActionCreators';

export interface CompaniesState {
  companies: Company[];
  isLoading: boolean;
  error: string;
}

const initialState: CompaniesState = {
  companies: [],
  isLoading: false,
  error: '',
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompaniesList.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        getCompaniesList.fulfilled,
        (state, action: PayloadAction<Company[]>) => {
          state.isLoading = false;
          state.companies = action.payload;
        }
      )
      .addCase(
        getCompaniesList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      );
  },
});

//export const {  } = companiesSlice.actions;

export default companiesSlice.reducer;
