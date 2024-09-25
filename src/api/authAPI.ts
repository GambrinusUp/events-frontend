import { API } from '../utils/constants';
import { Role, User } from '../utils/types';

async function login(
  email: string,
  password: string
): Promise<{ accessToken: string }> {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при авторизации пользователя:', error);
    throw error;
  }
}

async function register(
  name: string,
  email: string,
  password: string,
  role: Role,
  companyId: string
): Promise<User> {
  try {
    const response = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: role,
        companyId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    throw error;
  }
}

async function getProfile(token: string) {
  try {
    const response = await fetch(`${API}/users/profile`, {
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
    console.error('Ошибка при получении профиля:', error);
    throw error;
  }
}

export const authAPI = {
  login: login,
  register: register,
  getProfile: getProfile,
};
