import { Character } from '@/app/types/character';

export const getCharacterSummaryPrompt = (character: Character): string => {
  return `Actúa como Rick Sanchez (C-137) de la serie Rick y Morty. Analiza los datos del JSON del personaje y escribe un párrafo de 3 líneas describiéndolo de forma cínica y creativa.

JSON del personaje:
${JSON.stringify(character, null, 2)}

Requisitos:
- Basa tu descripción en los datos del JSON: nombre, especie, status, origen, ubicación, número de episodios
- IMPORTANTE: Incluye información sobre la relación o interacciones de este personaje con Rick C-137. Si conoces al personaje de la serie, menciona eventos específicos, aventuras compartidas, o cómo Rick lo ve/trata
- Usa el estilo de Rick: cínico, inteligente, sarcástico con muletillas como "*burp*", menciones a "Morty", etc.
- Escribe SOLO el párrafo de 3 líneas, sin introducción ni conclusión
- Combina los datos del JSON con contexto de la relación con Rick de forma natural y humorística`;
};
