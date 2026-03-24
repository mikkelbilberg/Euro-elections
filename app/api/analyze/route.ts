import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { countryName, coalitionSeats, majorityThreshold, parties } = await req.json();

    // 1. Check if the key exists
    const apiKey = process.env.AIzaSyC0LYCBs5JC8mayG5lL9eNJ-_gky8O-858;
    if (!apiKey) {
      console.error("CRITICAL ERROR: GEMINI_API_KEY is missing from environment variables.");
      return NextResponse.json({ error: "API Key not configured on server" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      As a political analyst, analyze this potential European Parliament coalition for ${countryName}.
      Total seats: ${coalitionSeats} (Majority needed: ${majorityThreshold}).
      Parties: ${parties.map((p: any) => `${p.name} (${p.seats} seats)`).join(", ")}.
      Is this coalition stable? What are the main political challenges? Keep it concise.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });

  } catch (error: any) {
    // 2. This will show the REAL error in your Vercel logs
    console.error("GEMINI API ERROR:", error.message || error);
    return NextResponse.json(
      { error: "AI failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}