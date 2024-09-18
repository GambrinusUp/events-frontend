import { createAsyncThunk } from '@reduxjs/toolkit';

import { companiesAPI } from '../../api/companiesAPI';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { Company } from '../../utils/types';

export const getCompaniesList = createAsyncThunk<
  Company[],
  void,
  { rejectValue: string }
>('pizzaSlice/getPizzasList', async (_, { rejectWithValue }) => {
  try {
    const response = await companiesAPI.getCompanies();
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});
