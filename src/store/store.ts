import { configureStore } from '@reduxjs/toolkit';

import userReducer from './auth/AuthSlice';
import companiesReducer from './companies/CompaniesSlice';
import eventsReducer from './events/EventsSlice';
import managersReducer from './managers/ManagersSlice';

const store = configureStore({
  reducer: {
    companiesStore: companiesReducer,
    userStore: userReducer,
    managersStore: managersReducer,
    eventsStore: eventsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
