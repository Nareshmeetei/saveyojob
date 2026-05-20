import { NextRequest, NextResponse } from 'next/server';

interface RouteContext { params: Promise<{ soc: string }> }

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { soc } = await params;
  const { SEED_OCCUPATIONS } = await import('../../../../../data/seed-data');

  const occupation = SEED_OCCUPATIONS.find(
    o => o.soc_code === soc || o.soc_code.replace('.', '-') === soc
  );

  if (!occupation) {
    return NextResponse.json({ error: 'Occupation not found.' }, { status: 404 });
  }

  return NextResponse.json(occupation);
}
