import { createAsyncThunk } from '@reduxjs/toolkit';

import { eventsAPI } from '../../api/eventsAPI';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import {
  CreateEventRequest,
  EditEventResponse,
  Event,
  Student,
} from '../../utils/types';

export const getEventsList = createAsyncThunk<
  Event[],
  { startDate?: string; endData?: string },
  { rejectValue: string }
>(
  'eventsSlice/getEventsList',
  async ({ startDate, endData }, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.getEvents(startDate, endData);
      return response;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);

export const getEventsDetails = createAsyncThunk<
  Event,
  { id: string },
  { rejectValue: string }
>('eventsSlice/getEventsDetails', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await eventsAPI.getEventDetails(id);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const createEvent = createAsyncThunk<
  Event,
  { token: string; event: CreateEventRequest },
  { rejectValue: string }
>('eventsSlice/createEvent', async ({ token, event }, { rejectWithValue }) => {
  try {
    const response = await eventsAPI.createEvent(token, event);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const deleteEvent = createAsyncThunk<
  string,
  { token: string; id: string },
  { rejectValue: string }
>('eventsSlice/deleteEvent', async ({ token, id }, { rejectWithValue }) => {
  try {
    await eventsAPI.deleteEvent(token, id);
    return id;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const registerForEvent = createAsyncThunk<
  void,
  { token: string; eventId: string },
  { rejectValue: string }
>(
  'eventsSlice/registerForEvent',
  async ({ token, eventId }, { rejectWithValue }) => {
    try {
      await eventsAPI.registerForEvent(token, eventId);
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);

export const editEvent = createAsyncThunk<
  EditEventResponse,
  { token: string; eventId: string; event: Partial<CreateEventRequest> },
  { rejectValue: string }
>(
  'eventsSlice/editEvent',
  async ({ token, eventId, event }, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.editEvent(token, eventId, event);
      return response;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);

export const getRegisteredStudentsForEvent = createAsyncThunk<
  Student[],
  { token: string; eventId: string },
  { rejectValue: string }
>(
  'eventsSlice/getStudentsList',
  async ({ token, eventId }, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.getRegisteredStudentsForEvent(
        token,
        eventId
      );
      return response;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);

export const getMyEventsList = createAsyncThunk<
  Event[],
  { token: string },
  { rejectValue: string }
>('eventsSlice/getMyEventsList', async ({ token }, { rejectWithValue }) => {
  try {
    const response = await eventsAPI.getEventsForStudent(token);
    return response;
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

export const getCompanyEventsList = createAsyncThunk<
  Event[],
  { token: string },
  { rejectValue: string }
>(
  'eventsSlice/getCompanyEventsList',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.getEventsForCompany(token);
      return response;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  }
);
