import { useQuery } from '@tanstack/react-query';

import Unit from '../../types/unit';
import API_BASE_URL from '../../constants/api';
import { fetchCompany } from './useCompany';

async function fetchUnits() {
  const response = await fetch(`${API_BASE_URL}/units`);
  const units: Unit[] = await response.json();

  return Promise.all(units.map(async (unit) => ({
    ...unit,
    company: await fetchCompany(unit.id),
  })));
}

export default function useUnits() {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => fetchUnits(),
  });
}
