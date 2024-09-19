import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Company } from '../../utils/types';
import {
  addCompany,
  deleteCompany,
  editCompany,
  getCompaniesList,
  getCompanyDetails,
} from './CompaniesActionCreators';

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
      )
      .addCase(addCompany.pending, (state) => {
        state.error = '';
      })
      .addCase(
        addCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.companies.push(action.payload);
        }
      )
      .addCase(
        addCompany.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка добавления компании';
        }
      )
      .addCase(deleteCompany.pending, (state) => {
        state.error = '';
      })
      .addCase(
        deleteCompany.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.companies = state.companies.filter(
            (company) => company.id !== action.payload
          );
        }
      )
      .addCase(
        deleteCompany.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка удалении компании';
        }
      )
      .addCase(editCompany.pending, (state) => {
        state.error = '';
      })
      .addCase(
        editCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.companies = state.companies.map((company) =>
            company.id === action.payload.id
              ? { ...company, name: action.payload.name }
              : company
          );
        }
      )
      .addCase(
        editCompany.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка редактирования компании';
        }
      )
      .addCase(getCompanyDetails.pending, (state) => {
        state.error = '';
      })
      .addCase(
        getCompanyDetails.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.companies = state.companies.map((company) =>
            company.id === action.payload.id
              ? { ...company, managers: action.payload.managers }
              : company
          );
        }
      )
      .addCase(
        getCompanyDetails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка редактирования компании';
        }
      );
  },
});

//export const {  } = companiesSlice.actions;

export default companiesSlice.reducer;
