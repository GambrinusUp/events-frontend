import { API } from '../utils/constants';
import { Company } from '../utils/types';

async function getCompanies(): Promise<Company[]> {
  try {
    const response = await fetch(`${API}/companies`);

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

async function addCompany(
  token: string,
  companyName: string
): Promise<Company> {
  try {
    const response = await fetch(`${API}/companies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: companyName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при добавлении компании:', error);
    throw error;
  }
}

async function deleteCompany(
  token: string,
  id: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API}/companies/${id}`, {
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
    console.error('Ошибка при удалении компании:', error);
    throw error;
  }
}

async function editCompany(
  token: string,
  id: string,
  companyName: string
): Promise<Company> {
  try {
    const response = await fetch(`${API}/companies/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: companyName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при изменении компании:', error);
    throw error;
  }
}

async function getCompanyDetails(token: string, id: string): Promise<Company> {
  try {
    const response = await fetch(`${API}/companies/${id}`, {
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
    console.error('Ошибка при получении информации о компании:', error);
    throw error;
  }
}

export const companiesAPI = {
  getCompanies: getCompanies,
  addCompany: addCompany,
  deleteCompany: deleteCompany,
  editCompany: editCompany,
  getCompanyDetails: getCompanyDetails,
};
