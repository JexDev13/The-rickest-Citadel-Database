import { GoogleGenerativeAI } from '@google/generative-ai';
import { Character } from '@/app/types/character';
import { getCharacterSummaryPrompt } from './prompts';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI API KEY no está configurada en .env.local');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateCharacterSummary(character: Character): Promise<string> {
  if (!genAI) {
    return `Este espécimen ha sido catalogado dentro de la Curva Central Finita. Su comportamiento en los ${character.episode.length} episodios registrados muestra patrones consistentes con la variante ${character.species} de la dimensión ${character.origin.name}. Actualmente se encuentra en ${character.location.name}. Se recomienda discreción en el manejo de sus datos biométricos.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    const prompt = getCharacterSummaryPrompt(character);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Error al generar resumen con Gemini:', error);
    return `Este espécimen ha sido catalogado dentro de la Curva Central Finita. Su comportamiento en los ${character.episode.length} episodios registrados muestra patrones consistentes con la variante ${character.species} de la dimensión ${character.origin.name}. Actualmente se encuentra en ${character.location.name}. Se recomienda discreción en el manejo de sus datos biométricos.`;
  }
}
