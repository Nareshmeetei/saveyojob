import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roadmapData, jobTitle, goal, timeCommitment, occupationSlug } = body;
    if (!roadmapData) return NextResponse.json({ error: 'Missing roadmapData' }, { status: 400 });

    const shareId = nanoid(10);

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createServiceClient } = await import('../../../../lib/supabase');
      const supabase = createServiceClient();
      await supabase.from('roadmaps').insert({
        share_id:        shareId,
        job_title:       jobTitle,
        goal,
        time_commitment: timeCommitment,
        occupation_slug: occupationSlug,
        roadmap_data:    roadmapData,
      });
    }

    return NextResponse.json({ shareId });
  } catch (e: any) {
    return NextResponse.json({ error: 'Save failed.' }, { status: 500 });
  }
}
