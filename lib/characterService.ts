const API_URL = process.env.API_BASE_URL || 'https://rickandmortyapi.com/api/';

export async function getCharacters(page: string) {
  const url = `${API_URL}character/?page=${page}`;
  console.log('Fetching characters from:', url);
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Failed to fetch characters:', res.status, res.statusText);
    throw new Error("Failed to fetch characters");
  }
  return res.json();
}

export async function getCharacterById(id: string) {
  const url = `${API_URL}character/${id}`;
  console.log('Fetching character from:', url);
  console.log('ID received:', id);
  console.log('API_URL:', API_URL);
  
  try {
    const res = await fetch(url);
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch character:', res.status, res.statusText, errorText);
      throw new Error("Character not found");
    }
    return res.json();
  } catch (error) {
    console.error('Error in getCharacterById:', error);
    throw error;
  }
}

export async function searchCharactersByName(name: string) {
  const url = `${API_URL}character/?name=${encodeURIComponent(name)}`;
  console.log('Searching characters:', url);
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Failed to search characters:', res.status, res.statusText);
    throw new Error("Failed to search characters");
  }
  return res.json();
}
