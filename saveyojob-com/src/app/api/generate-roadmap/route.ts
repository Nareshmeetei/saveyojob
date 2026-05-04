import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { anthropic } from '../../../../lib/anthropic';
import { SYSTEM_PROMPT, buildUserPrompt } from '../../../../lib/prompts';
import {
  GenerateRequestSchema,
  RoadmapDataSchema,
  type RoadmapData,
} from '../../../../lib/types/roadmap';

const RATE_LIMIT = 5; // per IP per day

async function checkRateLimit(ip: string): Promise<boolean> {
  // Simple in-memory fallback when Supabase isn't configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return true;
  try {
    const { createServiceClient } = await import('../../../../lib/supabase');
    const supabase = createServiceClient();
    const today = new Date().toISOString().split('T')[0];
    const ipHash = Buffer.from(ip).toString('base64').slice(0, 32);

    const { data, error } = await supabase
      .from('rate_limits')
      .upsert({ ip_hash: ipHash, date: today, count: 1 }, {
        onConflict: 'ip_hash,date',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      // If upsert failed, try increment
      const { data: row } = await supabase
        .from('rate_limits')
        .select('count')
        .eq('ip_hash', ipHash)
        .eq('date', today)
        .single();
      if (row && row.count >= RATE_LIMIT) return false;
      await supabase
        .from('rate_limits')
        .update({ count: (row?.count ?? 0) + 1 })
        .eq('ip_hash', ipHash)
        .eq('date', today);
    }
    return true;
  } catch {
    return true; // fail open
  }
}

async function saveRoadmap(
  shareId: string,
  req: ReturnType<typeof GenerateRequestSchema.parse>,
  roadmapData: RoadmapData
): Promise<void> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
  try {
    const { createServiceClient } = await import('../../../../lib/supabase');
    const supabase = createServiceClient();
    await supabase.from('roadmaps').insert({
      share_id:       shareId,
      job_title:      req.jobTitle,
      goal:           req.goal,
      time_commitment:req.timeCommitment,
      roadmap_data:   roadmapData,
    });
  } catch { /* non-fatal */ }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0';
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: 'You\'ve reached today\'s limit. Try again tomorrow.' },
        { status: 429 }
      );
    }

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

    const shareId = nanoid(10);
    await saveRoadmap(shareId, parsed.data, roadmapData);

    return NextResponse.json({ roadmapData, shareId });
  } catch (e: any) {
    console.error('[generate-roadmap]', e);
    return NextResponse.json(
      { error: 'Generation failed. Please try again.' },
      { status: 500 }
    );
  }
}
