import HomeClient from './HomeClient';
import { getCharacters } from '@/lib/characterService';
import { ApiResponse } from './types/character';

export default async function Page() {
  const data: ApiResponse = await getCharacters('1');
  const initialCharacters = data.results;

  return <HomeClient initialCharacters={initialCharacters} />;
}
