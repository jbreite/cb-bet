
import { OVERTIME_API_BASE_URL } from '../../constants/Constants';

export interface Sport {
  id: string;
  name: string;
  active: boolean;
}

export async function getSports(): Promise<Sport[]> {
  try {
    const response = await fetch(`${OVERTIME_API_BASE_URL}/sports`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Sport[];
  } catch (error) {
    console.error('Error fetching sports:', error);
    throw error;
  }
}
