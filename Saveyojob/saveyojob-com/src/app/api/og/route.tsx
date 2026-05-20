import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const job   = searchParams.get('job')   ?? 'Your Career';
  const score = searchParams.get('score') ?? '?';
  const level = searchParams.get('level') ?? '';

  const color = Number(score) > 70 ? '#FF3333' : Number(score) > 50 ? '#FF7A28' : '#BAFF29';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          background: '#07090E',
          padding: '56px 64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0, marginBottom: 'auto' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#BAFF29' }}>Save</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#EFF0F6' }}>yojob</span>
          <span style={{ fontSize: 14, color: '#404E68', marginLeft: 2 }}>.com</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#404E68' }}>
            AI Career Risk Assessment
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#EFF0F6', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {job}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 72, fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.05em' }}>
                {score}%
              </span>
              <span style={{ fontSize: 18, color: '#7E8AA4', fontWeight: 500 }}>automation risk</span>
            </div>
          </div>
          {level && (
            <div style={{ fontSize: 14, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {level}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48 }}>
          <span style={{ fontSize: 14, color: '#404E68' }}>Free · No signup required</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#BAFF29' }}>saveyojob.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
