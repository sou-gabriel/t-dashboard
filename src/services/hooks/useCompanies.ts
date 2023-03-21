import { useQuery } from '@tanstack/react-query';

import API_BASE_URL from '../../constants/api';
import Company from '../../types/company';

async function fetchCompanies(): Promise<Company[]> {
  const response = await fetch(`${API_BASE_URL}/companies`);
  return response.json();
}

export default function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: () => fetchCompanies(),
  });
}
