import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text,
} from '@react-email/components';
import type { RoadmapData } from '../lib/types/roadmap';

interface RoadmapEmailProps {
  jobTitle:    string;
  riskScore:   number;
  riskLevel:   string;
  goal:        string;
  roadmapData: RoadmapData;
  shareUrl:    string;
}

export default function RoadmapEmail({
  jobTitle, riskScore, riskLevel, goal, roadmapData, shareUrl,
}: RoadmapEmailProps) {
  const topActions = roadmapData.firstSevenDays?.slice(0, 3) ?? [];
  const topCourse  = roadmapData.courses?.[0];

  return (
    <Html>
      <Head />
      <Preview>{`Your Saveyojob roadmap — ${jobTitle} (${riskScore}% automation risk)`}</Preview>
      <Body style={{ backgroundColor: '#07090E', fontFamily: 'sans-serif', margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px' }}>
          {/* Logo */}
          <Text style={{ fontSize: 18, fontWeight: 700, color: '#EFF0F6', marginBottom: 32 }}>
            <span style={{ color: '#BAFF29' }}>Save</span>yojob.com
          </Text>

          <Heading style={{ fontSize: 24, fontWeight: 700, color: '#EFF0F6', margin: '0 0 8px' }}>
            Your career analysis is ready.
          </Heading>

          <Hr style={{ borderColor: '#1C2438', margin: '24px 0' }} />

          {/* Profile */}
          <Section style={{ backgroundColor: '#0C0F18', border: '1px solid #1C2438', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
            {[
              { label: 'JOB', value: jobTitle },
              { label: 'RISK SCORE', value: `${riskScore}% — ${riskLevel}`, color: riskScore > 70 ? '#FF3333' : riskScore > 50 ? '#FF7A28' : '#BAFF29' },
              { label: 'GOAL', value: goal },
            ].map(({ label, value, color }) => (
              <Text key={label} style={{ margin: '4px 0', fontSize: 13 }}>
                <span style={{ color: '#404E68', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 11 }}>
                  {label}:{' '}
                </span>
                <span style={{ color: color ?? '#EFF0F6', fontWeight: 600 }}>{value}</span>
              </Text>
            ))}
          </Section>

          {/* Top 3 actions */}
          {topActions.length > 0 && (
            <>
              <Text style={{ fontSize: 11, fontWeight: 700, color: '#404E68', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>
                Your top 3 actions this week
              </Text>
              {topActions.map((a, i) => (
                <Text key={i} style={{ fontSize: 13, color: '#7E8AA4', margin: '0 0 8px', paddingLeft: 16, borderLeft: '2px solid #1C2438' }}>
                  <strong style={{ color: '#BAFF29' }}>Day {a.day}:</strong> {a.action}
                </Text>
              ))}
            </>
          )}

          <Hr style={{ borderColor: '#1C2438', margin: '24px 0' }} />

          <Section style={{ textAlign: 'center' as const, margin: '0 0 24px' }}>
            <Link
              href={shareUrl}
              style={{
                display: 'inline-block',
                backgroundColor: '#BAFF29',
                color: '#07090E',
                fontWeight: 700,
                fontSize: 15,
                padding: '14px 32px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              View My Full Roadmap →
            </Link>
          </Section>

          {/* Top course */}
          {topCourse && (
            <>
              <Hr style={{ borderColor: '#1C2438', margin: '24px 0' }} />
              <Text style={{ fontSize: 11, fontWeight: 700, color: '#404E68', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 10px' }}>
                Top course for you
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 600, color: '#EFF0F6', margin: '0 0 4px' }}>
                {topCourse.icon} {topCourse.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#7E8AA4', margin: '0 0 8px' }}>
                {topCourse.platform} · {topCourse.duration} · {topCourse.cost}
              </Text>
              <Text style={{ fontSize: 12, color: '#7E8AA4', margin: '0 0 12px' }}>
                {topCourse.whyThisOne}
              </Text>
              <Link href={topCourse.url} style={{ fontSize: 13, color: '#BAFF29', fontWeight: 600 }}>
                Enroll Free →
              </Link>
            </>
          )}

          <Hr style={{ borderColor: '#1C2438', margin: '32px 0 16px' }} />
          <Text style={{ fontSize: 11, color: '#404E68', textAlign: 'center' as const }}>
            Saveyojob.com · Free forever · No spam ·{' '}
            <Link href={`${shareUrl}?unsubscribe=1`} style={{ color: '#404E68' }}>Unsubscribe</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
