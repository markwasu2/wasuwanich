import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get API key from environment variable
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://wasuwanich.com",
        "X-Title": "Library Riddles Trivia",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          {
            role: "system",
            content: `You are a trivia question generator for a magical library game. Generate interesting, thoughtful trivia questions that span:
- Current events and recent news (last 6 months)
- Historical events and figures
- Philosophy and ethics
- Science and technology
- Literature and arts
- World leaders and politics

Make questions challenging but fair. Mix difficulty levels. Focus on fascinating facts that teach something new.

CRITICAL: You must respond with ONLY valid JSON in this exact format:
{
  "question": "The question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "A brief explanation of why this is the correct answer and context about the topic."
}

Do not include any other text, markdown, or formatting. Only the JSON object.`
          },
          {
            role: "user",
            content: "Generate one trivia question."
          }
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Failed to generate trivia" },
        { status: 500 }
      );
    }

    const content = data.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No content received" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    try {
      const triviaData = JSON.parse(content);
      return NextResponse.json(triviaData);
    } catch (parseError) {
      console.error("Failed to parse trivia JSON:", content);
      return NextResponse.json(
        { error: "Invalid trivia format" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Trivia API error:", error);
    return NextResponse.json(
      { error: "Failed to generate trivia question" },
      { status: 500 }
    );
  }
}

