import { createServerClient } from './supabase';
import type { Occupation } from './types/database';

export async function getOccupation(slug: string): Promise<Occupation | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('occupations')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data as Occupation;
}

export async function getAllOccupationSlugs(): Promise<string[]> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from('occupations')
    .select('slug')
    .order('automation_probability', { ascending: false });
  return (data ?? []).map((o: { slug: string }) => o.slug);
}

export async function getRelatedOccupations(
  socCode: string,
  limit = 6
): Promise<Occupation[]> {
  const major = socCode.split('-')[0];
  const supabase = await createServerClient();
  const { data } = await supabase
    .from('occupations')
    .select('*')
    .like('soc_code', `${major}-%`)
    .neq('soc_code', socCode)
    .order('automation_probability', { ascending: false })
    .limit(limit);
  return (data ?? []) as Occupation[];
}

export async function getTopAtRiskOccupations(limit = 12): Promise<Occupation[]> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from('occupations')
    .select('*')
    .order('automation_probability', { ascending: false })
    .limit(limit);
  return (data ?? []) as Occupation[];
}

export function riskColor(level: string | null): string {
  switch (level) {
    case 'Very High': return 'text-blood';
    case 'High':      return 'text-rust';
    case 'Moderate':  return 'text-amber-400';
    case 'Low':       return 'text-acid';
    default:          return 'text-paper-2';
  }
}

export function riskBgColor(level: string | null): string {
  switch (level) {
    case 'Very High': return 'bg-blood/10 text-blood';
    case 'High':      return 'bg-rust/10 text-rust';
    case 'Moderate':  return 'bg-amber-400/10 text-amber-400';
    case 'Low':       return 'bg-acid/10 text-acid';
    default:          return 'bg-wire text-paper-2';
  }
}
