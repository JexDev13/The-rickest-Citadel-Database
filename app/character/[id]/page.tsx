import SingleCharacter from '@/app/pages/SingleCharacter';
import { getCharacterById } from '@/lib/characterService';
import { Character } from '@/app/types/character';

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character: Character = await getCharacterById(id);

  return <SingleCharacter character={character} />;
}
