import { Character } from '@/app/types/character';

const fallbackSummary = (character: Character) => 
  `Este espécimen ha sido catalogado dentro de la Curva Central Finita. Su comportamiento en los ${character.episode.length} episodios registrados muestra patrones consistentes con la variante ${character.species} de la dimensión ${character.origin.name}. Actualmente se encuentra en ${character.location.name}. Se recomienda discreción en el manejo de sus datos biométricos.`;

export async function generateCharacterSummary(character: Character): Promise<string> {
  try {
    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    });

    if (!response.ok) {
      throw new Error('Error al generar resumen');
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Error al generar resumen con Gemini:', error);
    return fallbackSummary(character);
  }
}
