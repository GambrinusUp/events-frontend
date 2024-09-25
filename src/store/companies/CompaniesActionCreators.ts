import { createAsyncThunk } from '@reduxjs/toolkit';

import { companiesAPI } from '../../api/companiesAPI';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { Company } from '../../utils/types';

export const getCompaniesList = createAsyncThunk<
  Company[],
  void,
  { rejectValue: string }
>('companiesSlice/getCompaniesList', async (_, { rejectWithValue }) => {
  try {
    const response = await companiesAPI.getCompanies();
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const addCompany = createAsyncThunk<
  Company,
  { token: string; name: string },
  { rejectValue: string }
>('companiesSlice/addCompany', async ({ token, name }, { rejectWithValue }) => {
  try {
    const response = await companiesAPI.addCompany(token, name);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const deleteCompany = createAsyncThunk<
  string,
  { token: string; id: string },
  { rejectValue: string }
>(
  'companiesSlice/deleteCompany',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await companiesAPI.deleteCompany(token, id);
      return id;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);

export const editCompany = createAsyncThunk<
  Company,
  { token: string; id: string; name: string },
  { rejectValue: string }
>(
  'companiesSlice/editCompany',
  async ({ token, id, name }, { rejectWithValue }) => {
    try {
      const response = await companiesAPI.editCompany(token, id, name);
      return response;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);

export const getCompanyDetails = createAsyncThunk<
  Company,
  { token: string; id: string },
  { rejectValue: string }
>(
  'companiesSlice/getCompanyDetails',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await companiesAPI.getCompanyDetails(token, id);
      return response;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);
