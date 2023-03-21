import { useQuery } from '@tanstack/react-query';

import API_BASE_URL from '../../constants/api';

export async function fetchCompany(id: number) {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`);
  return response.json();
}

export default function useCompany(id: number) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => fetchCompany(id),
  });
}
