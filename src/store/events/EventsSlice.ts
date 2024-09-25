import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EditEventResponse, Event, Role, Student } from '../../utils/types';
import {
  createEvent,
  deleteEvent,
  editEvent,
  getCompanyEventsList,
  getEventsDetails,
  getEventsList,
  getMyEventsList,
  getRegisteredStudentsForEvent,
  registerForEvent,
} from './EventsActionCreators';

export interface EventsState {
  events: Event[];
  event: Event;
  myEvents: Event[];
  eventStudents: Student[];
  isLoading: boolean;
  error: string;
}

const initialState: EventsState = {
  events: [],
  event: {
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
    managerId: '',
    deadline: '',
    companyId: '',
    manager: {
      id: '',
      email: '',
      name: '',
      role: Role.MANAGER,
    },
    company: {
      id: '',
      name: '',
    },
  },
  myEvents: [],
  eventStudents: [],
  isLoading: false,
  error: '',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsList.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        getEventsList.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.error = '';
          state.isLoading = false;
          state.events = action.payload;
        }
      )
      .addCase(
        getEventsList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      )
      .addCase(getEventsDetails.pending, (state) => {
        state.isLoading = true;
        state.event = {
          id: '',
          title: '',
          description: '',
          date: '',
          location: '',
          managerId: '',
          deadline: '',
          companyId: '',
          manager: {
            id: '',
            email: '',
            name: '',
            role: Role.MANAGER,
          },
          company: {
            id: '',
            name: '',
          },
        };
        state.error = '';
      })
      .addCase(
        getEventsDetails.fulfilled,
        (state, action: PayloadAction<Event>) => {
          state.isLoading = false;
          state.event = action.payload;
          state.error = '';
        }
      )
      .addCase(
        getEventsDetails.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      )
      .addCase(createEvent.pending, (state) => {
        state.error = '';
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
      })
      .addCase(
        createEvent.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка добавления события';
        }
      )
      .addCase(deleteEvent.pending, (state) => {
        state.error = '';
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.events = state.events.filter(
            (company) => company.id !== action.payload
          );
          state.event = {
            id: '',
            title: '',
            description: '',
            date: '',
            location: '',
            managerId: '',
            deadline: '',
            companyId: '',
            manager: {
              id: '',
              email: '',
              name: '',
              role: Role.MANAGER,
            },
            company: {
              id: '',
              name: '',
            },
          };
        }
      )
      .addCase(
        deleteEvent.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка удалении события';
        }
      )
      .addCase(registerForEvent.pending, (state) => {
        state.error = '';
      })
      .addCase(
        registerForEvent.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка записи на событие';
        }
      )
      .addCase(editEvent.pending, (state) => {
        state.error = '';
      })
      .addCase(
        editEvent.fulfilled,
        (state, action: PayloadAction<EditEventResponse>) => {
          state.events = state.events.map((event) =>
            event.id === action.payload.id
              ? {
                  ...event,
                  title: action.payload.title,
                  description: action.payload.description ?? event.description,
                  date: action.payload.date,
                  location: action.payload.location,
                  managerId: action.payload.managerId,
                  deadline: action.payload.deadline ?? event.deadline,
                  companyId: action.payload.companyId,
                }
              : event
          );
          state.event = {
            ...state.event,
            title: action.payload.title,
            description: action.payload.description ?? state.event.description,
            date: action.payload.date,
            location: action.payload.location,
            managerId: action.payload.managerId,
            deadline: action.payload.deadline ?? state.event.deadline,
            companyId: action.payload.companyId,
          };
        }
      )
      .addCase(
        editEvent.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? 'Ошибка редактирования события';
        }
      )
      .addCase(getRegisteredStudentsForEvent.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        getRegisteredStudentsForEvent.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.isLoading = false;
          state.eventStudents = action.payload;
        }
      )
      .addCase(
        getRegisteredStudentsForEvent.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      )
      .addCase(getMyEventsList.pending, (state) => {
        state.isLoading = true;
        state.myEvents = [];
        state.error = '';
      })
      .addCase(
        getMyEventsList.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.isLoading = false;
          state.myEvents = action.payload;
          state.error = '';
        }
      )
      .addCase(
        getMyEventsList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      )
      .addCase(getCompanyEventsList.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        getCompanyEventsList.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.isLoading = false;
          state.events = action.payload;
          state.error = '';
        }
      )
      .addCase(
        getCompanyEventsList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Ошибка получения данных';
        }
      );
  },
});

export default eventsSlice.reducer;
