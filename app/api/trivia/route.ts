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
            content: `You are a trivia question generator for a magical library game. Generate EXTREMELY DIFFICULT, graduate-level trivia questions that span:
- Current events and recent news (last 6 months) - focus on obscure details, specific dates, lesser-known implications
- Historical events and figures - deep cuts, specific years, lesser-known figures who shaped history
- Philosophy and ethics - specific philosophical arguments, lesser-known thinkers, nuanced positions
- Science and technology - technical details, specific discoveries, cutting-edge research
- Literature and arts - specific passages, lesser-known works, biographical details
- World leaders and politics - specific policy details, lesser-known political figures, historical context

DIFFICULTY REQUIREMENTS:
- Questions should require deep knowledge, not just general awareness
- Avoid obvious answers that anyone could guess
- Include specific dates, names, technical terms, or precise details
- Wrong answers should be plausible and require real knowledge to eliminate
- Think: "What would stump someone who reads extensively and follows current events?"
- Aim for questions that only 10-20% of highly educated people would know

Examples of difficulty level:
- NOT: "Who wrote 1984?" (too easy)
- YES: "In what year did Orwell write the essay 'Politics and the English Language' that influenced his approach in 1984?"
- NOT: "Who is the current president of France?" (too easy)
- YES: "Which specific policy proposal did Macron's government withdraw in 2023 after widespread protests over pension reform?"

CRITICAL: You must respond with ONLY valid JSON in this exact format:
{
  "question": "The question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0,
  "explanation": "A detailed explanation of why this is the correct answer, including context and why the other options were plausible but incorrect."
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

