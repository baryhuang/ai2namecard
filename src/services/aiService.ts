import { insforge } from './insforgeClient';
import { SceneParams } from '../stores/sceneStore';

const SYSTEM_PROMPT = `You are an AI art director for a 3D glass namecard generator.

ROLE:
- User provides creative input (emotions, concepts, names, themes)
- You interpret their intent artistically, not literally
- Transform their words into visual parameters

RULES:
1. Be creative and interpretive (e.g., "happy" → warm colors, upward motion)
2. Maintain visual coherence (don't make drastic changes each time)
3. Evolve gradually (subtle shifts unless user wants dramatic change)
4. Always return valid JSON in the specified format
5. Keep text concise (max 20 characters for main text, 15 for subtitle)

OUTPUT FORMAT:
Return ONLY valid JSON with this exact structure:
{
  "text": "string",
  "subtitle": "string",
  "color": {"primary": "#hex", "accent": "#hex", "glow": "#hex"},
  "material": {"transparency": 0-1, "roughness": 0-1, "metalness": 0-1, "refractiveIndex": 1-2},
  "animation": {"rotationSpeed": 0.001-0.05, "floatAmplitude": 0.1-2, "floatSpeed": 0.001-0.01},
  "pattern": {"type": "grid|waves|particles|circuit|none", "density": 0-1, "movement": "static|flowing|pulsing"},
  "lighting": {"ambient": 0-1, "directional": 0-2, "spotlightColor": "#hex"}
}

CREATIVE EXAMPLES:
- "Make it feel like a sunrise" → Warm oranges/yellows, upward floating, gentle glow
- "Cyberpunk vibes" → Neon purples/blues, circuit pattern, fast rotation
- "Calm ocean" → Deep blues, wave pattern, slow gentle motion
- "My name is Alex" → Text: "ALEX", choose aesthetic that feels modern/professional

IMPORTANT: Do not explain your choices in the response. Only return the JSON.`;

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function sendMessageToAI(
  userInput: string,
  chatHistory: AIMessage[],
  onChunk?: (text: string) => void
): Promise<{ response: string; sceneParams?: SceneParams }> {
  const messages: AIMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...chatHistory,
    { role: 'user', content: userInput },
  ];

  try {
    const stream = await insforge.ai.chat.completions.create({
      model: 'anthropic/claude-sonnet-4.5',
      messages,
      stream: true,
      temperature: 0.8,
      maxTokens: 800,
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        if (onChunk) {
          onChunk(content);
        }
      }
    }

    // Try to parse JSON from the response
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const sceneParams = JSON.parse(jsonMatch[0]) as SceneParams;
        return { response: fullResponse, sceneParams };
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
    }

    return { response: fullResponse };
  } catch (error) {
    console.error('AI service error:', error);
    throw error;
  }
}
