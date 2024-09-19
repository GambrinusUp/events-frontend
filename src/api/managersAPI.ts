import { API } from '../utils/constants';
import { Manager } from '../utils/types';

async function getManagersPending(token: string): Promise<Manager[]> {
  try {
    const response = await fetch(`${API}/managers/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке менджеров');
    }

    return response.json();
  } catch (error) {
    console.error('Ошибка при получении менджеров:', error);
    throw error;
  }
}

async function approveManager(token: string, id: string) {
  try {
    const response = await fetch(`${API}/managers/${id}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при подтверждении менджера');
    }

    return response.json();
  } catch (error) {
    console.error('Ошибка при подтверждении менджера:', error);
    throw error;
  }
}

export const managersAPI = {
  getManagersPending: getManagersPending,
  approveManager: approveManager,
};
