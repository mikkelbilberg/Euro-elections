import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { countryName, coalitionSeats, majorityThreshold, parties } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this coalition for ${countryName}. 
    Seats: ${coalitionSeats}/${majorityThreshold}. 
    Parties: ${parties.map((p: any) => p.name).join(", ")}. 
    Is it stable? Answer in 3 sentences in English.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ analysis: text });
  } catch (error: any) {
    console.error("ANALYSIS_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}