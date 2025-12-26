import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Character } from '@/app/types/character';
import { getCharacterSummaryPrompt } from '@/lib/prompts';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key no configurada' },
      { status: 500 }
    );
  }

  try {
    const character: Character = await request.json();
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    const prompt = getCharacterSummaryPrompt(character);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ summary: text.trim() });
  } catch (error: unknown) {
    console.error('Error al generar resumen con Gemini:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
