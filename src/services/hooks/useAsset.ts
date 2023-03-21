import { useQuery } from '@tanstack/react-query';

import Asset from '../../types/asset';
import API_BASE_URL from '../../constants/api';

async function fetchAsset(id: string): Promise<Asset> {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`);
  return response.json();
}

export default function useAsset(id: string) {
  return useQuery<Asset>({
    queryFn: () => fetchAsset(id),
    queryKey: ['asset', id],
  });
}
