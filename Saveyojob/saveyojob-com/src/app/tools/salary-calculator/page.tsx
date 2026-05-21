import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import SalaryCalculatorClient from './SalaryCalculatorClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Salary Calculator by Role — See the AI Skills Premium for Your Job',
  description:
    'Find out what your role pays at entry, mid, senior, and lead level — then see how much more you could earn with AI skills. Data from BLS. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/salary-calculator/` },
  openGraph: {
    title: 'Salary Calculator by Role — See the AI Skills Premium',
    description: 'Role-specific salary estimates with experience level, location, and AI skills premium. Powered by BLS data.',
    url: `${siteUrl}/tools/salary-calculator/`,
    type: 'website',
  },
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Salary Calculator by Role
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[580px]">
            See what your job pays at every experience level and location — then find out how much more you could earn by adding AI skills.
          </p>
        </div>

        <SalaryCalculatorClient />

      </main>
    </>
  );
}
