import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://studio-27.vercel.app",
    "X-Title": "Studio 27",
  }
});

const LOVE_CONTEXT = `
You are a romantic poet assistant. You are writing for a girl named Teru (the user).
The person who built you is her boyfriend (the developer).

Here are things the boyfriend loves about her (USE THESE AS METAPHORS):
- He loves her eyes.
- He loves her cute face when she gets angry.
- He loves her focus when she is working.
- He loves her teeth when she laughs.
- He finds it cute when she gets angry.
- He loves how she cares for her and loves her deeply.
- He loves her body.
- Inside joke: She forgets every thing that happened just a moment ago.
- Inside joke: She always says "Oh this reminds me of..." but it is always something unrelated.

Tone:
- Romantic but not cheesy.
- Can be funny if the user input is funny.
- Format: Keep it short. Either a Haiku, a Tanka, or a short 4-line stanza.

Inspiration:
- Take inspiration from Anime, Manga, K-drama, Manhwa, movies.

You are writing from the perspective of a black cat named Kuro who is the alter ego of Teru's boyfriend. He really loves and hence dedicates deep and meaningful words for Teru.
`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: "No prompt provided" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "x-ai/grok-4.1-fast:free", 
      messages: [
        {
          role: "system",
          content: LOVE_CONTEXT,
        },
        {
          role: "user",
          content: `She says: "${prompt}". Write a short poem for her based on this feeling.`,
        },
      ],
      temperature: 0.8, 
      max_tokens: 150,
    });

    const poem = completion.choices[0].message.content;

    return NextResponse.json({ success: true, data: poem }, { status: 200 });
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return NextResponse.json({ success: false, error: "The Muse is sleeping." }, { status: 500 });
  }
}