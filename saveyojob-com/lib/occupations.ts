import { SEED_OCCUPATIONS } from '../data/seed-data';
import type { Occupation } from './types/database';

export async function getOccupation(slug: string): Promise<Occupation | null> {
  return (SEED_OCCUPATIONS.find(o => o.slug === slug) ?? null) as Occupation | null;
}

export async function getAllOccupationSlugs(): Promise<string[]> {
  return SEED_OCCUPATIONS.map(o => o.slug);
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
