import { API } from '../utils/constants';
import {
  CreateEventRequest,
  EditEventResponse,
  Event,
  Student,
} from '../utils/types';

async function getEvents(
  startDate?: string,
  endDate?: string
): Promise<Event[]> {
  try {
    const queryParams = new URLSearchParams();

    if (startDate) {
      queryParams.append('startDate', startDate);
    }

    if (endDate) {
      queryParams.append('endDate', endDate);
    }

    const response = await fetch(`${API}/events?${queryParams.toString()}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при получении компаний:', error);
    throw error;
  }
}

async function getEventDetails(id: string): Promise<Event> {
  try {
    const response = await fetch(`${API}/events/${id}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при получении информации о событии:', error);
    throw error;
  }
}

async function createEvent(
  token: string,
  event: CreateEventRequest
): Promise<Event> {
  try {
    const response = await fetch(`${API}/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при создании события:', error);
    throw error;
  }
}

async function deleteEvent(
  token: string,
  id: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API}/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при удалении событии:', error);
    throw error;
  }
}

async function registerForEvent(
  token: string,
  eventId: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при регистрации на событие:', error);
    throw error;
  }
}

async function editEvent(
  token: string,
  eventId: string,
  event: Partial<CreateEventRequest>
): Promise<EditEventResponse> {
  try {
    const response = await fetch(`${API}/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при редактировании события:', error);
    throw error;
  }
}

async function getRegisteredStudentsForEvent(
  token: string,
  eventId: string
): Promise<Student[]> {
  try {
    const response = await fetch(`${API}/events/${eventId}/students`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(
      'Ошибка при получении списка студентов, зарегисрированных на событие:',
      error
    );
    throw error;
  }
}

async function getEventsForStudent(token: string) {
  try {
    const response = await fetch(`${API}/events/my-events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при получении списка событий:', error);
    throw error;
  }
}

async function getEventsForCompany(token: string) {
  try {
    const response = await fetch(`${API}/events/company-events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при получении списка событий:', error);
    throw error;
  }
}

export const eventsAPI = {
  getEvents: getEvents,
  getEventDetails: getEventDetails,
  createEvent: createEvent,
  deleteEvent: deleteEvent,
  registerForEvent: registerForEvent,
  editEvent: editEvent,
  getRegisteredStudentsForEvent: getRegisteredStudentsForEvent,
  getEventsForStudent: getEventsForStudent,
  getEventsForCompany: getEventsForCompany,
};
