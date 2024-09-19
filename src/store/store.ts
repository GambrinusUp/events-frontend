import { configureStore } from '@reduxjs/toolkit';

import userReducer from './auth/AuthSlice';
import companiesReducer from './companies/CompaniesSlice';
import managersReducer from './managers/ManagersSlice';

const store = configureStore({
  reducer: {
    companiesStore: companiesReducer,
    userStore: userReducer,
    managersStore: managersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
