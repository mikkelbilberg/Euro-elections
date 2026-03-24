import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // Dynamisk import for at undgå Turbopack "mangling" fejl (_gky8O is not defined)
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    const { countryName, coalitionSeats, majorityThreshold, parties } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API KEY MANGLER");
      return NextResponse.json({ error: "API Key ikke fundet" }, { status: 500 });
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
    console.error("GEMINI API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}