import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from '../../../../lib/anthropic';
import { SYSTEM_PROMPT, buildUserPrompt } from '../../../../lib/prompts';
import {
  GenerateRequestSchema,
  RoadmapDataSchema,
  type RoadmapData,
} from '../../../../lib/types/roadmap';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = GenerateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const prompt = buildUserPrompt(parsed.data);

    const message = await anthropic.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 4000,
      system:     SYSTEM_PROMPT,
      messages:   [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const raw = JSON.parse(jsonMatch[0]);
    const validated = RoadmapDataSchema.safeParse(raw);
    const roadmapData: RoadmapData = validated.success ? validated.data : raw as RoadmapData;

    return NextResponse.json({ roadmapData });
  } catch (e: any) {
    console.error('[generate-roadmap]', e);
    return NextResponse.json(
      { error: 'Generation failed. Please try again.' },
      { status: 500 }
    );
  }
}
