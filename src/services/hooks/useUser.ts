export async function fetchUser(id: number) {
  const response = await fetch(`https://my-json-server.typicode.com/tractian/fake-api/users/${id}`);
  return response.json();
}

export default function useUser() {}
