import { useQuery } from '@tanstack/react-query';

import User from '../../types/user';

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(
    'https://my-json-server.typicode.com/tractian/fake-api/users',
  );
  return response.json();
}

export default function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}
