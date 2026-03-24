import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Tvinger Vercel til at bruge standard Node.js runtime (vigtigt!)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { countryName, coalitionSeats, majorityThreshold, parties } = await req.json();

    const apiKey = process.env.AIzaSyC0LYCBs5JC8mayG5lL9eNJ-_gky8O-858;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key mangler på serveren" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Som politisk analytiker, analyser denne koalition for ${countryName}. 
    Sæder: ${coalitionSeats}/${majorityThreshold}. 
    Partier: ${parties.map((p: any) => p.name).join(", ")}. 
    Er den stabil? Svar kort på dansk.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ analysis: response.text() });

  } catch (error: any) {
    console.error("REAL ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}