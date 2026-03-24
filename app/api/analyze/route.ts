import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the official Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { countryName, coalitionSeats, majorityThreshold, parties } = await req.json();

// Construct the prompt for the AI
    const prompt = `
      You are an expert European political analyst. 
      Analyze a potential ruling coalition in ${countryName}.
      The coalition has ${coalitionSeats} out of ${majorityThreshold} seats needed for a majority.
      The parties in the coalition are: ${parties.map((p: any) => p.name).join(', ')}.
      
      Keep your response to exactly 3 short, punchy bullet points.
      IMPORTANT: Do NOT use markdown formatting, asterisks, or bold text. Use plain text only.
      
      1. Viability: Do they have a majority and is it mathematically stable?
      2. Ideological Compatibility: Do these parties align politically?
      3. Potential Friction: What is their biggest policy disagreement?
    `;    

    // Call the gemini-2.5-flash model for fast reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ analysis: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}