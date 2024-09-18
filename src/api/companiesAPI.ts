import { API } from '../utils/constants';
import { Company } from '../utils/types';

async function getCompanies(): Promise<Company[]> {
  try {
    const response = await fetch(`${API}/companies`);

    if (!response.ok) {
      throw new Error('Ошибка при загрузке компаний');
    }

    return response.json();
  } catch (error) {
    console.error('Ошибка при получении компаний:', error);
    throw error;
  }
}

export const companiesAPI = {
  getCompanies: getCompanies,
};
