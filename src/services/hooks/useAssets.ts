import { useQuery } from '@tanstack/react-query';

import Asset from '../../types/asset';
import API_BASE_URL from '../../constants/api';

async function fetchAssets(): Promise<Asset[]> {
  const response = await fetch(`${API_BASE_URL}/assets`);
  return response.json();
}

export default function useAssets() {
  return useQuery<Asset[]>({
    queryKey: ['assets'],
    queryFn: fetchAssets,
  });
}
